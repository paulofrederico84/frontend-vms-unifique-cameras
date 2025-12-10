import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import type { AlertRule } from '@/modules/admin/ai-alerts/mockAlertRules'
import { RULE_SCOPE_LABELS } from '@/modules/admin/ai-alerts/mockAlertRules'

import { AiModuleBadge } from './AiModuleBadge'
import { SeverityBadge } from './SeverityBadge'

type AlertRulesListProps = {
  rules: AlertRule[]
  onSelectRule: (rule: AlertRule) => void
}

export function AlertRulesList({ rules, onSelectRule }: AlertRulesListProps) {
  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-sm ring-1 ring-transparent transition hover:ring-slate-200"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">{rule.name}</p>
              <p className="text-sm text-slate-500">{rule.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <AiModuleBadge type={rule.aiType} />
              <SeverityBadge severity={rule.defaultSeverity} />
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {RULE_SCOPE_LABELS[rule.scope]}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${rule.enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}
              >
                {rule.enabled ? 'Ativa' : 'Inativa'}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1 rounded-full"
                onClick={() => onSelectRule(rule)}
              >
                Detalhes <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
