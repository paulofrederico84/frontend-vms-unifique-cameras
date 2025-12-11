import { SystemRole } from '@/modules/shared/types/auth'

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'

export type UserPermissions = {
  canViewRecordings: boolean
  canExportVideos: boolean
  canConfigureAI: boolean
  canConfigureStreamProfiles: boolean
  canManageUsers: boolean
  canManageCameras: boolean
  canAccessDashboard: boolean
  canViewLive?: boolean
  maxStreamQuality: 'HD' | 'FULLHD' | '4K'
  allowedAIModules: string[]
}

export type ScopeType = 'GLOBAL' | 'TENANT' | 'LOCATION' | 'CAMERA'

export type UserScope = {
  type: ScopeType
  tenants?: string[]
  locations?: string[]
  cameras?: string[]
  expiresAt?: string
}

export type TemporaryAccess = {
  expiresAt: string
  grantedAt: string
  grantedBy: string
  reason?: string
}

export type User = {
  id: string
  name: string
  email: string
  role: SystemRole
  status: UserStatus
  tenantId?: string
  tenantName?: string
  scope?: UserScope
  temporaryAccess?: TemporaryAccess
  lastLoginAt?: string
  sessionVersion?: string
  preferredModule?: string
  features?: string[]
  permissions: UserPermissions
  createdAt: string
  updatedAt: string
}
