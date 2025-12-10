import { Card, CardContent } from '@/components/ui/card'

export type UserKpiStats = {
  totalUsers: number
  activeUsers: number
  suspendedUsers: number
  technicians: number
  clientMasters: number
}

const KPI_METADATA = [
  { key: 'totalUsers', label: 'Total de usuários' },
  { key: 'activeUsers', label: 'Usuários ativos' },
  { key: 'suspendedUsers', label: 'Usuários suspensos' },
  { key: 'technicians', label: 'Técnicos' },
  { key: 'clientMasters', label: 'Clientes master' },
] as const

export function UserKpisHeader({ stats }: { stats: UserKpiStats }) {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {KPI_METADATA.map((kpi) => (
        <Card key={kpi.key} className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
          <CardContent className="px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{kpi.label}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{stats[kpi.key].toLocaleString('pt-BR')}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
