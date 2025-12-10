import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { AuditActionBadge } from '@/modules/admin/audit/components/AuditActionBadge'
import { AuditSeverityBadge } from '@/modules/admin/audit/components/AuditSeverityBadge'
import type { AuditEvent } from '@/modules/admin/audit/mockAuditEvents'
import type { AuditResourceType } from '@/modules/admin/audit/mockAuditEvents'
import { UserRoleBadge } from '@/modules/admin/users/components/UserRoleBadge'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

const RESOURCE_LABELS: Record<AuditResourceType, string> = {
  USER: 'Usuário',
  TENANT: 'Cliente',
  CAMERA: 'Câmera',
  IA: 'Inteligência Artificial',
  ALERT_RULE: 'Regra de alerta',
  INFRA: 'Infraestrutura',
}

const ORIGIN_STYLES: Record<string, string> = {
  WEB: 'bg-slate-900 text-white',
  API: 'bg-indigo-100 text-indigo-800',
  SCRIPT: 'bg-amber-100 text-amber-700',
  SYSTEM: 'bg-slate-100 text-slate-700',
}

function formatResource(event: AuditEvent) {
  if (!event.resourceType) {
    return '—'
  }
  const label = RESOURCE_LABELS[event.resourceType]
  if (event.resourceName) {
    return `${label} • ${event.resourceName}`
  }
  return label
}

export function AuditEventsTable({ events, onSelectEvent }: { events: AuditEvent[]; onSelectEvent: (event: AuditEvent) => void }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="border-slate-100">
            <TableHead className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Data / Hora</TableHead>
            <TableHead className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Usuário</TableHead>
            <TableHead className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Papel</TableHead>
            <TableHead className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Cliente</TableHead>
            <TableHead className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Ação</TableHead>
            <TableHead className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Severidade</TableHead>
            <TableHead className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Recurso</TableHead>
            <TableHead className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Origem</TableHead>
            <TableHead>
              <span className="sr-only">Detalhes</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow
              key={event.id}
              className="cursor-pointer border-slate-50 transition hover:bg-slate-50"
              onClick={() => onSelectEvent(event)}
            >
              <TableCell>
                <p className="font-semibold text-slate-900">{dateFormatter.format(new Date(event.timestamp))}</p>
                <p className="text-xs text-slate-500">ID {event.id}</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold text-slate-900">{event.actorName}</p>
                <p className="text-xs text-slate-500">{event.actorEmail}</p>
              </TableCell>
              <TableCell>
                <UserRoleBadge role={event.actorRole} />
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-slate-900">{event.tenantName ?? 'Global'}</p>
                  {event.tenantId && <p className="text-xs text-slate-500">{event.tenantId}</p>}
                </div>
              </TableCell>
              <TableCell>
                <AuditActionBadge action={event.actionType} resourceType={event.resourceType} />
              </TableCell>
              <TableCell>
                <AuditSeverityBadge severity={event.severity} />
              </TableCell>
              <TableCell>
                <p className="text-sm font-medium text-slate-900">{formatResource(event)}</p>
                {event.description && <p className="text-xs text-slate-500">{event.description}</p>}
              </TableCell>
              <TableCell>
                <Badge className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${ORIGIN_STYLES[event.origin] ?? 'bg-slate-100 text-slate-700'}`}>
                  {event.origin}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-2xl border-slate-200 text-slate-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectEvent(event)
                  }}
                >
                  Detalhes
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {events.length === 0 && (
        <div className="border-t border-slate-100 p-8 text-center text-sm text-slate-500">Nenhum evento encontrado com os filtros atuais.</div>
      )}
    </div>
  )
}
