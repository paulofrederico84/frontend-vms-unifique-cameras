import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { AdminDashboardData } from '@/modules/admin/dashboard/adminDashboardMocks'
import { cn } from '@/lib/utils'

export type AdminDashboardChartsProps = {
  data: AdminDashboardData
}

const severityStyles: Record<AdminDashboardData['recentEvents'][number]['severity'], string> = {
  LOW: 'bg-emerald-100 text-emerald-800',
  MEDIUM: 'bg-amber-100 text-amber-800',
  HIGH: 'bg-orange-100 text-orange-800',
  CRITICAL: 'bg-red-100 text-red-800',
}

const statusColors = {
  online: 'bg-emerald-500/80',
  offline: 'bg-slate-300',
  error: 'bg-red-500/80',
  maintenance: 'bg-amber-400/80',
}

export function AdminDashboardCharts({ data }: AdminDashboardChartsProps) {
  const maxEvents = data.dailyEvents.length
    ? Math.max(...data.dailyEvents.map((point) => point.totalEvents))
    : 1

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-0 bg-white shadow-sm ring-1 ring-muted/40">
        <CardHeader>
          <CardTitle>Status das câmeras</CardTitle>
          <CardDescription>Distribuição das câmeras por estado operacional.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 rounded-xl bg-muted/40 p-4">
            {[
              { label: 'Online', value: data.camerasStatus.online, color: statusColors.online },
              { label: 'Offline', value: data.camerasStatus.offline, color: statusColors.offline },
              { label: 'Erro', value: data.camerasStatus.error, color: statusColors.error },
              { label: 'Manutenção', value: data.camerasStatus.maintenance, color: statusColors.maintenance },
            ].map((status) => (
              <div key={status.label} className="flex items-center justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className={cn('h-2.5 w-2.5 rounded-full', status.color)} />
                  {status.label}
                </div>
                <span className="text-muted-foreground">{status.value}</span>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Eventos por dia</p>
            <div className="mt-3 flex h-40 items-end gap-3">
              {data.dailyEvents.map((point) => {
                const heightPercent = Math.round((point.totalEvents / maxEvents) * 100)
                return (
                  <div key={point.date} className="flex flex-1 flex-col items-center gap-2 text-xs">
                    <div className="flex h-full w-full items-end justify-center rounded-md bg-muted">
                      <div
                        className="w-full rounded-md bg-brand-primary"
                        style={{ height: `${heightPercent}%` }}
                        aria-label={`Total de ${point.totalEvents} eventos em ${point.date}`}
                      />
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {new Date(point.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    </div>
                    <div className="font-semibold text-foreground">{point.totalEvents}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-white shadow-sm ring-1 ring-muted/40">
        <CardHeader>
          <CardTitle>Eventos recentes</CardTitle>
          <CardDescription>Últimos eventos priorizados automaticamente.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2 pr-4">Tipo</th>
                <th className="py-2 pr-4">Câmera</th>
                <th className="py-2 pr-4">Site</th>
                <th className="py-2 pr-4">Data/Hora</th>
                <th className="py-2 pr-4">Severidade</th>
              </tr>
            </thead>
            <tbody>
              {data.recentEvents.map((event) => (
                <tr key={event.id} className="border-b border-muted/50 text-foreground last:border-0">
                  <td className="py-3 pr-4 font-medium">{event.type}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{event.cameraName}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{event.siteName}</td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {new Date(event.timestamp).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={cn(
                        'rounded-full px-2 py-1 text-xs font-semibold',
                        severityStyles[event.severity],
                      )}
                    >
                      {event.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
