import type { AiEventSeverity, AiEventType } from '@/modules/admin/ai-alerts/mockAiEvents'

export type AlertRuleScope = 'GLOBAL' | 'TENANT_TEMPLATE'

export type AlertRule = {
  id: string
  name: string
  description: string
  aiType: AiEventType
  defaultSeverity: AiEventSeverity
  enabled: boolean
  scope: AlertRuleScope
  activeHours: string
  daysOfWeek: string[]
}


export const RULE_SCOPE_LABELS: Record<AlertRuleScope, string> = {
  GLOBAL: 'Global',
  TENANT_TEMPLATE: 'Template para tenants'
}

export const WEEKDAY_LABELS: Record<string, string> = {
  Mon: 'Seg',
  Tue: 'Ter',
  Wed: 'Qua',
  Thu: 'Qui',
  Fri: 'Sex',
  Sat: 'Sáb',
  Sun: 'Dom'
}

export const SEVERITY_IMPACT: Record<AiEventSeverity, string> = {
  low: 'Eventos informativos para acompanhamento silencioso.',
  medium: 'Requer validação pelo cliente em até 30 minutos.',
  high: 'Dispara notificações imediatas para equipes locais.',
  critical: 'Escala para war-room da Unifique e autoridades, quando aplicável.'
}
