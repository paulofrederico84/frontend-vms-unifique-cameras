import { useMemo, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Camera, CameraStreamProfile } from '@/modules/admin/cameras/cameraTypes'
import { SystemRole } from '@/modules/shared/types/auth'

export type CameraFormMode = 'create' | 'edit'

export type CameraFormProps = {
  mode: CameraFormMode
  initialData?: Camera
  availableTenants: { id: string; name: string }[]
  availableSites: { id: string; name: string; tenantId: string }[]
  currentUserRole: SystemRole
  currentUserTenantId?: string
  onSubmit: (data: Omit<Camera, 'id' | 'createdAt' | 'lastSeenAt'>) => Promise<void> | void
  onCancel: () => void
}

type CameraFormState = Omit<Camera, 'id' | 'createdAt' | 'lastSeenAt'>

type FormErrors = Partial<Record<'name' | 'tenant' | 'site' | 'rtsp' | 'streams', string>>

const statusOptions = [
  { value: 'ONLINE', label: 'Online' },
  { value: 'OFFLINE', label: 'Offline' },
  { value: 'ERROR', label: 'Erro' },
  { value: 'MAINTENANCE', label: 'Manutenção' },
]

const analyticsOptions = [
  { key: 'intrusion', label: 'Intrusão' },
  { key: 'lineCross', label: 'Linha virtual' },
  { key: 'lpr', label: 'LPR' },
  { key: 'peopleCounting', label: 'Contagem de pessoas' },
  { key: 'vehicleCounting', label: 'Contagem de veículos' },
  { key: 'epi', label: 'EPI' },
  { key: 'loitering', label: 'Loitering' },
] as const

function buildDefaultStreamProfiles(): CameraStreamProfile[] {
  return [
    {
      id: 'stream-main',
      name: 'Principal',
      resolution: '1920x1080',
      fps: 30,
      bitrateKbps: 4000,
      codec: 'H264',
      usage: { live: true, recording: true, analytics: true },
    },
    {
      id: 'stream-sub',
      name: 'Secundário',
      resolution: '1280x720',
      fps: 15,
      bitrateKbps: 1800,
      codec: 'H265',
      usage: { live: true, recording: false, analytics: true },
    },
  ]
}

const generateStreamProfileId = () => `stream-extra-${Math.random().toString(36).slice(2, 6)}`

