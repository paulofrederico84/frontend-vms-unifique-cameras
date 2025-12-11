**Estrutura Atual**
- **Árvore (sem node_modules/dist)**  
```text
.
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public
│   └── vite.svg
└── src
    ├── App.css
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── app
    │   ├── layout/AdminLayout.tsx
    │   └── router/AppRouter.tsx
    ├── assets
    │   ├── logo-unifique-full.svg
    │   ├── logo-unifique-mark.svg
    │   └── react.svg
    ├── components
    │   ├── layout/Header.tsx
    │   └── ui
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── dialog.tsx
    │       ├── dropdown-menu.tsx
    │       ├── input.tsx
    │       ├── select.tsx
    │       ├── sheet.tsx
    │       ├── table.tsx
    │       ├── tabs.tsx
    │       └── tooltip.tsx
    ├── lib/utils.ts
    ├── modules
    │   ├── auth
    │   │   ├── components/ProtectedRoute.tsx
    │   │   ├── context/AuthContext.tsx
    │   │   └── pages/LoginPage.tsx
    │   ├── shared
    │   │   ├── components/{PageIntro,Sidebar,Skeleton,Topbar}.tsx
    │   │   └── types/{auth.ts,roleLabels.ts}
    │   └── admin
    │       ├── components/AdminPlaceholder.tsx
    │       ├── access/{defaultRolePermissions.ts,RoleMatrixTable.tsx,roleTypes.ts}
    │       ├── ai-alerts
    │       │   ├── components/{AiAlertsKpisHeader,AiEventsByTenantTable,AiEventsByTypeChart,AiEventsTimelineChart,
    │       │   │   AiModuleBadge,AiEventsTimelineChart,AlertRuleDetailsDrawer,AlertRulesList,SeverityBadge}.tsx
    │       │   ├── mockAiEvents.ts
    │       │   └── mockAlertRules.ts
    │       ├── audit
    │       │   ├── components/{AuditActionBadge,AuditEventDetailsDrawer,AuditEventsTable,AuditFiltersBar,
    │       │   │   AuditKpisHeader,AuditSeverityBadge}.tsx
    │       │   └── mockAuditEvents.ts
    │       ├── cameras
    │       │   ├── {CameraDetailsDrawer,CameraForm,CameraList}.tsx
    │       │   ├── cameraMocks.ts
    │       │   └── cameraTypes.ts
    │       ├── dashboard
    │       │   ├── {AdminDashboardCharts,AdminDashboardOverview,AdminDashboardStatsCards}.tsx
    │       │   ├── adminDashboardMocks.ts
    │       │   └── components/{EventsTable,HealthBar,KpiCard,StatusDistribution,StorageDonutChart,TrendCard}.tsx
    │       ├── infrastructure
    │       │   ├── components/{InfraHealthSummary,InfraKpisHeader,ServerStatusBadge,ServerTypeBadge}.tsx
    │       │   ├── mockInfraAlerts.ts
    │       │   └── mockServers.ts
    │       ├── locations
    │       │   ├── components/{CameraDetailsDrawer,CameraList,CameraStatusBadge,LocationDetailsDrawer,
    │       │   │   LocationFiltersBar,LocationKpisHeader,LocationListTable,LocationStatusBadge}.tsx
    │       │   ├── mockCameras.ts
    │       │   └── mockLocations.ts
    │       ├── sites/{SiteList.tsx,siteMocks.ts,siteTypes.ts}
    │       ├── tenants
    │       │   ├── {TenantDetailsDrawer,TenantForm,TenantList}.tsx
    │       │   ├── components/{TenantDetailsDrawer,TenantFiltersBar,TenantKpisHeader,TenantListTable,TenantPlanBadge,
    │       │   │   TenantStatusBadge}.tsx
    │       │   ├── {mockTenants.ts,tenantMocks.ts,tenantTypes.ts}
    │       ├── users
    │       │   ├── {UserDetailsDrawer,UserForm}.tsx
    │       │   ├── components/{UserFiltersBar,UserKpisHeader,UserListTable,UserRoleBadge,UserStatusBadge}.tsx
    │       │   ├── {mockUsers.ts,userMocks.ts,userTypes.ts}
    │       └── pages/{AdminAccessLevelsPage,AdminAiAlertsPage,AdminAuditPage,AdminDashboardPage,AdminLocationsPage,
    │           AdminReportsPage,AdminSettingsPage,AdminTenantsPage,AdminUsersPage}.tsx
```
- **Stack & dependências**  

