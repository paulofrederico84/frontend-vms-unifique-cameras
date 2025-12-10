type HealthBarProps = {
  label: string
  value: number
  total: number
  color: string
  tooltip?: string
}

export function HealthBar({ label, value, total, color, tooltip }: HealthBarProps) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[13px] text-slate-500">
        <span className="font-semibold text-slate-800">{label}</span>
        <span className="font-medium text-slate-600">
          {value} <span className="text-slate-400">({percentage}%)</span>
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
          title={tooltip}
        />
      </div>
    </div>
  )
}
