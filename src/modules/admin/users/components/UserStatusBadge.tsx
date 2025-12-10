import { cn } from '@/lib/utils'
import type { AdminUserStatus } from '@/modules/admin/users/mockUsers'

const STATUS_LABELS: Record<AdminUserStatus, string> = {
  active: 'Ativo',
  suspended: 'Suspenso',
  pending: 'Pendente',
  invited: 'Convite enviado',
}

const STATUS_STYLES: Record<AdminUserStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  suspended: 'bg-rose-50 text-rose-700 border border-rose-100',
  pending: 'bg-amber-50 text-amber-700 border border-amber-100',
  invited: 'bg-sky-50 text-sky-700 border border-sky-100',
}

export function UserStatusBadge({ status, className }: { status: AdminUserStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
        STATUS_STYLES[status],
        className,
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}
