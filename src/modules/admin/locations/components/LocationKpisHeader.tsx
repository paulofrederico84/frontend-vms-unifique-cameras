import { Card, CardContent } from '@/components/ui/card'

export type LocationKpiStats = {
  totalLocations: number
  totalCameras: number
  onlineCameras: number
  offlineCameras: number
  healthPercentage: number
}

const KPI_METADATA = [
  { key: 'totalLocations', label: 'Locais monitorados' },
  { key: 'totalCameras', label: 'Câmeras totais' },
  { key: 'onlineCameras', label: 'Câmeras online' },
  { key: 'offlineCameras', label: 'Câmeras offline' },
  { key: 'healthPercentage', label: 'Saúde geral' },
] as const

type LocationKpisHeaderProps = {
  stats: LocationKpiStats
}

export function LocationKpisHeader({ stats }: LocationKpisHeaderProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {KPI_METADATA.map((kpi) => (
        <Card key={kpi.key} className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
          <CardContent className="space-y-3 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{kpi.label}</p>
            <p className="text-3xl font-semibold text-slate-900">
              {kpi.key === 'healthPercentage' ? `${stats[kpi.key]}%` : stats[kpi.key].toLocaleString('pt-BR')}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
