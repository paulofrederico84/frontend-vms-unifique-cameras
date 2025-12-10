import { cn } from '@/lib/utils'
import type { TenantPlan } from '@/modules/admin/tenants/mockTenants'

const PLAN_LABELS: Record<TenantPlan, string> = {
  basic: 'Basic',
  standard: 'Standard',
  advanced: 'Advanced',
  enterprise: 'Enterprise',
}

const PLAN_STYLES: Record<TenantPlan, string> = {
  basic: 'bg-slate-100 text-slate-700 border border-slate-200',
  standard: 'bg-sky-50 text-sky-700 border border-sky-100',
  advanced: 'bg-purple-50 text-purple-700 border border-purple-100',
  enterprise: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
}

export type TenantPlanBadgeProps = {
  plan: TenantPlan
  className?: string
}

export function TenantPlanBadge({ plan, className }: TenantPlanBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
        PLAN_STYLES[plan],
        className,
      )}
    >
      {PLAN_LABELS[plan]}
    </span>
  )
}
