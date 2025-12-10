import { CheckCircle2, MinusCircle, XCircle } from 'lucide-react'

import { DEFAULT_ROLE_PERMISSIONS } from '@/modules/admin/access/defaultRolePermissions'
import type { PermissionValue, RolePermissionSet, ScopeType } from '@/modules/admin/access/roleTypes'

const permissionColumns: { key: keyof RolePermissionSet; label: string }[] = [
  { key: 'canViewStatus', label: 'Status da operação' },
  { key: 'canViewVideo', label: 'Ver vídeo ao vivo' },
  { key: 'canViewVideoTemporary', label: 'Vídeo temporário' },
  { key: 'canViewRecordings', label: 'Ver gravações' },
  { key: 'canManageAdmins', label: 'Gerir Admins' },
  { key: 'canManageTechnicians', label: 'Gerir Técnicos' },
  { key: 'canManageClients', label: 'Gerir Clientes' },
  { key: 'canManageUsers', label: 'Gerir Usuários' },
  { key: 'canManageCameras', label: 'Gerir Câmeras' },
  { key: 'canManageIA', label: 'Gerir IA' },
  { key: 'canManageAlerts', label: 'Gerir Alertas' },
  { key: 'canManageStorage', label: 'Gerir Armazenamento' },
  { key: 'canManageInfrastructure', label: 'Infraestrutura' },
  { key: 'canGrantTemporaryAccess', label: 'Acesso temporário' },
]

const scopeLabels: Record<ScopeType, string> = {
  GLOBAL: 'Global',
  GLOBAL_LIMITED: 'Global (limitado)',
  INSTALLATION_ONLY: 'Instalação somente',
  TENANT_FULL: 'Tenant completo',
  SECTOR: 'Setor',
  VIEW_ONLY: 'Somente visualização',
}

function renderBoolean(value: boolean) {
  if (value) {
    return (
      <span className="inline-flex items-center gap-1 text-emerald-600">
        <CheckCircle2 className="h-4 w-4" aria-hidden />
        <span className="text-xs font-semibold">Sim</span>
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 text-rose-500">
      <XCircle className="h-4 w-4" aria-hidden />
      <span className="text-xs font-semibold">Não</span>
    </span>
  )
}

function renderPermission(value: PermissionValue | boolean) {
  if (typeof value === 'boolean') {
    return renderBoolean(value)
  }

  const baseClass = 'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold'

  if (value === 'limited') {
    return <span className={`${baseClass} bg-amber-50 text-amber-700`}>Limitado</span>
  }

  if (value === 'optional') {
    return <span className={`${baseClass} bg-sky-50 text-sky-700`}>Opcional</span>
  }

  if (value === 'viewOnly') {
    return <span className={`${baseClass} bg-slate-100 text-slate-700`}>Somente visualização</span>
  }

  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground">
      <MinusCircle className="h-4 w-4" aria-hidden />
      <span className="text-xs font-semibold">—</span>
    </span>
  )
}

export function RoleMatrixTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white/90 p-4 shadow-sm">
      <table className="min-w-[960px] w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="py-3 pr-4 font-semibold">Perfil</th>
            {permissionColumns.map((column) => (
              <th key={column.key} className="px-3 py-3 font-semibold">
                {column.label}
              </th>
            ))}
            <th className="px-3 py-3 font-semibold">Escopo</th>
          </tr>
        </thead>
        <tbody>
          {DEFAULT_ROLE_PERMISSIONS.map((roleConfig) => (
            <tr key={roleConfig.role} className="border-t text-sm">
              <td className="py-4 pr-4 align-top">
                <div>
                  <p className="font-semibold text-foreground">{roleConfig.label}</p>
                  <p className="text-xs text-muted-foreground">{roleConfig.description}</p>
                </div>
              </td>
              {permissionColumns.map((column) => (
                <td key={column.key} className="px-3 py-3 align-middle">
                  {renderPermission(roleConfig.permissions[column.key])}
                </td>
              ))}
              <td className="px-3 py-3 align-middle">
                <span className="rounded-full bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
                  {scopeLabels[roleConfig.scope]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
