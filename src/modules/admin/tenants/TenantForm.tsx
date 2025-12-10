import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Tenant, TenantPlan, TenantStatus } from '@/modules/admin/tenants/tenantTypes'

export type TenantFormData = Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>

export type TenantFormProps = {
  mode: 'create' | 'edit'
  initialData?: Tenant
  onSubmit: (data: TenantFormData) => Promise<void> | void
  onCancel: () => void
}

const statusOptions: TenantStatus[] = ['ACTIVE', 'SUSPENDED', 'INACTIVE']
const planOptions: TenantPlan[] = ['BASIC', 'STANDARD', 'ADVANCED', 'ENTERPRISE']

const defaultFormData: TenantFormData = {
  name: '',
  document: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  status: 'ACTIVE',
  plan: 'STANDARD',
  limits: {
    maxCameras: 50,
    maxStreamsExtra: 10,
    defaultRetentionDays: 15,
    iaEnabled: true,
    lprEnabled: false,
    epiEnabled: false,
  },
  camerasCount: 0,
  sitesCount: 0,
  activeUsersCount: 0,
}

function mapTenantToFormData(tenant?: Tenant): TenantFormData {
  if (!tenant) {
    return {
      ...defaultFormData,
      limits: { ...defaultFormData.limits },
    }
  }

  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = tenant
  void _id
  void _createdAt
  void _updatedAt
  return {
    ...defaultFormData,
    ...rest,
    limits: { ...defaultFormData.limits, ...rest.limits },
  }
}

export function TenantForm({ mode, initialData, onSubmit, onCancel }: TenantFormProps) {
  const [formData, setFormData] = useState<TenantFormData>(() => mapTenantToFormData(initialData))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFormData(mapTenantToFormData(initialData))
    setErrors({})
  }, [initialData])

  const isEditMode = mode === 'edit'

  const title = useMemo(() => (isEditMode ? 'Editar cliente' : 'Novo cliente'), [isEditMode])

  const handleInputChange = (field: keyof TenantFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleLimitChange = (field: keyof TenantFormData['limits'], value: number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      limits: {
        ...prev.limits,
        [field]: value,
      },
    }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Informe o nome do cliente'
    if (!formData.document.trim()) newErrors.document = 'Informe o documento (CNPJ)'
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Informe o e-mail do contato'
    if (!formData.contactName.trim()) newErrors.contactName = 'Informe o nome do contato'
    if (!formData.plan) newErrors.plan = 'Selecione um plano'
    if (!formData.status) newErrors.status = 'Selecione o status'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {isEditMode ? 'Atualize os dados do cliente.' : 'Preencha os dados para cadastrar um novo tenant.'}
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border bg-white/80 p-5">
        <p className="text-sm font-semibold text-muted-foreground">Dados do cliente</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="tenant-name" className="text-sm font-medium text-foreground">
              Nome do cliente *
            </label>
            <Input
              id="tenant-name"
              value={formData.name}
              onChange={(event) => handleInputChange('name', event.target.value)}
              placeholder="Ex.: Hospital Vida Plena"
            />
            {errors.name ? <p className="text-xs text-red-500">{errors.name}</p> : null}
          </div>
          <div className="space-y-2">
            <label htmlFor="tenant-document" className="text-sm font-medium text-foreground">
              Documento *
            </label>
            <Input
              id="tenant-document"
              value={formData.document}
              onChange={(event) => handleInputChange('document', event.target.value)}
              placeholder="CNPJ ou identificação"
            />
            {errors.document ? <p className="text-xs text-red-500">{errors.document}</p> : null}
          </div>
          <div className="space-y-2">
            <label htmlFor="tenant-contact-name" className="text-sm font-medium text-foreground">
              Responsável *
            </label>
            <Input
              id="tenant-contact-name"
              value={formData.contactName}
              onChange={(event) => handleInputChange('contactName', event.target.value)}
              placeholder="Nome do contato principal"
            />
            {errors.contactName ? <p className="text-xs text-red-500">{errors.contactName}</p> : null}
          </div>
          <div className="space-y-2">
            <label htmlFor="tenant-contact-email" className="text-sm font-medium text-foreground">
              E-mail do contato *
            </label>
            <Input
              id="tenant-contact-email"
              type="email"
              value={formData.contactEmail}
              onChange={(event) => handleInputChange('contactEmail', event.target.value)}
              placeholder="contato@cliente.com"
            />
            {errors.contactEmail ? <p className="text-xs text-red-500">{errors.contactEmail}</p> : null}
          </div>
          <div className="space-y-2">
            <label htmlFor="tenant-contact-phone" className="text-sm font-medium text-foreground">
              Telefone
            </label>
            <Input
              id="tenant-contact-phone"
              value={formData.contactPhone ?? ''}
              onChange={(event) => handleInputChange('contactPhone', event.target.value)}
              placeholder="Opcional"
            />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">Status *</span>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'ACTIVE' ? 'Ativo' : status === 'SUSPENDED' ? 'Suspenso' : 'Inativo'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status ? <p className="text-xs text-red-500">{errors.status}</p> : null}
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium text-foreground">Plano *</span>
            <Select value={formData.plan} onValueChange={(value) => handleInputChange('plan', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o plano" />
              </SelectTrigger>
              <SelectContent>
                {planOptions.map((plan) => (
                  <SelectItem key={plan} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.plan ? <p className="text-xs text-red-500">{errors.plan}</p> : null}
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border bg-white/80 p-5">
        <p className="text-sm font-semibold text-muted-foreground">Limites e recursos</p>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="limit-cameras" className="text-sm font-medium text-foreground">
              Máximo de câmeras
            </label>
            <Input
              id="limit-cameras"
              type="number"
              min={0}
              value={formData.limits.maxCameras}
              onChange={(event) => handleLimitChange('maxCameras', Number(event.target.value))}
            />
          </div>
          <div>
            <label htmlFor="limit-streams" className="text-sm font-medium text-foreground">
              Streams extras
            </label>
            <Input
              id="limit-streams"
              type="number"
              min={0}
              value={formData.limits.maxStreamsExtra}
              onChange={(event) => handleLimitChange('maxStreamsExtra', Number(event.target.value))}
            />
          </div>
          <div>
            <label htmlFor="limit-retention" className="text-sm font-medium text-foreground">
              Retenção padrão (dias)
            </label>
            <Input
              id="limit-retention"
              type="number"
              min={1}
              value={formData.limits.defaultRetentionDays}
              onChange={(event) => handleLimitChange('defaultRetentionDays', Number(event.target.value))}
            />
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { label: 'IA habilitada', field: 'iaEnabled' },
            { label: 'LPR habilitado', field: 'lprEnabled' },
            { label: 'EPI habilitado', field: 'epiEnabled' },
          ].map((feature) => (
            <label key={feature.field} className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border border-muted"
                checked={Boolean(formData.limits[feature.field as keyof TenantFormData['limits']])}
                onChange={(event) => handleLimitChange(feature.field as keyof TenantFormData['limits'], event.target.checked)}
              />
              {feature.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </form>
  )
}