| Camada | Principais libs/versões | Observações |
| --- | --- | --- |
| Build | `vite@7.2.4`, `typescript@5.9.3`, `tsconfig` strict, alias `@/*` | Sem vitest/jest configurado. |
| UI | `react@19.2.0`, `react-dom@19.2.0`, `react-router-dom@7.10.1`, Tailwind 3.4, `tailwindcss-animate`, Shadcn-style `components/ui`, `lucide-react` | Rotas síncronas, nenhum lazy loading. |
| Acessórios | Radix UI primitives, `class-variance-authority`, `tailwind-merge` | Sem i18n, sem theming dinâmico. |
| Qualidade | ESLint flat config com `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`; strict mode no TS | README ainda é o boilerplate padrão do Vite. |

- **Padrões observados**: módulos organizados por domínio (`modules/admin/<area>`), forte uso de dados mockados (arquivos `mock*.ts`), componentes desacoplados porém sem camadas de serviço; tipagem estrita e alias `@` adotado; internacionalização inexistente, textos hard-coded em pt-BR.

**Funcionalidades**
- **Páginas/Fluxos**  

| Página | Arquivo | Fonte de dados | Status |
| --- | --- | --- | --- |
| Login protótipo | `modules/auth/pages/LoginPage.tsx` | `mockUsers` interno | Funcional apenas para troca de persona local (sem backend). |
| Dashboard global | `modules/admin/pages/AdminDashboardPage.tsx` | `dashboardMock` local | Visualização estática. |
| Tenants | `modules/admin/pages/AdminTenantsPage.tsx` | `TENANT_MOCKS` | CRUD inexistente; filtros locais. |
| Usuários | `modules/admin/pages/AdminUsersPage.tsx` | `mockUsers` | Apenas UI + placeholder. |
| Níveis de acesso | `modules/admin/pages/AdminAccessLevelsPage.tsx` | `RoleMatrixTable` + `defaultRolePermissions` | Somente leitura. |
| Locais & câmeras | `modules/admin/pages/AdminLocationsPage.tsx` | `LOCATION_MOCKS`, `CAMERA_MOCKS` | Filtros e drawers locais. |
| IA & alertas | `modules/admin/pages/AdminAiAlertsPage.tsx` | `AI_EVENT_MOCKS`, `ALERT_RULES` | Dashboards estendidos, sem ações reais. |
| Auditoria | `modules/admin/pages/AdminAuditPage.tsx` | `mockAuditEvents` | Filtragem local; sem paginação. |
| Relatórios / Configurações | respectivos arquivos | placeholders | Somente componentes estáticos. |
| Rotas extras (relatórios, settings) | `AdminReportsPage`, `AdminSettingsPage` | dados sintéticos | Sem integração. |

- **Componentes por bloco**  

| Camada | Componentes |
| --- | --- |
| UI base | `button`, `input`, `select`, `tabs`, `dialog`, `table`, `badge`, `card`, `dropdown-menu`, `sheet`, `tooltip`. |
| Layout compartilhado | `Header`, `Sidebar`, `Topbar` (não referenciado), `Skeleton`, `PageIntro`, `AdminLayout`. |
| Auth | `AuthContext`, `ProtectedRoute`, `LoginPage`. |
| Admin Dashboard | `AdminDashboardCharts`, `AdminDashboardOverview`, `AdminDashboardStatsCards`, `KpiCard`, `EventsTable`, `StatusDistribution`, `TrendCard`, `StorageDonutChart`, `HealthBar`. |
| Admin Tenants | `TenantList`, `TenantForm`, `TenantDetailsDrawer`, `TenantFiltersBar`, `TenantKpisHeader`, `TenantListTable`, `TenantPlanBadge`, `TenantStatusBadge`. |
| Admin Users | `UserForm`, `UserDetailsDrawer`, `UserListTable`, `UserFiltersBar`, `UserKpisHeader`, `UserRoleBadge`, `UserStatusBadge`. |
| Access Control | `RoleMatrixTable`, `defaultRolePermissions`. |
| Locations/Câmeras | `LocationListTable`, `LocationFiltersBar`, `LocationKpisHeader`, `LocationDetailsDrawer`, `CameraList`, `CameraDetailsDrawer`, `CameraStatusBadge`, `LocationStatusBadge`. |
| IA & Alertas | `AiAlertsKpisHeader`, `AiEventsByTypeChart`, `AiEventsTimelineChart`, `AiEventsByTenantTable`, `AlertRulesList`, `AlertRuleDetailsDrawer`, `AiModuleBadge`, `SeverityBadge`. |
| Auditoria | `AuditKpisHeader`, `AuditFiltersBar`, `AuditEventsTable`, `AuditEventDetailsDrawer`, `AuditActionBadge`, `AuditSeverityBadge`. |
| Infra/Sites | `InfraKpisHeader`, `InfraHealthSummary`, `ServerStatusBadge`, `ServerTypeBadge`, `SiteList`. |
| Placeholders | `AdminPlaceholder` usado em usuários/relatórios/settings. |

