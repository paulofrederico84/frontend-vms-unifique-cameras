import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { AdminLocation } from '@/modules/admin/locations/mockLocations'

import { LocationStatusBadge } from './LocationStatusBadge'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })

type LocationListTableProps = {
  locations: AdminLocation[]
  onSelectLocation: (location: AdminLocation) => void
}

export function LocationListTable({ locations, onSelectLocation }: LocationListTableProps) {
  if (locations.length === 0) {
    return (
      <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
        <CardContent className="py-16 text-center text-sm text-slate-500">
          Nenhum local encontrado com os filtros atuais.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <th className="px-5 py-3 text-left">Local</th>
                <th className="px-5 py-3 text-left">Câmeras</th>
                <th className="px-5 py-3 text-left">Status consolidado</th>
                <th className="px-5 py-3 text-left">Criado em</th>
                <th className="px-5 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr
                  key={location.id}
                  className="cursor-pointer border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                  onClick={() => onSelectLocation(location)}
                >
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{location.name}</span>
                      <span className="text-xs text-slate-500">{location.tenantName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-lg font-semibold text-slate-900">{location.cameras}</td>
                  <td className="px-5 py-5">
                    <LocationStatusBadge
                      total={location.cameras}
                      online={location.onlineCameras}
                      offline={location.offlineCameras}
                      unstable={location.unstableCameras}
                      maintenance={location.maintenanceCameras}
                    />
                  </td>
                  <td className="px-5 py-5 text-sm text-slate-600">{dateFormatter.format(new Date(location.createdAt))}</td>
                  <td className="px-5 py-5">
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1 rounded-full"
                        onClick={(event) => {
                          event.stopPropagation()
                          onSelectLocation(location)
                        }}
                      >
                        Ver detalhes <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