function CameraFormInner({
  mode,
  initialData,
  availableTenants,
  availableSites,
  currentUserRole,
  currentUserTenantId,
  onSubmit,
  onCancel,
}: CameraFormProps) {
  const defaultTenantId = currentUserRole === SystemRole.CLIENT_MASTER ? currentUserTenantId : initialData?.tenantId

  const [formData, setFormData] = useState<CameraFormState>(() => ({
    name: initialData?.name || '',
    tenantId: initialData?.tenantId || defaultTenantId || availableTenants[0]?.id || '',
    tenantName: initialData?.tenantName || availableTenants.find((tenant) => tenant.id === (initialData?.tenantId || defaultTenantId))?.name || availableTenants[0]?.name || '',
    siteId: initialData?.siteId || '',
    siteName: initialData?.siteName || '',
    status: initialData?.status || 'ONLINE',
    mainRtspUrl: initialData?.mainRtspUrl || '',
    subRtspUrl: initialData?.subRtspUrl || '',
    rtmpUrl: initialData?.rtmpUrl || '',
    streamProfiles: initialData?.streamProfiles || buildDefaultStreamProfiles(),
    iaSettings: initialData?.iaSettings || {
      enabled: false,
      sensitivity: 60,
      analytics: {
        intrusion: false,
        lineCross: false,
        lpr: false,
        peopleCounting: false,
        vehicleCounting: false,
        epi: false,
        loitering: false,
      },
    },
    recordingSettings: initialData?.recordingSettings || {
      enabled: true,
      retentionDays: 15,
      mode: 'CONTINUOUS',
    },
  }))

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredSites = useMemo(() => {
    return availableSites.filter((site) => site.tenantId === formData.tenantId)
  }, [availableSites, formData.tenantId])

  const tenantOptions = useMemo(() => {
    if (currentUserRole === SystemRole.CLIENT_MASTER && currentUserTenantId) {
      return availableTenants.filter((tenant) => tenant.id === currentUserTenantId)
    }

    return availableTenants
  }, [availableTenants, currentUserRole, currentUserTenantId])

  const validate = () => {
    const nextErrors: FormErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Informe o nome da câmera'
    }

    if (!formData.tenantId) {
      nextErrors.tenant = 'Selecione o tenant'
    }

    if (!formData.siteId) {
      nextErrors.site = 'Selecione o site'
    }

    if (!formData.mainRtspUrl.trim()) {
      nextErrors.rtsp = 'Informe a URL principal (RTSP)'
    }

    if (formData.streamProfiles.length === 0) {
      nextErrors.streams = 'Adicione pelo menos um perfil de stream'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    await onSubmit(formData)
    setIsSubmitting(false)
  }

  const handleTenantChange = (tenantId: string) => {
    const tenant = availableTenants.find((item) => item.id === tenantId)
    setFormData((prev) => ({
      ...prev,
      tenantId,
      tenantName: tenant?.name || '',
      siteId: '',
      siteName: '',
    }))
  }

  const handleSiteChange = (siteId: string) => {
    const site = filteredSites.find((item) => item.id === siteId)
    setFormData((prev) => ({
      ...prev,
      siteId,
      siteName: site?.name || '',
    }))
  }

  const handleStreamProfileChange = (
    index: number,
    field: keyof CameraStreamProfile,
    value: CameraStreamProfile[keyof CameraStreamProfile],
  ) => {
    setFormData((prev) => {
      const nextProfiles = [...prev.streamProfiles]
      const target = nextProfiles[index]
      nextProfiles[index] = { ...target, [field]: value }
      return { ...prev, streamProfiles: nextProfiles }
    })
  }

  const handleStreamUsageToggle = (index: number, usageKey: 'live' | 'recording' | 'analytics') => {
    setFormData((prev) => {
      const nextProfiles = [...prev.streamProfiles]
      const target = nextProfiles[index]
      nextProfiles[index] = {
        ...target,
        usage: {
          ...target.usage,
          [usageKey]: !target.usage[usageKey],
        },
      }
      return { ...prev, streamProfiles: nextProfiles }
    })
  }

  const handleAddExtraStream = () => {
    setFormData((prev) => ({
      ...prev,
      streamProfiles: [
        ...prev.streamProfiles,
        {
          id: generateStreamProfileId(),
          name: `Stream Extra ${prev.streamProfiles.length - 1}`,
          resolution: '1280x720',
          fps: 15,
          bitrateKbps: 1500,
          codec: 'H264',
          usage: { live: true, recording: false, analytics: true },
        },
      ],
    }))
  }

  const handleRemoveStream = (profileId: string) => {
    setFormData((prev) => ({
      ...prev,
      streamProfiles: prev.streamProfiles.filter((profile) => profile.id !== profileId),
    }))
  }

  const extraStreams = formData.streamProfiles.filter((profile) => profile.name.toLowerCase().includes('extra'))

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="flex flex-wrap justify-start gap-2 bg-transparent p-0">
          <TabsTrigger value="general" className="rounded-full border px-4 py-1 text-sm">Geral</TabsTrigger>
          <TabsTrigger value="connectivity" className="rounded-full border px-4 py-1 text-sm">
            Conectividade
          </TabsTrigger>
          <TabsTrigger value="streams" className="rounded-full border px-4 py-1 text-sm">Perfis de stream</TabsTrigger>
          <TabsTrigger value="ia" className="rounded-full border px-4 py-1 text-sm">IA</TabsTrigger>
          <TabsTrigger value="recording" className="rounded-full border px-4 py-1 text-sm">Gravação</TabsTrigger>
          <TabsTrigger value="extras" className="rounded-full border px-4 py-1 text-sm">Streams extras</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 rounded-2xl border bg-muted/40 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">Nome da câmera</label>
              <Input
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Ex.: Entrada principal"
              />
              {errors.name ? <p className="mt-1 text-xs text-red-500">{errors.name}</p> : null}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Status operacional</label>
              <Select value={formData.status} onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as Camera['status'] }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">Tenant</label>
              <Select
                value={formData.tenantId}
                onValueChange={handleTenantChange}
                disabled={currentUserRole === SystemRole.CLIENT_MASTER}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tenant" />
                </SelectTrigger>
                <SelectContent>
                  {tenantOptions.map((tenant) => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tenant ? <p className="mt-1 text-xs text-red-500">{errors.tenant}</p> : null}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Site</label>
              <Select value={formData.siteId} onValueChange={handleSiteChange} disabled={!formData.tenantId}>
                <SelectTrigger>
                  <SelectValue placeholder={formData.tenantId ? 'Selecione o site' : 'Selecione um tenant primeiro'} />
                </SelectTrigger>
                <SelectContent>
                  {filteredSites.length === 0 ? (
                    <SelectItem value="" disabled>
                      Nenhum site para este tenant
                    </SelectItem>
                  ) : (
                    filteredSites.map((site) => (
                      <SelectItem key={site.id} value={site.id}>
                        {site.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.site ? <p className="mt-1 text-xs text-red-500">{errors.site}</p> : null}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="connectivity" className="space-y-4 rounded-2xl border bg-muted/40 p-5">
          <div>
            <label className="text-sm font-medium text-foreground">RTSP principal</label>
            <Input
              value={formData.mainRtspUrl}
              onChange={(event) => setFormData((prev) => ({ ...prev, mainRtspUrl: event.target.value }))}
              placeholder="rtsp://ip:porta/Streaming/Channels/101"
            />
            <p className="mt-1 text-xs text-muted-foreground">URL completa com usuário/senha configurados na câmera.</p>
            {errors.rtsp ? <p className="mt-1 text-xs text-red-500">{errors.rtsp}</p> : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">RTSP secundário</label>
              <Input
                value={formData.subRtspUrl}
                onChange={(event) => setFormData((prev) => ({ ...prev, subRtspUrl: event.target.value }))}
                placeholder="Opcional"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">RTMP</label>
              <Input
                value={formData.rtmpUrl}
                onChange={(event) => setFormData((prev) => ({ ...prev, rtmpUrl: event.target.value }))}
                placeholder="rtmp://"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="streams" className="space-y-4 rounded-2xl border bg-muted/40 p-5">
          {errors.streams ? <p className="text-xs text-red-500">{errors.streams}</p> : null}
          <div className="space-y-4">
            {formData.streamProfiles.map((profile, index) => (
              <div key={profile.id} className="rounded-2xl border bg-white/80 p-4 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">Configure resolução, FPS, codec e usos.</p>
                  </div>
                  {profile.name.toLowerCase().includes('extra') ? (
                    <Button type="button" variant="ghost" size="sm" className="gap-2 text-red-500" onClick={() => handleRemoveStream(profile.id)}>
                      <Trash2 className="h-4 w-4" /> Remover
                    </Button>
                  ) : null}
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="text-xs uppercase text-muted-foreground">Nome</label>
                    <Input
                      value={profile.name}
                      onChange={(event) => handleStreamProfileChange(index, 'name', event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase text-muted-foreground">Resolução</label>
                    <Input
                      value={profile.resolution}
                      onChange={(event) => handleStreamProfileChange(index, 'resolution', event.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase text-muted-foreground">FPS</label>
                    <Input
                      type="number"
                      min={1}
                      max={60}
                      value={profile.fps}
                      onChange={(event) => handleStreamProfileChange(index, 'fps', Number(event.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase text-muted-foreground">Bitrate (kbps)</label>
                    <Input
                      type="number"
                      min={256}
                      value={profile.bitrateKbps}
                      onChange={(event) => handleStreamProfileChange(index, 'bitrateKbps', Number(event.target.value))}
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="text-xs uppercase text-muted-foreground">Codec</label>
                    <Select
                      value={profile.codec}
                      onValueChange={(value) => handleStreamProfileChange(index, 'codec', value as CameraStreamProfile['codec'])}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Codec" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="H264">H.264</SelectItem>
                        <SelectItem value="H265">H.265</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-3">
                    <p className="text-xs uppercase text-muted-foreground">Uso</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(['live', 'recording', 'analytics'] as const).map((usageKey) => (
                        <label key={usageKey} className="inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
                          <input
                            type="checkbox"
                            className="h-3 w-3"
                            checked={profile.usage[usageKey]}
                            onChange={() => handleStreamUsageToggle(index, usageKey)}
                          />
                          {usageKey === 'live' ? 'Live' : usageKey === 'recording' ? 'Gravação' : 'IA'}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" className="gap-2" onClick={handleAddExtraStream}>
            <Plus className="h-4 w-4" /> Adicionar stream extra
          </Button>
        </TabsContent>

        <TabsContent value="ia" className="space-y-4 rounded-2xl border bg-muted/40 p-5">
          <div className="flex items-center justify-between rounded-xl border bg-white/70 p-4">
            <div>
              <p className="text-sm font-semibold text-foreground">IA na borda</p>
              <p className="text-xs text-muted-foreground">Ativa as análises embarcadas disponíveis nesta câmera.</p>
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium">
              <span>{formData.iaSettings.enabled ? 'Ligada' : 'Desligada'}</span>
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={formData.iaSettings.enabled}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    iaSettings: { ...prev.iaSettings, enabled: event.target.checked },
                  }))
                }
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">Sensibilidade (0-100)</label>
              <Input
                type="number"
                min={0}
                max={100}
                value={formData.iaSettings.sensitivity}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    iaSettings: { ...prev.iaSettings, sensitivity: Number(event.target.value) },
                  }))
                }
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {analyticsOptions.map((option) => (
              <label key={option.key} className="inline-flex items-center gap-3 rounded-xl border bg-white/80 px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={formData.iaSettings.analytics[option.key]}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      iaSettings: {
                        ...prev.iaSettings,
                        analytics: {
                          ...prev.iaSettings.analytics,
                          [option.key]: !prev.iaSettings.analytics[option.key],
                        },
                      },
                    }))
                  }
                />
                {option.label}
              </label>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recording" className="space-y-4 rounded-2xl border bg-muted/40 p-5">
          <div className="flex items-center justify-between rounded-xl border bg-white/70 p-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Gravação</p>
              <p className="text-xs text-muted-foreground">Controla retenção, modo e estado atual.</p>
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium">
              <span>{formData.recordingSettings.enabled ? 'Ligada' : 'Desligada'}</span>
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={formData.recordingSettings.enabled}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    recordingSettings: { ...prev.recordingSettings, enabled: event.target.checked },
                  }))
                }
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">Dias de retenção</label>
              <Input
                type="number"
                min={1}
                value={formData.recordingSettings.retentionDays}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    recordingSettings: {
                      ...prev.recordingSettings,
                      retentionDays: Number(event.target.value),
                    },
                  }))
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Modo</label>
              <Select
                value={formData.recordingSettings.mode}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    recordingSettings: { ...prev.recordingSettings, mode: value as Camera['recordingSettings']['mode'] },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CONTINUOUS">Contínua</SelectItem>
                  <SelectItem value="EVENT_BASED">Baseada em eventos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="extras" className="space-y-4 rounded-2xl border bg-muted/40 p-5">
          {extraStreams.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum stream extra configurado. Adicione na aba "Perfis de stream".</p>
          ) : (
            <div className="space-y-3">
              {extraStreams.map((profile) => (
                <div key={profile.id} className="flex flex-col gap-3 rounded-2xl border bg-white/80 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {profile.resolution} • {profile.fps} FPS • {profile.codec}
                    </p>
                  </div>
                  <Button type="button" variant="ghost" className="text-red-500" onClick={() => handleRemoveStream(profile.id)}>
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex flex-col justify-end gap-3 border-t border-dashed border-muted/50 pt-4 sm:flex-row">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : mode === 'create' ? 'Cadastrar câmera' : 'Salvar alterações'}
        </Button>
      </div>
    </form>
  )
}

export function CameraForm(props: CameraFormProps) {
  const formKey = [
    props.mode,
    props.initialData?.id ?? 'create',
    props.currentUserRole,
    props.currentUserTenantId ?? 'none',
  ].join(':')

  return <CameraFormInner key={formKey} {...props} />
}
