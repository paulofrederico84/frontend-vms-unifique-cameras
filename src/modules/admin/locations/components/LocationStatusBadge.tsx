type LocationStatusBadgeProps = {
  total: number
  online: number
  offline: number
  unstable: number
  maintenance: number
}

const STATUS_META = [
  { key: 'online', label: 'Online', color: 'bg-emerald-500' },
  { key: 'offline', label: 'Offline', color: 'bg-rose-500' },
  { key: 'unstable', label: 'Instável', color: 'bg-amber-400' },
  { key: 'maintenance', label: 'Manutenção', color: 'bg-slate-400' },
] as const

export function LocationStatusBadge({ total, online, offline, unstable, maintenance }: LocationStatusBadgeProps) {
  const safeTotal = total > 0 ? total : 1
  const segments = [online, offline, unstable, maintenance]
  const values = { online, offline, unstable, maintenance }

  return (
    <div className="space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="flex h-full w-full">
          {STATUS_META.map((status, index) => {
            const value = segments[index]
            if (value <= 0) {
              return null
            }

            return (
              <span
                key={status.key}
                className={`${status.color} h-full`}
                style={{ width: `${Math.max((value / safeTotal) * 100, 1)}%` }}
              />
            )
          })}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-slate-500">
        {STATUS_META.map((status) => (
          <span key={status.key} className="inline-flex items-center gap-1">
            <span className={`${status.color} inline-flex h-2 w-2 rounded-full`} />
            {status.label}: {values[status.key]}
          </span>
        ))}
      </div>
    </div>
  )
}
