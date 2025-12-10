export type TenantPlan = 'BASIC' | 'STANDARD' | 'ADVANCED' | 'ENTERPRISE'

export type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'INACTIVE'

export type TenantLimits = {
  maxCameras: number
  maxStreamsExtra: number
  defaultRetentionDays: number
  iaEnabled: boolean
  lprEnabled: boolean
  epiEnabled: boolean
}

export type Tenant = {
  id: string
  name: string
  document: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  status: TenantStatus
  plan: TenantPlan
  createdAt: string
  updatedAt?: string
  limits: TenantLimits
  camerasCount: number
  sitesCount: number
  activeUsersCount: number
}
