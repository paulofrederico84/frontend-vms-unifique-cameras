import type { ReactElement } from 'react'

import { AlertTriangle, Camera, Radar } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type EventRow = {
  id: string
  type: 'intrusion' | 'lpr' | 'line' | 'loitering' | 'other'
  camera: string
  site: string
  time: string
  severity: 'low' | 'medium' | 'high'
  summary: string
}

const severityStyles: Record<EventRow['severity'], string> = {
  low: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
  medium: 'bg-amber-50 text-amber-700 border border-amber-100',
  high: 'bg-rose-50 text-rose-700 border border-rose-100',
}

const typeIcon: Record<EventRow['type'], ReactElement> = {
  intrusion: <AlertTriangle className="h-4 w-4" />,
  lpr: <Radar className="h-4 w-4" />,
  line: <Camera className="h-4 w-4" />,
  loitering: <Camera className="h-4 w-4" />,
  other: <Camera className="h-4 w-4" />,
}

type EventsTableProps = {
  events: EventRow[]
}

export function EventsTable({ events }: EventsTableProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Eventos recentes</p>
          <p className="text-xs text-slate-500">Últimas ocorrências inteligentes</p>
        </div>
        <Button variant="ghost" size="sm" className="text-xs font-semibold text-brand-primary">
          Ver todos
        </Button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-slate-100">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 text-left">Evento</th>
              <th className="px-4 py-3 text-left">Câmera</th>
              <th className="px-4 py-3 text-left">Local</th>
              <th className="px-4 py-3 text-left">Horário</th>
              <th className="px-4 py-3 text-left">Severidade</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white/90">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      {typeIcon[event.type]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 capitalize">{event.type}</p>
                      <p className="text-xs text-slate-500">{event.summary}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{event.camera}</td>
                <td className="px-4 py-3 text-slate-600">{event.site}</td>
                <td className="px-4 py-3 text-slate-600">{event.time}</td>
                <td className="px-4 py-3">
                  <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', severityStyles[event.severity])}>
                    {event.severity}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm" className="text-xs font-semibold text-brand-primary">
                    Ver detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
