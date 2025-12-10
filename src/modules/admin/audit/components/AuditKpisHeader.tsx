import { Activity, Cpu, ShieldAlert, Users } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import type { AuditKpiStats } from '@/modules/admin/audit/mockAuditEvents'

const KPI_META = [
  {
    key: 'eventsLast24h' as const,
    label: 'Eventos (24h)',
    description: 'Volume registrado nas últimas 24h',
    icon: Activity,
    accent: 'bg-slate-900 text-white',
  },
  {
    key: 'severeEvents' as const,
    label: 'Alta severidade',
    description: 'Eventos High + Critical',
    icon: ShieldAlert,
    accent: 'bg-rose-600/10 text-rose-600',
  },
  {
    key: 'distinctUsers24h' as const,
    label: 'Usuários envolvidos',
    description: 'Distintos nas últimas 24h',
    icon: Users,
    accent: 'bg-sky-600/10 text-sky-600',
  },
  {
    key: 'productionChanges' as const,
    label: 'Mudanças em produção',
    description: 'IA, alertas e infraestrutura',
    icon: Cpu,
    accent: 'bg-amber-500/10 text-amber-600',
  },
]

export function AuditKpisHeader({ stats }: { stats: AuditKpiStats }) {
  return (
    <section className="grid gap-4 lg:grid-cols-4">
      {KPI_META.map(({ key, label, description, icon: Icon, accent }) => (
        <Card key={key} className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
                <p className="mt-1 text-3xl font-semibold text-slate-900">{stats[key]}</p>
              </div>
              <div className="rounded-2xl p-3 text-slate-900">
                <Icon className={`h-5 w-5 ${accent}`} />
              </div>
            </div>
            <p className="text-xs text-slate-500">{description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
