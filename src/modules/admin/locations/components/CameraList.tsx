import { Car, QrCode, Scan, ShieldAlert, Users } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { AdminCamera } from '@/modules/admin/locations/mockCameras'

import { CameraStatusBadge } from './CameraStatusBadge'

const IA_MODULES = [
  { key: 'intrusion', label: 'Intrusão', icon: ShieldAlert },
  { key: 'lineCross', label: 'Linha virtual', icon: Scan },
  { key: 'lpr', label: 'LPR / Placa', icon: QrCode },
  { key: 'peopleCounting', label: 'Contagem pessoas', icon: Users },
  { key: 'vehicleCounting', label: 'Contagem veículos', icon: Car },
] as const

type CameraListProps = {
  cameras: AdminCamera[]
  onSelectCamera: (camera: AdminCamera) => void
}

const maskIp = (ip: string) => {
  const segments = ip.split('.')
  return segments.map((segment, index) => (index < 2 ? segment : 'xxx')).join('.')
}

export function CameraList({ cameras, onSelectCamera }: CameraListProps) {
  if (cameras.length === 0) {
    return (
      <Card className="border border-dashed border-slate-200 bg-slate-50/60">
        <CardContent className="py-12 text-center text-sm text-slate-500">
          Nenhuma câmera cadastrada para este local.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-slate-50/80 shadow-inner">
      <CardContent className="divide-y divide-slate-200 p-0">
        {cameras.map((camera) => (
          <button
            key={camera.id}
            type="button"
            className="w-full text-left transition hover:bg-white/80"
            onClick={() => onSelectCamera(camera)}
          >
            <div className="flex flex-col gap-3 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-base font-semibold text-slate-900">{camera.name}</p>
                <p className="text-xs text-slate-500">{camera.model}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">IP mascarado</span>
                  <span className="font-semibold text-slate-900">{maskIp(camera.ip)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Status</span>
                  <CameraStatusBadge status={camera.status} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Gravação</span>
                  <span className="text-sm font-semibold text-slate-900">{camera.recording ? 'Ativa' : 'Pausada'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">IA habilitada</span>
                  <TooltipProvider>
                    <div className="mt-1 flex gap-2">
                      {IA_MODULES.filter((module) => camera.iaModules[module.key]).map((module) => (
                        <Tooltip key={module.key}>
                          <TooltipTrigger asChild>
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm">
                              <module.icon className="h-3.5 w-3.5" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>{module.label}</TooltipContent>
                        </Tooltip>
                      ))}
                      {IA_MODULES.every((module) => !camera.iaModules[module.key]) ? (
                        <span className="text-xs text-slate-400">Nenhum módulo IA</span>
                      ) : null}
                    </div>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
