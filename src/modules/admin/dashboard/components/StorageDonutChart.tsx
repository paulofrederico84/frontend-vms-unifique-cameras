const DONUT_SIZE = 140
const STROKE_WIDTH = 14
const CENTER = DONUT_SIZE / 2
const RADIUS = (DONUT_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export type StorageDonutChartProps = {
  usedGb: number
  totalGb: number
}

export function StorageDonutChart({ usedGb, totalGb }: StorageDonutChartProps) {
  const usedPercent = totalGb > 0 ? Math.round((usedGb / totalGb) * 100) : 0
  const strokeDashoffset = CIRCUMFERENCE - (usedPercent / 100) * CIRCUMFERENCE

  return (
    <div className="rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Uso de armazenamento</p>
          <p className="text-xs text-slate-500">Monitoramento das gravações</p>
        </div>
        <span className="text-xs font-medium text-slate-400">{totalGb} GB total</span>
      </div>

      <div className="mt-6 flex items-center gap-8">
        <div className="relative h-[140px] w-[140px]">
          <svg width={DONUT_SIZE} height={DONUT_SIZE} className="-rotate-90">
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth={STROKE_WIDTH}
            />
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="#009FE3"
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold text-slate-900">{usedPercent}%</p>
            <span className="text-xs uppercase tracking-wide text-slate-500">utilizado</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-[#009FE3]" />
            <div>
              <p className="text-sm font-semibold text-slate-900">{usedGb} GB</p>
              <p className="text-xs text-slate-500">Em uso</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-slate-200" />
            <div>
              <p className="text-sm font-semibold text-slate-900">{totalGb - usedGb} GB</p>
              <p className="text-xs text-slate-500">Disponível</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
