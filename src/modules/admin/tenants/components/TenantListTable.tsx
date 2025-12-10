import { ExternalLink, PauseCircle, Shield } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { TenantRecord } from '@/modules/admin/tenants/mockTenants'

import { TenantPlanBadge } from './TenantPlanBadge'
import { TenantStatusBadge } from './TenantStatusBadge'

export type TenantListTableProps = {
  tenants: TenantRecord[]
  onSelectTenant: (tenant: TenantRecord) => void
  onOpenPortal?: (tenant: TenantRecord) => void
  onSuspendTenant?: (tenant: TenantRecord) => void
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })

export function TenantListTable({ tenants, onSelectTenant, onOpenPortal, onSuspendTenant }: TenantListTableProps) {
  const handlePortalClick = (event: React.MouseEvent, tenant: TenantRecord) => {
    event.stopPropagation()
    onOpenPortal?.(tenant)
  }

  const handleSuspendClick = (event: React.MouseEvent, tenant: TenantRecord) => {
    event.stopPropagation()
    onSuspendTenant?.(tenant)
  }

  if (tenants.length === 0) {
    return (
      <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
        <CardContent className="py-16 text-center text-sm text-slate-500">
          Nenhum tenant encontrado com os filtros selecionados.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <th className="px-5 py-3 text-left">Cliente</th>
                <th className="px-5 py-3 text-left">Plano</th>
                <th className="px-5 py-3 text-left">Câmeras</th>
                <th className="px-5 py-3 text-left">Sites</th>
                <th className="px-5 py-3 text-left">Usuários</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Criado em</th>
                <th className="px-5 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr
                  key={tenant.id}
                  className="cursor-pointer border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                  onClick={() => onSelectTenant(tenant)}
                >
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{tenant.name}</span>
                      <span className="text-xs text-slate-500">{tenant.document}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <TenantPlanBadge plan={tenant.plan} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-semibold text-slate-900">
                      {tenant.activeCameras.toLocaleString('pt-BR')} / {tenant.cameras.toLocaleString('pt-BR')}
                    </div>
                    <p className="text-xs text-slate-500">ativas / total</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-semibold text-slate-900">{tenant.sites}</div>
                    <p className="text-xs text-slate-500">unidades</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-semibold text-slate-900">{tenant.users}</div>
                    <p className="text-xs text-slate-500">usuários</p>
                  </td>
                  <td className="px-5 py-4">
                    <TenantStatusBadge status={tenant.status} />
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{dateFormatter.format(new Date(tenant.createdAt))}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-slate-600"
                        onClick={(event) => handlePortalClick(event, tenant)}
                      >
                        <ExternalLink className="h-4 w-4" /> Portal
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={(event) => handleSuspendClick(event, tenant)}
                      >
                        <PauseCircle className="h-4 w-4" /> Suspender
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        className="gap-1 bg-slate-900 text-white"
                        onClick={(event) => {
                          event.stopPropagation()
                          onSelectTenant(tenant)
                        }}
                      >
                        <Shield className="h-4 w-4" /> Detalhes
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
