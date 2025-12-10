import { Activity, AlertTriangle, Building2, CircuitBoard } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

type AiAlertsKpiStats = {
  totalEvents: number
  criticalEvents: number
  activeTenants: number
  activeModules: number
}

type AiAlertsKpisHeaderProps = {
  stats: AiAlertsKpiStats
}

const KPI_META = [
  {
    key: 'totalEvents' as const,
    label: 'Eventos IA (24h)',
    icon: Activity,
    helper: '+18% vs último dia'
  },
  {
    key: 'criticalEvents' as const,
    label: 'Eventos críticos',
    icon: AlertTriangle,
    helper: 'Escalados para SOC'
  },
  {
    key: 'activeTenants' as const,
    label: 'Clientes com alertas',
    icon: Building2,
    helper: 'Operações com IA ativa'
  },
  {
    key: 'activeModules' as const,
    label: 'Módulos IA ativos',
    icon: CircuitBoard,
    helper: 'Tipos analisados hoje'
  }
]

export function AiAlertsKpisHeader({ stats }: AiAlertsKpisHeaderProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {KPI_META.map((kpi) => (
        <Card key={kpi.key} className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <kpi.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{kpi.label}</p>
              <p className="text-3xl font-semibold text-slate-900">{stats[kpi.key].toLocaleString('pt-BR')}</p>
              <p className="text-xs text-slate-500">{kpi.helper}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
