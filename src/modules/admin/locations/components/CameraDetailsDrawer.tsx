import { BadgeCheck, HardDriveDownload, Radio } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { CameraStatusBadge } from '@/modules/admin/locations/components/CameraStatusBadge'
import type { AdminCamera } from '@/modules/admin/locations/mockCameras'
import { getCameraTechnicalProfile } from '@/modules/admin/locations/mockCameras'

const LAST_SEEN_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

type CameraDetailsDrawerProps = {
  camera: AdminCamera | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CameraDetailsDrawer({ camera, open, onOpenChange }: CameraDetailsDrawerProps) {
  const technicalProfile = camera ? getCameraTechnicalProfile(camera.model) : null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-0">
        <div className="flex h-full flex-col gap-8 overflow-y-auto p-8">
          {camera ? (
            <>
              <SheetHeader>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Câmera</p>
                <SheetTitle>{camera.name}</SheetTitle>
                <SheetDescription>
                  {camera.model} · IP {camera.ip} · Última comunicação {LAST_SEEN_FORMATTER.format(new Date(camera.lastSeen))}
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status</p>
                  <div className="mt-2">
                    <CameraStatusBadge status={camera.status} />
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Gravação</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{camera.recording ? 'Ativa' : 'Pausada'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Resolução</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{camera.resolution}</p>
                </div>
              </div>

              <div className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-900">Parâmetros técnicos</p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">FPS</span>
                      <span className="font-semibold text-slate-900">{technicalProfile?.fps ?? 24} fps</span>
                    </p>
                    <p className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Bitrate</span>
                      <span className="font-semibold text-slate-900">{technicalProfile?.bitrate ?? '4 Mbps'}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-slate-500">Última comunicação</span>
                      <span className="font-semibold text-slate-900">{LAST_SEEN_FORMATTER.format(new Date(camera.lastSeen))}</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-900">Módulos IA habilitados</p>
                  <div className="space-y-2">
                    {(
                      [
                        { key: 'intrusion', label: 'Intrusão perimetral' },
                        { key: 'lineCross', label: 'Linha virtual' },
                        { key: 'lpr', label: 'Reconhecimento de placas' },
                        { key: 'peopleCounting', label: 'Contagem de pessoas' },
                        { key: 'vehicleCounting', label: 'Contagem de veículos' },
                      ] as const
                    ).map((module) => (
                      <label key={module.key} className="flex items-center gap-3 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          checked={camera.iaModules[module.key]}
                          readOnly
                          className="h-4 w-4 rounded border-slate-300 text-slate-900"
                        />
                        <span>{module.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-6 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Radio className="h-10 w-10 text-slate-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Monitoramento contínuo</p>
                    <p className="text-xs text-slate-500">Sinal recebido 24/7 com heartbeat criptografado.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <HardDriveDownload className="h-10 w-10 text-slate-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Gravação redundante</p>
                    <p className="text-xs text-slate-500">Fluxos gravados em storage local + nuvem Unifique.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 rounded-2xl border border-dashed border-emerald-200/60 bg-emerald-50/60 p-4 text-sm text-emerald-900">
                <BadgeCheck className="h-5 w-5" />
                Nenhuma evidência de exposição de imagens – compliance LGPD preservado.
              </div>
            </>
          ) : (
            <div className="text-sm text-slate-500">Selecione uma câmera para visualizar detalhes.</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
