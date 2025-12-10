import type { ReactNode } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'

type Trend = {
  value: number
  label: string
}

type KpiCardProps = {
  title: string
  value: string
  helper?: string
  icon: ReactNode
  trend?: Trend
  trendDirection?: 'up' | 'down'
}

export function KpiCard({ title, value, helper, icon, trend, trendDirection = 'up' }: KpiCardProps) {
  const TrendIcon = trendDirection === 'down' ? ArrowDownRight : ArrowUpRight
  const trendColor = trendDirection === 'down' ? 'text-rose-500' : 'text-emerald-500'

  return (
    <div className="group rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{title}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition group-hover:bg-slate-100">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
      <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
        <span>{helper}</span>
        {trend ? (
          <span className={cn('flex items-center gap-1 font-medium', trendColor)}>
            <TrendIcon className="h-4 w-4" /> {trend.value}%
            <span className="text-slate-400">{trend.label}</span>
          </span>
        ) : null}
      </div>
    </div>
  )
}
