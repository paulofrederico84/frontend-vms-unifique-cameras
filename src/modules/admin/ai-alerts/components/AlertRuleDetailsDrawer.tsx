import { ListChecks } from 'lucide-react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { AlertRule } from '@/modules/admin/ai-alerts/mockAlertRules'
import { RULE_SCOPE_LABELS, SEVERITY_IMPACT, WEEKDAY_LABELS } from '@/modules/admin/ai-alerts/mockAlertRules'

import { AiModuleBadge } from './AiModuleBadge'
import { SeverityBadge } from './SeverityBadge'

type AlertRuleDetailsDrawerProps = {
  rule: AlertRule | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AlertRuleDetailsDrawer({ rule, open, onOpenChange }: AlertRuleDetailsDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-0">
        <div className="flex h-full flex-col gap-6 overflow-y-auto p-8">
          {rule ? (
            <>
              <SheetHeader>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Regra global</p>
                <SheetTitle>{rule.name}</SheetTitle>
                <SheetDescription>{rule.description}</SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-6 sm:grid-cols-2">
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Módulo IA</p>
                  <AiModuleBadge type={rule.aiType} />
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Severidade padrão</p>
                  <SeverityBadge severity={rule.defaultSeverity} />
                  <p className="text-xs text-slate-500">{SEVERITY_IMPACT[rule.defaultSeverity]}</p>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Escopo</p>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {RULE_SCOPE_LABELS[rule.scope]}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${rule.enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    {rule.enabled ? 'Ativa' : 'Inativa'}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Janela ativa</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">{rule.activeHours}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Dias aplicados</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {rule.daysOfWeek.map((day) => (
                      <span key={day} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                        {WEEKDAY_LABELS[day] ?? day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600">
                <div className="mb-2 flex items-center gap-2 text-slate-900">
                  <ListChecks className="h-4 w-4" /> Nota operacional
                </div>
                A configuração fina é aplicada pelos Clientes Master dentro dos seus ambientes. O Admin Master define aqui o padrão
                global de comportamento e severidade que será herdado e customizado em cada tenant.
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-500">Selecione uma regra para visualizar detalhes.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