- **Serviços de API**: não há `services`, `api`, `fetch`, `axios` ou `React Query`; toda a “integração” está em arquivos `mock*.ts` com arrays estáticos.

- **Rotas configuradas (`app/router/AppRouter.tsx`)**

| Path | Elemento | Guarda | Observações |
| --- | --- | --- | --- |
| `/` | `<Navigate to="/admin/dashboard" />` | — | Redirect inicial. |
| `/login` | `<LoginPage />` | — | Sem proteção; ainda local. |
| `/admin/*` | `<AdminLayout />` | `<ProtectedRoute>` para `ADMIN_MASTER`, `ADMIN`, `CLIENT_MASTER` | Permite children com Outlet. |
| `/admin/access-levels` | `<AdminAccessLevelsPage />` | `ProtectedRoute` restrita a `ADMIN_MASTER`. |
| `/admin/audit` | `<AdminAuditPage />` | idem |
| `analytics-notifications` | Redirect para `ai-alerts`. |
| `*` fallback | Redirect para dashboard. |
| TODO | Comentário promete rotas `technician/*` e `client/*` ainda inexistentes. |

**Estado Global**
- Único provider é `AuthContext` (`modules/auth/context/AuthContext.tsx`), com estado `{currentUser, isAuthenticated}` em memória.  
- Funções expostas: `loginAs(UserSummary)` salva usuário mock; `logout()` simplesmente redefine para `MOCK_ADMIN_USER`, não zera autenticação.  
- Não há persistência (`localStorage`, cookies) nem tokens; `ProtectedRoute` garante apenas check de role em memória.  
- TypeScript está estrito, porém há `UserRole` redundante e nenhum modelo para entidades de backend além dos mocks.

**Integração com Backend**
- Nenhum HTTP client, interceptor ou camada de serviço; nenhuma chamada externa.  
- Erros não são tratados; operações “sensíveis” apenas fazem `console.info`.  
- JWT/SAML/OAuth inexistente; LoginPage afirma que autenticação real “virá depois”.  
- Dados críticos (permissões, auditoria, IA) estão hard-coded no bundle, o que inviabiliza multi-tenant real e aumenta o payload inicial.

**Gaps Críticos (vs. responsabilidades esperadas do Admin Master)**
- **Funcionalidades faltantes**: autenticação real, gestão CRUD de tenants/usuários/câmeras, workflows de aprovação, segregação por tenant/cliente/técnico (comentado mas não implementado), gestão de templates IA ligada a backend, relatórios exportáveis.
- **Funcionalidades incorretas**: `logout` não encerra sessão; `ProtectedRoute` exibe página pública no mesmo domínio, sem logging/auditoria; `Sidebar` exibe links para módulos que exigem roles mesmo quando usuário não tem (apenas filtra collection, mas `role` pode ser `undefined` e a navegação quebra).
- **Componentes críticos ausentes**: formulários reais (`CameraForm`, `TenantForm`, `UserForm` nunca usados), toasts/feedback, Empty States, loading resiliente fora do layout.
- **Arquitetura**: falta divisão camada dados/serviços; mocks gigantes (centenas de linhas) dentro do bundle; ausência de store global (Redux/Zustand) para filtros/telemetria; `Topbar` duplicando cabeçalho; não existe code-splitting por rota.

**Qualidade do Código**

