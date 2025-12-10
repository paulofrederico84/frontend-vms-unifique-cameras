import { Filter, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { AdminCameraStatus } from '@/modules/admin/locations/mockCameras'

const CAMERA_STATUS_LABELS: Record<AdminCameraStatus, string> = {
  online: 'Somente online',
  offline: 'Somente offline',
  unstable: 'Somente instável',
  maintenance: 'Em manutenção',
}

const CAMERA_VOLUME_OPTIONS = [
  { value: 'all', label: 'Qualquer volume' },
  { value: 'gt25', label: 'Mais de 25 câmeras' },
  { value: 'gt50', label: 'Mais de 50 câmeras' },
  { value: 'gt100', label: 'Mais de 100 câmeras' },
]

type LocationFiltersBarProps = {
  search: string
  tenantId: string | 'all'
  status: AdminCameraStatus | 'all'
  cameraModel: string | 'all'
  cameraVolume: 'all' | 'gt25' | 'gt50' | 'gt100'
  onSearchChange: (value: string) => void
  onTenantChange: (value: string | 'all') => void
  onStatusChange: (value: AdminCameraStatus | 'all') => void
  onCameraModelChange: (value: string | 'all') => void
  onCameraVolumeChange: (value: 'all' | 'gt25' | 'gt50' | 'gt100') => void
  onResetFilters: () => void
  tenantOptions: { value: string; label: string }[]
  cameraModels: string[]
}

export function LocationFiltersBar({
  search,
  tenantId,
  status,
  cameraModel,
  cameraVolume,
  onSearchChange,
  onTenantChange,
  onStatusChange,
  onCameraModelChange,
  onCameraVolumeChange,
  onResetFilters,
  tenantOptions,
  cameraModels,
}: LocationFiltersBarProps) {
  const tenantSelectOptions = [{ value: 'all', label: 'Todos os clientes' }, ...tenantOptions]
  const modelOptions = ['all', ...cameraModels]

  return (
    <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
          <Filter className="h-4 w-4" /> Filtros inteligentes
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <div className="md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Buscar local</label>
            <div className="mt-2 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3">
              <Search className="h-4 w-4 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Digite nome do local ou cliente"
                className="border-0 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-0"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Cliente</label>
            <Select value={tenantId} onValueChange={(value) => onTenantChange(value as string | 'all')}>
              <SelectTrigger className="mt-2 h-11 rounded-2xl border-slate-200">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                {tenantSelectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Status da câmera</label>
            <Select value={status} onValueChange={(value) => onStatusChange(value as AdminCameraStatus | 'all')}>
              <SelectTrigger className="mt-2 h-11 rounded-2xl border-slate-200">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                {(Object.keys(CAMERA_STATUS_LABELS) as AdminCameraStatus[]).map((statusKey) => (
                  <SelectItem key={statusKey} value={statusKey}>
                    {CAMERA_STATUS_LABELS[statusKey]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Tipo / modelo</label>
            <Select value={cameraModel} onValueChange={(value) => onCameraModelChange(value as string | 'all')}>
              <SelectTrigger className="mt-2 h-11 rounded-2xl border-slate-200">
                <SelectValue placeholder="Todos os modelos" />
              </SelectTrigger>
              <SelectContent>
                {modelOptions.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model === 'all' ? 'Todos os modelos' : model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Volume</label>
            <Select value={cameraVolume} onValueChange={(value) => onCameraVolumeChange(value as 'all' | 'gt25' | 'gt50' | 'gt100')}>
              <SelectTrigger className="mt-2 h-11 rounded-2xl border-slate-200">
                <SelectValue placeholder="Qualquer quantidade" />
              </SelectTrigger>
              <SelectContent>
                {CAMERA_VOLUME_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 border-t border-dashed border-slate-200 pt-4">
          <Button type="button" variant="outline" className="rounded-2xl" onClick={onResetFilters}>
            Limpar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
