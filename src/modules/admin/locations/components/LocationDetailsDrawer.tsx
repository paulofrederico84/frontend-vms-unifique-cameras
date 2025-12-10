import { Building2, MapPin, ShieldAlert } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { AdminCamera } from '@/modules/admin/locations/mockCameras'
import type { AdminLocation } from '@/modules/admin/locations/mockLocations'

import { CameraList } from './CameraList'
import { LocationStatusBadge } from './LocationStatusBadge'

type LocationDetailsDrawerProps = {
  location: AdminLocation | null
  cameras: AdminCamera[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectCamera: (camera: AdminCamera) => void
}

const infoFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

export function LocationDetailsDrawer({ location, cameras, open, onOpenChange, onSelectCamera }: LocationDetailsDrawerProps) {
  const iaDistribution = cameras.reduce(
    (acc, camera) => {
      if (camera.iaModules.intrusion) acc.intrusion += 1
      if (camera.iaModules.lineCross) acc.lineCross += 1
      if (camera.iaModules.lpr) acc.lpr += 1
      if (camera.iaModules.peopleCounting) acc.people += 1
      if (camera.iaModules.vehicleCounting) acc.vehicle += 1
      return acc
    },
    { intrusion: 0, lineCross: 0, lpr: 0, people: 0, vehicle: 0 },
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="p-0">
        <div className="flex h-full flex-col gap-8 overflow-y-auto p-8">
          {location ? (
            <>
              <SheetHeader>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Local monitorado</p>
                <SheetTitle>{location.name}</SheetTitle>
                <SheetDescription>
                  Cliente {location.tenantName}. Estrutura cadastrada em {infoFormatter.format(new Date(location.createdAt))}.
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 rounded-3xl border border-slate-100 bg-white p-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Building2 className="mt-1 h-6 w-6 text-slate-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Cliente</p>
                    <p className="text-sm text-slate-600">{location.tenantName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-6 w-6 text-slate-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Estrutura</p>
                    <p className="text-sm text-slate-600">Monitoramento perimetral e ambientes internos</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Resumo das câmeras</p>
                  <div className="mt-4 grid gap-3 text-sm text-slate-600">
                    <p className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span>Total</span>
                      <strong className="text-slate-900">{location.cameras}</strong>
                    </p>
                    <p className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span>Online</span>
                      <strong className="text-emerald-600">{location.onlineCameras}</strong>
                    </p>
                    <p className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span>Offline</span>
                      <strong className="text-rose-600">{location.offlineCameras}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Instáveis / Manutenção</span>
                      <strong className="text-amber-600">{location.unstableCameras + location.maintenanceCameras}</strong>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Distribuição IA</p>
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p className="flex items-center justify-between">
                      <span>Intrusão</span>
                      <strong className="text-slate-900">{iaDistribution.intrusion}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Linha virtual</span>
                      <strong className="text-slate-900">{iaDistribution.lineCross}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>LPR / Placas</span>
                      <strong className="text-slate-900">{iaDistribution.lpr}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Contagem de pessoas</span>
                      <strong className="text-slate-900">{iaDistribution.people}</strong>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Contagem de veículos</span>
                      <strong className="text-slate-900">{iaDistribution.vehicle}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Saúde do local</p>
                <div className="mt-4">
                  <LocationStatusBadge
                    total={location.cameras}
                    online={location.onlineCameras}
                    offline={location.offlineCameras}
                    unstable={location.unstableCameras}
                    maintenance={location.maintenanceCameras}
                  />
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  <ShieldAlert className="h-4 w-4" /> Câmeras do local
                </div>
                <CameraList cameras={cameras} onSelectCamera={onSelectCamera} />
              </div>

              <SheetFooter>
                <Button type="button" variant="outline" disabled className="rounded-2xl">
                  Editar local (breve)
                </Button>
                <Button type="button" variant="outline" disabled className="rounded-2xl border-rose-200 text-rose-500">
                  Remover local (restrito)
                </Button>
              </SheetFooter>
            </>
          ) : (
            <div className="text-sm text-slate-500">Selecione um local para exibir os detalhes.</div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
