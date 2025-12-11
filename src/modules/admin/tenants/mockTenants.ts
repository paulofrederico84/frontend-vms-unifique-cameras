export type TenantPlan = 'basic' | 'standard' | 'advanced' | 'enterprise'
export type TenantStatus = 'active' | 'suspended' | 'inactive' | 'trial'

export type TenantContact = {
  name: string
  email: string
  phone: string
}

export type TenantSiteSummary = {
  id: string
  name: string
  cameras: number
}

export type TenantRecord = {
  id: string
  name: string
  document: string
  plan: TenantPlan
  status: TenantStatus
  cameras: number
  activeCameras: number
  sites: number
  users: number
  createdAt: string
  storage: {
    usedTb: number
    totalTb: number
  }
  contact: TenantContact
  siteSummary: TenantSiteSummary[]
}

