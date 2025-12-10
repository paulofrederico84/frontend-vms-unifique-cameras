import { useEffect, useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { TenantForm, type TenantFormData } from '@/modules/admin/tenants/TenantForm'
import { getTenantByIdMock, updateTenantMock } from '@/modules/admin/tenants/tenantMocks'
import type { Tenant, TenantStatus } from '@/modules/admin/tenants/tenantTypes'

const statusLabelMap: Record<TenantStatus, string> = {
  ACTIVE: 'Ativo',
  SUSPENDED: 'Suspenso',
  INACTIVE: 'Inativo',
}

const statusBadgeClass: Record<TenantStatus, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  SUSPENDED: 'bg-amber-100 text-amber-700 border border-amber-200',
  INACTIVE: 'bg-slate-100 text-slate-500 border border-slate-200',
}

export type TenantDetailsDrawerProps = {
  tenantId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onTenantUpdated?: () => void
}

export function TenantDetailsDrawer({ tenantId, open, onOpenChange, onTenantUpdated }: TenantDetailsDrawerProps) {
  const [tenant, setTenant] = useState<Tenant | null>(null)

  useEffect(() => {
    if (!open || !tenantId) {
      return
    }

    let isActive = true

    getTenantByIdMock(tenantId).then((result) => {
      if (!isActive) {
        return
      }
      setTenant(result ?? null)
    })

    return () => {
      isActive = false
    }
  }, [tenantId, open])

  const isLoading = open && Boolean(tenantId) && tenant?.id !== tenantId

  const title = useMemo(() => {
    if (!tenant || tenant.id !== tenantId) {
      return 'Detalhes do cliente'
    }

    return tenant.name
  }, [tenant, tenantId])

  const handleFormSubmit = async (data: TenantFormData) => {
    if (!tenantId) return
    const updated = await updateTenantMock(tenantId, data)
    if (updated) {
      setTenant(updated)
      onTenantUpdated?.()
    }
  }

  const formatDateTime = (value?: string) => {
    if (!value) return '—'
    return new Date(value).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setTenant(null)
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-6xl gap-0 p-0">
        <DialogHeader className="border-b px-6 py-4 text-left">
          <DialogTitle className="text-2xl font-semibold text-foreground">{title}</DialogTitle>
          {tenant ? (
            <div className="mt-1 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadgeClass[tenant.status]}`}>
                {statusLabelMap[tenant.status]}
              </span>
              <span>{tenant.plan} • Plano</span>
              <span>Criado em {formatDateTime(tenant.createdAt)}</span>
              <span>Última atualização {formatDateTime(tenant.updatedAt)}</span>
            </div>
          ) : null}
        </DialogHeader>

        <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_1fr]">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center gap-2 py-12 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Carregando informações...
            </div>
          ) : tenant && tenant.id === tenantId ? (
            <>
              <div className="space-y-6">
                <section className="rounded-2xl border bg-muted/10 p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Ficha do cliente</h4>
                  <dl className="mt-4 grid gap-3 text-sm text-foreground">
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Documento</dt>
                      <dd className="font-medium">{tenant.document}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Contato</dt>
                      <dd className="font-medium">{tenant.contactName}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">E-mail</dt>
                      <dd className="font-medium">{tenant.contactEmail}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Telefone</dt>
                      <dd className="font-medium">{tenant.contactPhone || '—'}</dd>
                    </div>
                  </dl>
                  <div className="my-4 border-t border-dashed border-muted/40" />
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[{ label: 'Câmeras', value: tenant.camerasCount }, { label: 'Sites', value: tenant.sitesCount }, { label: 'Usuários', value: tenant.activeUsersCount }].map((stat) => (
                      <div key={stat.label} className="rounded-xl border bg-white/80 px-3 py-3 text-center">
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-semibold text-brand-deep">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="rounded-2xl border bg-muted/10 p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Limites contratados</h4>
                  <div className="mt-4 grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <span>Máximo de câmeras</span>
                      <span className="font-semibold">{tenant.limits.maxCameras}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Streams extras</span>
                      <span className="font-semibold">{tenant.limits.maxStreamsExtra}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retenção padrão</span>
                      <span className="font-semibold">{tenant.limits.defaultRetentionDays} dias</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {[
                        { label: 'IA', enabled: tenant.limits.iaEnabled },
                        { label: 'LPR', enabled: tenant.limits.lprEnabled },
                        { label: 'EPI', enabled: tenant.limits.epiEnabled },
                      ].map((feature) => (
                        <span
                          key={feature.label}
                          className={`rounded-full px-2 py-0.5 ${
                            feature.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {feature.label}: {feature.enabled ? 'on' : 'off'}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <TenantForm
                  mode="edit"
                  initialData={tenant}
                  onSubmit={handleFormSubmit}
                  onCancel={() => handleOpenChange(false)}
                />
              </div>
            </>
          ) : (
            <div className="col-span-full py-10 text-center text-sm text-muted-foreground">
              Nenhum cliente selecionado.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
