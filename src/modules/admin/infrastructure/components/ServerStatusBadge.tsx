import type { InfraServerStatus } from '@/modules/admin/infrastructure/mockServers'

const STATUS_META: Record<InfraServerStatus, { label: string; className: string }> = {
  online: { label: 'Online', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  degraded: { label: 'Degradado', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  offline: { label: 'Offline', className: 'bg-rose-100 text-rose-700 border-rose-200' },
  maintenance: { label: 'Manutenção', className: 'bg-slate-100 text-slate-600 border-slate-200' },
}

type ServerStatusBadgeProps = {
  status: InfraServerStatus
}

export function ServerStatusBadge({ status }: ServerStatusBadgeProps) {
  const meta = STATUS_META[status]

  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${meta.className}`}>{meta.label}</span>
}
