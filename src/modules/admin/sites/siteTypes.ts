export type SiteStatus = 'ACTIVE' | 'INACTIVE'

export type Site = {
  id: string
  name: string
  description?: string
  tenantId: string
  tenantName: string
  city?: string
  state?: string
  address?: string
  status: SiteStatus
  camerasCount: number
  createdAt: string
}
