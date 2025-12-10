import { AuditActionBadge } from '@/modules/admin/audit/components/AuditActionBadge'
import { AuditSeverityBadge } from '@/modules/admin/audit/components/AuditSeverityBadge'
import type { AuditEvent } from '@/modules/admin/audit/mockAuditEvents'
import { AUDIT_ACTION_LABELS } from '@/modules/admin/audit/mockAuditEvents'
import { UserRoleBadge } from '@/modules/admin/users/components/UserRoleBadge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'

const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'full',
  timeStyle: 'short',
})

const IMPACTO_INFRA = 'Impacto estimado: failover automático em até 3 minutos para redundância ativa.'

export type AuditEventDetailsDrawerProps = {
  event: AuditEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm text-slate-900">{value}</p>
    </div>
  )
}

function DiffSummary({ diff }: { diff?: string }) {
  if (!diff) return null
  const lines = diff.split('\n').map((line) => line.trim()).filter(Boolean)
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Antes / Depois</p>
      <div className="mt-2 space-y-1">
        {lines.map((line, index) => (
          <p key={`${line}-${index}`}>{line}</p>
        ))}
      </div>
    </div>
  )
}

export function AuditEventDetailsDrawer({ event, open, onOpenChange }: AuditEventDetailsDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-3xl overflow-y-auto border-l border-slate-100">
        {event ? (
          <div className="space-y-8">
            <SheetHeader className="space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <AuditSeverityBadge severity={event.severity} />
                <AuditActionBadge action={event.actionType} resourceType={event.resourceType} />
              </div>
              <SheetTitle className="text-2xl text-slate-900">{AUDIT_ACTION_LABELS[event.actionType]}</SheetTitle>
              <SheetDescription className="text-sm text-slate-500">{event.description}</SheetDescription>
              <p className="text-sm font-medium text-slate-900">{dateTimeFormatter.format(new Date(event.timestamp))}</p>
            </SheetHeader>

            <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Quem fez?</p>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-lg font-semibold text-slate-900">{event.actorName}</p>
                  <UserRoleBadge role={event.actorRole} />
                </div>
                <p className="text-sm text-slate-500">{event.actorEmail}</p>
                <div className="grid gap-4 lg:grid-cols-2">
                  <InfoRow label="Origem" value={event.origin} />
                  <InfoRow label="Endereço IP" value={event.ipAddress} />
                  <InfoRow label="User Agent" value={event.userAgent} />
                </div>
              </div>
            </section>

            <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Onde?</p>
              <div className="grid gap-4 lg:grid-cols-2">
                <InfoRow label="Cliente" value={event.tenantName ?? 'Global'} />
                <InfoRow label="Recurso" value={event.resourceName ?? event.resourceType ?? '—'} />
              </div>
            </section>

            <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">O que foi feito?</p>
              <InfoRow label="Tipo" value={AUDIT_ACTION_LABELS[event.actionType]} />
              <p className="text-sm text-slate-600">{event.description}</p>
              <DiffSummary diff={event.diffSummary} />
            </section>

            <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Metadados técnicos</p>
              <div className="grid gap-4 lg:grid-cols-2">
                <InfoRow label="ID do evento" value={event.id} />
                <InfoRow label="Origem" value={event.origin} />
              </div>
              {event.resourceType === 'INFRA' && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  {IMPACTO_INFRA}
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="py-10 text-sm text-slate-500">Selecione um evento para ver os detalhes completos.</div>
        )}
      </SheetContent>
    </Sheet>
  )
}