| Aspecto | Situação |
| --- | --- |
| Nomenclatura | Consistente em pt-BR, porém arquivos misturam `Admin` prefix e alguns `mock*`; ausência de convenção para form components. |
| Componentização | Boa dentro dos domínios, mas não há camada compartilhada para filtros/listas (várias duplicações entre módulos). |
| Reutilização | UI base centralizada em `components/ui`; lógica de filtros e drawers poderia ser hooks reutilizáveis (atualmente replicada). |
| Testes | Inexistentes (não há estrutura Vitest/Jest). |
| Documentação | README ainda é template do Vite; inexistem guias sobre arquitetura, estados ou convenções. |

**Performance & Otimização**
- Nenhum uso de `React.lazy`/`Suspense` – todas as páginas carregadas em um único chunk; bundler terá ~MBs de dados mockados.  
- Listas (tenants, câmeras, auditoria) renderizam 100% das linhas sem virtualização ou paginação.  
- Filtros fazem `Array.filter` sobre mocks a cada render, sem memoização por dependência externa (embora `useMemo` exista em alguns casos, os datasets continuam inline).  
- Sem pré-carregamento assíncrono nem cache; grafos de IA/Audit serão recalculados sempre.  
- Tailwind classes repetidas; poderia extrair tokens/variants para reduzir CSS.

**Checklist de Funcionalidades**

- [x] Layout admin responsivo com sidebar e header (`AdminLayout`).  
- [x] Visualizações mockadas para dashboard, IA, auditoria, tenants, locations.  
- [x] Controle básico de roles no roteador (`ProtectedRoute`).  
- [ ] Autenticação real, refresh token, interceptors.  
- [ ] Camada de API/serviços para tenants, usuários, câmeras, alertas.  
- [ ] Fluxos de criação/edição (forms não conectados).  
- [ ] Rotas dedicadas para perfis Technician/Client com restrições específicas.  
- [ ] Relatórios exportáveis, agendamentos, notificações de backend.  
- [ ] Logs/auditoria de sessão e manipulação de erros.

**Código de exemplo (problema de logout)**
```tsx
// src/modules/auth/context/AuthContext.tsx
const logout = () => {
  setState({ currentUser: MOCK_ADMIN_USER, isAuthenticated: true })
  // Não limpa tokens, não invalida sessão, não respeita persona atual
}
```
> Consequência: ao “sair”, o usuário continua autenticado como Admin Master, quebrando qualquer requisito de segurança ou auditoria.

**Prioridades de Refatoração**
1. **Corrigir imediatamente**
   1. Implementar `logout` real (limpar estado, storage, redirecionar) e bloquear acesso quando `user` for `null`.
   2. Remover dados sensíveis hard-coded (`mockAuditEvents`, `mockAiEvents`, etc.) do bundle de produção; carregar de fixtures via dev-only.
   3. Garantir que rotas restritas não sejam acessíveis quando `user.role` estiver indefinido (hoje `Sidebar` e `ProtectedRoute` permitem render blank screens).

2. **Refatorar**
   1. Extrair camada de serviços (ex.: `src/services/tenantsService.ts`) com contratos tipados para facilitar troca de mocks → API real.
   2. Criar hooks reutilizáveis para filtros/tabelas (`useFilteredTenants`, `useDrawerState`) para reduzir duplicação entre módulos.
   3. Consolidar cabeçalhos (`Header` vs `Topbar`) e unificar tokens Tailwind em config central.

3. **Implementar**
   1. Autenticação completa (login via backend, refresh tokens, interceptors axios/fetch, armazenamento seguro) alinhada às especificações LGPD.
   2. Operações CRUD reais para tenants/usuários/câmeras/alertas, com validações, toasts e tratamento de erro.
   3. Rotas dedicadas para Technician/Client, com dashboards filtrados por `tenantId`.
   4. Testes (unitários para hooks/componentes críticos e E2E para fluxos de Admin Master).

4. **Melhorar**
   1. Adotar code splitting (`React.lazy`, `route lazy` do React Router 7) e virtualização em tabelas grandes.
   2. Instrumentar monitoramento de erros (Sentry) e logging consistente em ações críticas.
   3. Atualizar README com visão arquitetural, scripts e convenções; adicionar diagramas conforme documentos de referência.
   4. Considerar React Query/Zustand para estados compartilhados (filtros, seleção atual) evitando prop drilling.

Esses passos alinham o frontend às funções descritas para o Admin Master e preparam a base para integração real com o backend do VMS. Próximos passos naturais: configurar testes/tarefas de CI, definir contratos de API (OpenAPI) e substituir gradualmente os mocks por chamadas reais.
