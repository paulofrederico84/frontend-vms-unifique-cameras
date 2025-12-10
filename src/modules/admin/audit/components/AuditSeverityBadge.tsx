import { cn } from '@/lib/utils'
import type { AuditSeverity } from '@/modules/admin/audit/mockAuditEvents'

const SEVERITY_STYLES: Record<AuditSeverity, string> = {
  low: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  medium: 'bg-amber-50 text-amber-700 border border-amber-100',
  high: 'bg-orange-50 text-orange-700 border border-orange-100',
  critical: 'bg-rose-50 text-rose-700 border border-rose-100',
}

const SEVERITY_LABELS: Record<AuditSeverity, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  critical: 'Crítica',
}

export function AuditSeverityBadge({ severity, className }: { severity: AuditSeverity; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
        SEVERITY_STYLES[severity],
        className,
      )}
    >
      {SEVERITY_LABELS[severity]}
    </span>
  )
}
