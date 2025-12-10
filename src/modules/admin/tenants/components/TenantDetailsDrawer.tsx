import { Building2, Mail, Phone, Server } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { TenantRecord } from '@/modules/admin/tenants/mockTenants'

import { TenantPlanBadge } from './TenantPlanBadge'
import { TenantStatusBadge } from './TenantStatusBadge'

export type TenantDetailsDrawerProps = {
  tenant: TenantRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const numberFormatter = new Intl.NumberFormat('pt-BR')
const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })

export function TenantDetailsDrawer({ tenant, open, onOpenChange }: TenantDetailsDrawerProps) {
  const usagePercent = tenant ? Math.round((tenant.storage.usedTb / tenant.storage.totalTb) * 100) : 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl border-0 bg-white p-0 shadow-2xl">
        <DialogHeader className="border-b border-slate-100 px-6 py-5 text-left">
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-2xl font-semibold text-slate-900">
              {tenant ? tenant.name : 'Selecione um cliente'}
            </DialogTitle>
            {tenant ? (
              <p className="text-sm text-slate-500">Documento • {tenant.document}</p>
            ) : (
              <p className="text-sm text-slate-500">Nenhum cliente selecionado.</p>
            )}
          </div>
        </DialogHeader>
        {tenant ? (
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="space-y-5">
              <div className="rounded-3xl border border-slate-100 bg-slate-50/60 p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <TenantStatusBadge status={tenant.status} />
                  <TenantPlanBadge plan={tenant.plan} />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Criado em {dateFormatter.format(new Date(tenant.createdAt))}
                  </span>
                </div>
                <div className="mt-5 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Contato principal</p>
                      <p className="font-semibold text-slate-900">{tenant.contact.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
                      <p className="font-semibold text-slate-900">{tenant.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Telefone</p>
                      <p className="font-semibold text-slate-900">{tenant.contact.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Métricas do cliente</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[{
                    label: 'Câmeras ativas',
                    value: `${numberFormatter.format(tenant.activeCameras)} / ${numberFormatter.format(tenant.cameras)}`,
                    helper: 'Ativas / total',
                  },
                  {
                    label: 'Sites monitorados',
                    value: numberFormatter.format(tenant.sites),
                    helper: 'Unidades conectadas',
                  },
                  {
                    label: 'Usuários com acesso',
                    value: numberFormatter.format(tenant.users),
                    helper: 'Credenciais provisionadas',
                  },
                  {
                    label: 'Uso de armazenamento',
                    value: `${tenant.storage.usedTb} TB / ${tenant.storage.totalTb} TB`,
                    helper: `${usagePercent}% da cota contratada`,
                  }].map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{metric.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
                      <p className="text-xs text-slate-500">{metric.helper}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Sites principais</p>
                <div className="mt-4 space-y-3">
                  {tenant.siteSummary.map((site) => (
                    <div
                      key={site.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-3 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{site.name}</p>
                        <p className="text-xs uppercase tracking-wide text-slate-500">ID • {site.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-slate-900">{numberFormatter.format(site.cameras)}</p>
                        <p className="text-xs text-slate-500">câmeras</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="rounded-3xl border border-slate-100 bg-slate-900 p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">Ações rápidas</p>
                <p className="mt-4 text-lg font-semibold">Portal administrativo</p>
                <p className="text-sm text-white/70">
                  Acesse a área exclusiva deste cliente para ajustar permissões, notificações e monitoramento.
                </p>
                <div className="mt-6 space-y-3">
                  <Button
                    type="button"
                    className="h-11 w-full rounded-2xl bg-white text-slate-900"
                    onClick={() => console.info('Abrir portal do cliente - ação futura')}
                  >
                    Abrir portal do cliente
                  </Button>
                  <Button type="button" variant="outline" className="h-11 w-full rounded-2xl border-white/40 text-white" disabled={tenant.status === 'inactive'}>
                    Suspender cliente
                  </Button>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Server className="h-4 w-4 text-slate-400" />
                  Última sincronização automática há 4 minutos.
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Esta visualização respeita a LGPD e apresenta apenas métricas e dados cadastrais, sem streaming ou imagens.
                </p>
              </div>
            </section>
          </div>
        ) : (
          <div className="py-16 text-center text-sm text-slate-500">
            Escolha um tenant para visualizar os detalhes operacionais.
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
