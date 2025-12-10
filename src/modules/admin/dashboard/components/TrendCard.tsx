import { useId } from 'react'
import type { ReactNode } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'

type TrendCardProps = {
  title: string
  description: string
  value: string
  trendValue: number
  trendLabel: string
  dataPoints: number[]
  trendDirection?: 'up' | 'down'
  icon?: ReactNode
}

export function TrendCard({
  title,
  description,
  value,
  trendValue,
  trendLabel,
  dataPoints,
  trendDirection = 'up',
  icon,
}: TrendCardProps) {
  const gradientId = useId()
  const TrendIcon = trendDirection === 'down' ? ArrowDownRight : ArrowUpRight
  const trendColor = trendDirection === 'down' ? 'text-rose-500' : 'text-emerald-500'
  const maxPoint = Math.max(...dataPoints, 1)
  const normalized = dataPoints.map((point) => point / maxPoint)
  const pathD = normalized
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${index * 20} ${80 - point * 80}`)
    .join(' ')

  return (
    <div className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
        {icon ? <div className="text-slate-400">{icon}</div> : null}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-slate-900">{value}</p>
          <p className={cn('mt-1 flex items-center gap-1 text-sm font-medium', trendColor)}>
            <TrendIcon className="h-4 w-4" /> {trendValue}%
            <span className="text-slate-400">{trendLabel}</span>
          </p>
        </div>
        <svg viewBox="0 0 120 80" className="h-16 w-32 text-brand-primary/60" preserveAspectRatio="none">
          <path d={pathD} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#009FE3" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#009FE3" stopOpacity="0" />
          </linearGradient>
          <path d={`${pathD} L 120 80 L 0 80 Z`} fill={`url(#${gradientId})`} opacity={0.2} />
        </svg>
      </div>
    </div>
  )
}
