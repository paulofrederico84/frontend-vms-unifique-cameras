import { cn } from '@/lib/utils'
import type { TenantStatus } from '@/modules/admin/tenants/mockTenants'

const STATUS_LABELS: Record<TenantStatus, string> = {
  active: 'Ativo',
  suspended: 'Suspenso',
  inactive: 'Inativo',
  trial: 'Trial',
}

const STATUS_STYLES: Record<TenantStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  suspended: 'bg-amber-50 text-amber-700 border border-amber-100',
  inactive: 'bg-slate-50 text-slate-600 border border-slate-200',
  trial: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
}

export type TenantStatusBadgeProps = {
  status: TenantStatus
  className?: string
}

export function TenantStatusBadge({ status, className }: TenantStatusBadgeProps) {
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
