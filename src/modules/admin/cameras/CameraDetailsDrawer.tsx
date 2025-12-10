import { useEffect, useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CameraForm } from '@/modules/admin/cameras/CameraForm'
import { getCameraByIdMock, updateCameraMock } from '@/modules/admin/cameras/cameraMocks'
import type { Camera } from '@/modules/admin/cameras/cameraTypes'
import { UserRole } from '@/modules/shared/types/auth'

const statusLabelMap: Record<Camera['status'], string> = {
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  ERROR: 'Erro',
  MAINTENANCE: 'Manutenção',
}

const statusBadgeMap: Record<Camera['status'], string> = {
  ONLINE: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  OFFLINE: 'bg-slate-200 text-slate-600 border border-slate-300',
  ERROR: 'bg-red-100 text-red-700 border border-red-200',
  MAINTENANCE: 'bg-amber-100 text-amber-700 border border-amber-200',
}

export type CameraDetailsDrawerProps = {
  cameraId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  availableTenants: { id: string; name: string }[]
  availableSites: { id: string; name: string; tenantId: string }[]
  currentUserRole: UserRole
  currentUserTenantId?: string
  onCameraUpdated?: () => void
}

export function CameraDetailsDrawer({
  cameraId,
  open,
  onOpenChange,
  availableTenants,
  availableSites,
  currentUserRole,
  currentUserTenantId,
  onCameraUpdated,
}: CameraDetailsDrawerProps) {
  const [camera, setCamera] = useState<Camera | null>(null)

  useEffect(() => {
    if (!open || !cameraId) {
      return
    }

    let isActive = true

    getCameraByIdMock(cameraId).then((result) => {
      if (!isActive) {
        return
      }
      setCamera(result ?? null)
    })

    return () => {
      isActive = false
    }
  }, [cameraId, open])

  const isLoading = open && Boolean(cameraId) && camera?.id !== cameraId

  const title = useMemo(() => {
    if (!camera || camera?.id !== cameraId) return 'Detalhes da câmera'
    return camera.name
  }, [camera, cameraId])

  const handleSubmit = async (data: Omit<Camera, 'id' | 'createdAt' | 'lastSeenAt'>) => {
    if (!camera) return
    const updated = await updateCameraMock(camera.id, data)
    if (updated) {
      setCamera(updated)
      onCameraUpdated?.()
    }
  }

  const formatDateTime = (value?: string) => {
    if (!value) return '—'
    return new Date(value).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleDrawerChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setCamera(null)
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleDrawerChange}>
      <DialogContent className="max-w-6xl gap-0 p-0">
        <DialogHeader className="border-b px-6 py-4 text-left">
          <DialogTitle className="text-2xl font-semibold text-foreground">{title}</DialogTitle>
          {camera ? (
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className={`rounded-full px-2 py-0.5 ${statusBadgeMap[camera.status]}`}>
                {statusLabelMap[camera.status]}
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{camera.tenantName}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{camera.siteName}</span>
              <span className="rounded-full px-2 py-0.5 text-emerald-700">
                IA {camera.iaSettings.enabled ? 'ligada' : 'desligada'}
              </span>
              <span className="rounded-full px-2 py-0.5 text-sky-700">
                Gravação {camera.recordingSettings.enabled ? 'ativa' : 'inativa'}
              </span>
            </div>
          ) : null}
        </DialogHeader>

        <div className="grid gap-6 p-6 lg:grid-cols-[1.1fr_1fr]">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center gap-2 py-12 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Carregando informações da câmera...
            </div>
          ) : camera && camera.id === cameraId ? (
            <>
              <div className="space-y-6">
                <section className="rounded-2xl border bg-muted/10 p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Resumo operacional</h4>
                  <dl className="mt-4 grid gap-3 text-sm text-foreground">
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Tenant</dt>
                      <dd className="font-medium">{camera.tenantName}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Site</dt>
                      <dd className="font-medium">{camera.siteName}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">RTSP principal</dt>
                      <dd className="truncate font-mono text-xs">{camera.mainRtspUrl}</dd>
                    </div>
                    {camera.subRtspUrl ? (
                      <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">RTSP secundário</dt>
                        <dd className="truncate font-mono text-xs">{camera.subRtspUrl}</dd>
                      </div>
                    ) : null}
                    {camera.rtmpUrl ? (
                      <div className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">RTMP</dt>
                        <dd className="truncate font-mono text-xs">{camera.rtmpUrl}</dd>
                      </div>
                    ) : null}
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Criada em</dt>
                      <dd className="font-medium">{formatDateTime(camera.createdAt)}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-muted-foreground">Último contato</dt>
                      <dd className="font-medium">{formatDateTime(camera.lastSeenAt)}</dd>
                    </div>
                  </dl>
                </section>
                <section className="rounded-2xl border bg-muted/10 p-5">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Perfis de stream</h4>
                  <div className="mt-4 space-y-3 text-xs">
                    {camera.streamProfiles.map((profile) => (
                      <div key={profile.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-white/80 px-3 py-2">
                        <div>
                          <p className="font-semibold text-foreground">{profile.name}</p>
                          <p className="text-muted-foreground">
                            {profile.resolution} • {profile.fps} FPS • {profile.codec}
                          </p>
                        </div>
                        <div className="flex gap-2 text-[11px] font-semibold">
                          {profile.usage.live ? (
                            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-700">Live</span>
                          ) : null}
                          {profile.usage.recording ? (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700">Gravação</span>
                          ) : null}
                          {profile.usage.analytics ? (
                            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-700">IA</span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <CameraForm
                  mode="edit"
                  initialData={camera}
                  availableTenants={availableTenants}
                  availableSites={availableSites}
                  currentUserRole={currentUserRole}
                  currentUserTenantId={currentUserTenantId}
                  onSubmit={handleSubmit}
                  onCancel={() => handleDrawerChange(false)}
                />
              </div>
            </>
          ) : (
            <div className="col-span-full py-10 text-center text-sm text-muted-foreground">
              Nenhuma câmera selecionada.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
