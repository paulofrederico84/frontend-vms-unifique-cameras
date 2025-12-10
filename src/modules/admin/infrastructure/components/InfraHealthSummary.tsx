import { AlertTriangle, HardDrive, ShieldCheck, Zap } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export type InfraHealthSummaryData = {
  healthScore: number
  gpuOverload: number
  avgDiskUsage: number
  riskServers: number
}

export function InfraHealthSummary({ summary }: { summary: InfraHealthSummaryData }) {
  return (
    <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
      <CardContent className="space-y-6 p-6">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Saúde da infraestrutura</p>
            <h2 className="text-2xl font-semibold text-slate-900">Panorama consolidado</h2>
            <p className="text-sm text-slate-500">Monitoramento nonstop de clusters IA, gravação, streaming e núcleo orquestrador.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Health score</p>
              <p className="text-5xl font-semibold text-slate-900">{summary.healthScore}%</p>
            </div>
            <div className="hidden h-16 w-px bg-slate-200 lg:block" />
            <div className="flex flex-col gap-1 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Saúde geral com base em telemetria.
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" /> Gargalos IA detectados: {summary.gpuOverload}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Uso médio de disco</p>
            <div className="mt-3 flex items-center gap-3">
              <HardDrive className="h-9 w-9 text-slate-500" />
              <div className="w-full">
                <p className="text-2xl font-semibold text-slate-900">{summary.avgDiskUsage}%</p>
                <div className="mt-2 h-2 rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{ width: `${summary.avgDiskUsage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Nós IA sobrecarregados</p>
            <div className="mt-3 flex items-center gap-3">
              <Zap className="h-9 w-9 text-amber-500" />
              <div>
                <p className="text-2xl font-semibold text-slate-900">{summary.gpuOverload}</p>
                <p className="text-xs text-slate-500">Acionar rebalanceamento automático</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Servidores em risco</p>
            <div className="mt-3 flex items-center gap-3">
              <AlertTriangle className="h-9 w-9 text-rose-500" />
              <div>
                <p className="text-2xl font-semibold text-slate-900">{summary.riskServers}</p>
                <p className="text-xs text-slate-500">Uso &gt; 90% em CPU, RAM ou Disco</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
