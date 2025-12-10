import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type AiEventsByTypeDatum = {
  type: string
  label: string
  color: string
  count: number
  percentage: number
}

type AiEventsByTypeChartProps = {
  data: AiEventsByTypeDatum[]
}

const buildDonutGradient = (data: AiEventsByTypeDatum[]) => {
  if (data.length === 0) {
    return 'conic-gradient(#e2e8f0 0deg 360deg)'
  }

  let offset = 0
  const segments: string[] = []

  data.forEach((item) => {
    const nextOffset = offset + item.percentage * 3.6
    segments.push(`${item.color} ${offset}deg ${nextOffset}deg`)
    offset = nextOffset
  })

  return `conic-gradient(${segments.join(', ')})`
}

export function AiEventsByTypeChart({ data }: AiEventsByTypeChartProps) {
  const donutStyle = { backgroundImage: buildDonutGradient(data) }
  const totalEvents = data.reduce((total, item) => total + item.count, 0)

  return (
    <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Distribuição por tipo</p>
          <CardTitle className="text-2xl">Eventos IA por módulo</CardTitle>
        </div>
        <div className="text-right text-sm text-slate-500">
          Total 24h
          <p className="text-2xl font-semibold text-slate-900">{totalEvents}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 lg:flex-row">
        <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-slate-50" style={donutStyle}>
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">IA ativos</p>
            <p className="text-3xl font-semibold text-slate-900">{data.length}</p>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div key={item.type} className="space-y-1">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-slate-900">{item.label}</span>
                </div>
                <span className="font-semibold text-slate-900">{item.count}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: `${item.color}` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
