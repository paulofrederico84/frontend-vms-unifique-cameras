import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type AiTenantRow = {
  tenantId: string
  tenantName: string
  totalEvents: number
  criticalEvents: number
  locationsAffected: number
  highVolume: boolean
}

type AiEventsByTenantTableProps = {
  rows: AiTenantRow[]
}

export function AiEventsByTenantTable({ rows }: AiEventsByTenantTableProps) {
  return (
    <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Top clientes (24h)</p>
        <CardTitle className="text-2xl">Alertas por cliente</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <th className="px-5 py-3 text-left">Cliente</th>
                <th className="px-5 py-3 text-left">Eventos totais</th>
                <th className="px-5 py-3 text-left">Críticos</th>
                <th className="px-5 py-3 text-left">Locais</th>
                <th className="px-5 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.tenantId} className="border-b border-slate-50 text-sm text-slate-600 last:border-0">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{row.tenantName}</p>
                    <p className="text-xs text-slate-500">ID {row.tenantId}</p>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-900">{row.totalEvents}</td>
                  <td className="px-5 py-4 text-rose-600">{row.criticalEvents}</td>
                  <td className="px-5 py-4">{row.locationsAffected}</td>
                  <td className="px-5 py-4">
                    {row.highVolume ? (
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        Alto volume
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Dentro do previsto</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
