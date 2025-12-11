# Refatoração Completa do Frontend VMS Unifique

## 1. Visão Geral
- Refatoração foca em selar autenticação/rotas, remover mocks do bundle, implementar hierarquia e preparar integração FastAPI.
- Impacto: maior segurança (LGPD), base pronta para APIs reais, UI coerente com cada role, testes cobrindo fluxos críticos.
- Cronograma sugerido:
  - MVP 1.0 (2 sprints): correções críticas, hierarquia mínima, camada de serviços + auth JWT, LGPD técnico.
  - Evoluções 1.x (subsequentes): CRUDs completos, tela de permissões, dashboards específicos, code splitting avançado.

## 2. Correções Críticas (Prioridade Máxima)
### 2.1 Logout não funciona corretamente
- Problema: função não limpa todo storage/session → rotas ainda acessíveis.
- Solução: remover chaves `vms_*/tenant_*`, limpar sessionStorage, resetar contexto e navegar.
- Código:
```ts
const logout = useCallback(async () => {
  const keys = Object.keys(localStorage).filter((key) => key.startsWith('vms_') || key.startsWith('tenant_'))
  keys.forEach((key) => localStorage.removeItem(key))
  sessionStorage.clear()
  setUser(null)
  navigate('/login', { replace: true })
}, [navigate])
```
- Checklist: chamar logout em `401`, impedir acesso em `ProtectedRoute`, testes Vitest/RTL.

### 2.2 Dados sensíveis hard-coded no bundle
- Problema: `mock*.ts` incluídos na build.
- Solução: mover para `src/fixtures/*.fixture.ts`, exportar via `index.ts` com guard, carregar com `useDevData`.
- Código:
```ts
export async function getTenantsFixture() {
  if (import.meta.env.PROD) throw new Error('Fixtures fora de produção')
  const module = await import('@/fixtures/tenants.fixture')
  return module.mockTenants
}
```
- Checklist: build sem `/fixtures/`, rollup external + lint.

### 2.3 Rotas não protegidas adequadamente
- Problema: `user.role` indefinido não bloqueia.
- Solução: exigir role válida e redirecionar conforme enum.
- Código:
```tsx
if (!user?.role) {
  localStorage.clear()
  sessionStorage.clear()
  return <Navigate to="/login" replace />
}
if (allowedRoles.length && !allowedRoles.includes(user.role)) {
  return <Navigate to={getRedirectPathByRole(user.role)} replace />
}
```
- Checklist: testes cobrindo `null user`, role inválida, role não autorizada, estado loading.

## 3. Implementação da Hierarquia
- Usar `SystemRole` + `UserScope` (global/tenant/site/area/camera).
- **Admin Master**: rotas `/admin-master/*`, layout dedicado, `ProtectedRoute` com `SystemRole.ADMIN_MASTER`, redirecionamento pós-login.
- **Admin**: `/admin/*`, dashboards globais, `usePermissions` define `canManageInfrastructure=false`.
- **Técnico**: `/technician/installations`, banner de acesso temporário, validação `requireTemporaryAccess()`.
- **Cliente Master**: `/client/*`, componentes `ClientDashboard`, `TenantSettings`, escopo `tenantId` obrigatório.
- **Gerente**: `/manager/*`, escopo `sites`/`areas`, componentes `ManagerLiveView`, validação `usePermissions().canViewSites`.
- **Visualizador**: `/viewer/live`/`/viewer/playback`, restrições fortes (sem export sem permissão).

## 4. Camada de Serviços
- Pastas: `src/services/http/client.ts`, `src/services/modules/*.ts`.
- Contratos TypeScript (`TenantDTO`, `CreateTenantInput`, etc.).
- Exemplo `tenantsService`:
```ts
import { http } from '@/services/http/client'
export const tenantsService = {
  list(params?: TenantQuery) {
    return http.get<TenantDTO[]>('/tenants', { params })
  },
  create(payload: CreateTenantInput) {
    return http.post<TenantDTO>('/tenants', payload)
  },
}
```
- Interceptors: anexam `Authorization`, refresh automático, mapear erros 401/403 → logout.
- React Query: `queryClient`, hooks `useTenantsQuery`, `useCreateTenantMutation`.

## 5. Sistema de Permissões e Escopos
- Tipos:
```ts
type Scope = { type: 'GLOBAL' } | { type: 'TENANT'; tenantId: string } | ...
type Permission = 'tenant.manage' | 'camera.view' | 'ia.configure'
```
- Hook `usePermissions` avalia permissões por role + scope.
- Componente `<Can permission="...">` para render condicional.
- Rotas encadeadas com `<Can>` ou `ProtectedRoute` extendido.

## 6. Acesso Temporário de Técnico (LGPD)
- Tipos:
```ts
type TemporaryAccess = { technicianId: string; grantedBy: string; expiresAt: string }
```
- Estado em AuthContext; countdown com hook.
- Banner:
```tsx
export function TemporaryAccessBanner() {
  const { temporaryAccess, revokeTemporaryAccess } = useAuth()
  const remaining = useCountdown(temporaryAccess?.expiresAt)
  if (!temporaryAccess) return null
  return (
    <Alert variant="warning">
      Acesso expira em {formatDuration(remaining)}
      <Button onClick={revokeTemporaryAccess}>Encerrar agora</Button>
    </Alert>
  )
}
```
- Expiração automática chama `logout()`, rotas `/technician/*` verificam acesso ativo.

## 7. Componentes Reutilizáveis
- DataTable genérica (`@tanstack/react-table`).
- Barra de filtros com slots reutilizáveis.
- Modal/Drawer padronizados (Shadcn wrappers).
- Loading/Empty states (`SkeletonPanel`, `EmptyState`).
- Toasts centralizados (`useToast`).

## 8. Integração com Backend
- Fluxo JWT completo: `/auth/login`, `/auth/refresh`, `/auth/logout`.
- Interceptors tratam 401/403, exibem mensagens de erro (FastAPI `detail`).
- Exemplo error handler:
```ts
http.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await authService.logout()
      return Promise.reject(error)
    }
    // map detail → toast
  },
)
```

## 9. Testes
- Unidade: hooks (`usePermissions`, `useDevData`), serviços.
- Integração: `ProtectedRoute`, `AuthContext`, formulários.
- E2E futuro: Playwright (login, tenants CRUD, fluxo técnico).
- Meta: ≥80% nas áreas críticas (auth, permissions, services).

## 10. Riscos e Mitigações
- Corrida no refresh token → implementar fila/mutex.
- Fixtures importadas por engano → regra ESLint proibindo `/fixtures/` fora DEV.
- LGPD (logs técnicos) → registrar cada concessão/expiração.
- Refator ampla → feature flags + migração gradual.

## 11. Próximos Passos
1. Sprint 1: corrigir AuthContext/ProtectedRoute/logout, mover mocks → fixtures, adicionar camada de serviços + interceptors.
2. Sprint 2: implementar rotas/layouts por role, `usePermissions`, `<Can>`, fluxo técnico LGPD.
3. Sprint 3: ligar telas de tenants/users/cameras aos serviços, formularios com validação, React Query.
4. Sprint 4+: dashboards específicos, auditoria, code splitting avançado, logs LGPD.
