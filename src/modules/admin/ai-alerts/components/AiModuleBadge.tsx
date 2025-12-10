import type { AiEventType } from '@/modules/admin/ai-alerts/mockAiEvents'
import { AI_TYPE_COLORS, AI_TYPE_LABELS } from '@/modules/admin/ai-alerts/mockAiEvents'

const ABBREVIATIONS: Record<AiEventType, string> = {
  intrusion: 'INTR',
  line_cross: 'LINE',
  lpr: 'LPR',
  people_count: 'PPL',
  vehicle_count: 'VEH',
  loitering: 'LOIT',
  epi: 'EPI'
}

type AiModuleBadgeProps = {
  type: AiEventType
}

export function AiModuleBadge({ type }: AiModuleBadgeProps) {
  const label = AI_TYPE_LABELS[type]
  const color = AI_TYPE_COLORS[type]
  const abbreviation = ABBREVIATIONS[type]

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold"
      style={{ borderColor: `${color}33`, backgroundColor: `${color}15`, color: color }}
      title={label}
    >
      <span className="font-mono text-[11px]">{abbreviation}</span>
      {label}
    </span>
  )
}
