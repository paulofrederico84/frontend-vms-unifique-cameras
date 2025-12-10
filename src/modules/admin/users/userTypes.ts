import { UserRole } from '@/modules/shared/types/auth'

export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'INVITED'

export type UserPermission = {
  canViewLive: boolean
  canViewRecordings: boolean
  canExportVideos: boolean
  canManageCameras: boolean
  canManageIA: boolean
  canManageUsers: boolean
}

export type UserScope = {
  sitesIds?: string[]
  camerasIds?: string[]
}

export type User = {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  status: UserStatus
  tenantId?: string
  tenantName?: string
  createdAt: string
  lastLoginAt?: string
  permissions: UserPermission
  scope?: UserScope
}
