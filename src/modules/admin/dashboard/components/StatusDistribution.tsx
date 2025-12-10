import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { HealthBar } from './HealthBar'

export type StatusDistributionItem = {
  label: string
  color: string
  value: number
  description: string
}

type StatusDistributionProps = {
  items: StatusDistributionItem[]
}

export function StatusDistribution({ items }: StatusDistributionProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0)

  return (
    <TooltipProvider delayDuration={150}>
      <div className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Status das câmeras</p>
            <p className="text-xs text-slate-500">Saúde operacional consolidada</p>
          </div>
          <span className="text-xs font-medium text-slate-400">{total} ativos</span>
        </div>

        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <div>
                  <HealthBar label={item.label} value={item.value} total={total} color={item.color} tooltip={item.description} />
                </div>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>{item.description}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
