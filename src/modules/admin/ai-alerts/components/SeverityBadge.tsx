import type { AiEventSeverity } from '@/modules/admin/ai-alerts/mockAiEvents'

const SEVERITY_META: Record<AiEventSeverity, { label: string; className: string }> = {
  low: { label: 'Baixa', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  medium: { label: 'Média', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  high: { label: 'Alta', className: 'bg-orange-100 text-orange-700 border-orange-200' },
  critical: { label: 'Crítica', className: 'bg-rose-100 text-rose-700 border-rose-200' }
}

type SeverityBadgeProps = {
  severity: AiEventSeverity
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const severityMeta = SEVERITY_META[severity]

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${severityMeta.className}`}>
      {severityMeta.label}
    </span>
  )
}
