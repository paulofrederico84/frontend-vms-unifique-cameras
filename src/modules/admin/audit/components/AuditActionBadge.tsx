import { cn } from '@/lib/utils'
import type {
  AuditActionType,
  AuditResourceType
} from '@/modules/admin/audit/mockAuditEvents'
import { AUDIT_ACTION_LABELS } from '@/modules/admin/audit/mockAuditEvents'

const CATEGORY_STYLES: Record<'USER' | 'TENANT' | 'CAMERA' | 'IA' | 'ALERT_RULE' | 'INFRA' | 'ACCESS' | 'PLATFORM', string> = {
  USER: 'bg-sky-50 text-sky-700 border border-sky-100',
  TENANT: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
  CAMERA: 'bg-amber-50 text-amber-700 border border-amber-100',
  IA: 'bg-purple-50 text-purple-700 border border-purple-100',
  ALERT_RULE: 'bg-rose-50 text-rose-700 border border-rose-100',
  INFRA: 'bg-slate-900/90 text-white border border-slate-900',
  ACCESS: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  PLATFORM: 'bg-slate-100 text-slate-700 border border-slate-200',
}

const ACCESS_ACTIONS: AuditActionType[] = ['ACCESS_TEMP_GRANTED', 'ACCESS_TEMP_REVOKED', 'LOGIN', 'LOGOUT']

function getCategory(resourceType?: AuditResourceType, actionType?: AuditActionType) {
  if (resourceType) {
    return resourceType
  }
  if (actionType && ACCESS_ACTIONS.includes(actionType)) {
    return 'ACCESS'
  }
  return 'PLATFORM'
}

export function AuditActionBadge({
  action,
  resourceType,
  className,
}: {
  action: AuditActionType
  resourceType?: AuditResourceType
  className?: string
}) {
  const category = getCategory(resourceType, action)
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
        CATEGORY_STYLES[category],
        className,
      )}
    >
      {AUDIT_ACTION_LABELS[action]}
    </span>
  )
}
