import { Card, CardContent } from '@/components/ui/card'

export type TenantKpiStats = {
  totalTenants: number
  activeTenants: number
  suspendedTenants: number
  totalCameras: number
  averageCameras: number
}

const KPI_METADATA = [
  { key: 'totalTenants', label: 'Total de tenants' },
  { key: 'activeTenants', label: 'Tenants ativos' },
  { key: 'suspendedTenants', label: 'Tenants suspensos' },
  { key: 'totalCameras', label: 'Câmeras monitoradas' },
  { key: 'averageCameras', label: 'Média de câmeras / tenant' },
] as const

export function TenantKpisHeader({ stats }: { stats: TenantKpiStats }) {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {KPI_METADATA.map((kpi) => {
        const value = stats[kpi.key]
        const formattedValue = kpi.key === 'averageCameras' ? value.toFixed(1) : value.toLocaleString('pt-BR')
        return (
          <Card key={kpi.key} className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
            <CardContent className="px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{kpi.label}</p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">{formattedValue}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
