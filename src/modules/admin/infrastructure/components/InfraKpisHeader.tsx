import { ActivitySquare, Server, ThermometerSun, Zap } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export type InfraKpiStats = {
  totalServers: number
  online: number
  degraded: number
  offline: number
  avgCpu: number
  avgRam: number
}

const KPI_META = [
  { key: 'totalServers' as const, label: 'Servidores monitorados', icon: Server, helper: 'Infra global' },
  { key: 'online' as const, label: 'Online', icon: Zap, helper: 'Capacidade disponível' },
  { key: 'degraded' as const, label: 'Degradados', icon: ThermometerSun, helper: 'Pontos de atenção' },
  { key: 'offline' as const, label: 'Offline', icon: ActivitySquare, helper: 'Falhas / manutenção' },
]

export function InfraKpisHeader({ stats }: { stats: InfraKpiStats }) {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
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
      <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
        <CardContent className="p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Utilização média</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>CPU</span>
                <span className="font-semibold text-slate-900">{stats.avgCpu}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-slate-900" style={{ width: `${stats.avgCpu}%` }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>RAM</span>
                <span className="font-semibold text-slate-900">{stats.avgRam}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-slate-700" style={{ width: `${stats.avgRam}%` }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
