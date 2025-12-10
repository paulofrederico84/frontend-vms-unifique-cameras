import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { AdminDashboardData } from '@/modules/admin/dashboard/adminDashboardMocks'

export type AdminDashboardStatsCardsProps = {
  data: AdminDashboardData
  isGlobalAdmin: boolean
}

export function AdminDashboardStatsCards({ data, isGlobalAdmin }: AdminDashboardStatsCardsProps) {
  const onlinePercent = Math.round((data.camerasStatus.online / data.camerasStatus.total) * 100)

  const stats = [
    {
      title: 'Câmeras online',
      value: `${data.camerasStatus.online}/${data.camerasStatus.total}`,
      description: `${onlinePercent}% conectadas neste momento`,
    },
    {
      title: 'Gravações ativas',
      value: data.activeRecordingsCount.toString(),
      description: 'Streams gravando sem interrupções',
    },
    {
      title: 'Eventos hoje',
      value: data.todayEventsCount.toString(),
      description: 'Eventos automaticamente classificados',
    },
    {
      title: 'Alertas críticos',
      value: data.todayCriticalAlertsCount.toString(),
      description: 'Chamadas que exigem atenção imediata',
    },
    {
      title: 'Armazenamento',
      value: `${data.storage.usedPercent.toFixed(1)}%`,
      description: `${data.storage.usedGb} GB de ${data.storage.totalGb} GB • ${data.storage.retentionDays} dias`,
    },
  ]

  if (isGlobalAdmin && typeof data.tenantsCount === 'number') {
    stats.push({
      title: 'Clientes ativos',
      value: data.tenantsCount.toString(),
      description: 'Tenants monitorados em tempo real',
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => (
        <Card key={item.title} className="border-0 bg-white/95 shadow-sm ring-1 ring-muted/40">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wide text-muted-foreground">
              {item.title}
            </CardDescription>
            <CardTitle className="text-3xl font-semibold text-brand-deep">{item.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
