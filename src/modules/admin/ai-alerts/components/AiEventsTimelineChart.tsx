import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type AiEventsTimelineDatum = {
  hourLabel: string
  count: number
}

type AiEventsTimelineChartProps = {
  data: AiEventsTimelineDatum[]
}

const buildPath = (data: AiEventsTimelineDatum[]) => {
  if (data.length === 0) return ''
  const max = Math.max(...data.map((item) => item.count), 1)
  const step = 100 / Math.max(data.length - 1, 1)

  return data
    .map((item, index) => {
      const x = index * step
      const y = 100 - (item.count / max) * 100
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')
}

export function AiEventsTimelineChart({ data }: AiEventsTimelineChartProps) {
  const pathD = buildPath(data)
  const max = Math.max(...data.map((item) => item.count), 1)

  return (
    <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
      <CardHeader>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Atividade por hora</p>
        <CardTitle className="text-2xl">Timeline das últimas 24h</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-48 w-full rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-4">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="aiTimeline" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
            <path d={`${pathD} L 100 100 L 0 100 Z`} fill="url(#aiTimeline)" opacity={0.3} />
          </svg>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          {data.map((item) => (
            <div key={item.hourLabel} className="flex flex-col">
              <span className="font-semibold text-slate-900">{item.count}</span>
              <span>{item.hourLabel}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500">Maior pico: {max} eventos/h.</p>
      </CardContent>
    </Card>
  )
}
