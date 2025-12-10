import { SystemRole } from '@/modules/shared/types/auth'

export type ScopeType = 'GLOBAL' | 'GLOBAL_LIMITED' | 'INSTALLATION_ONLY' | 'TENANT_FULL' | 'SECTOR' | 'VIEW_ONLY'

export type PermissionValue = boolean | 'limited' | 'optional' | 'viewOnly'

export type RolePermissionSet = {
  canViewStatus: boolean
  canViewVideo: PermissionValue
  canViewVideoTemporary: boolean
  canViewRecordings: PermissionValue
  canManageAdmins: boolean
  canManageTechnicians: boolean
  canManageClients: boolean
  canManageUsers: PermissionValue
  canManageCameras: PermissionValue
  canManageIA: PermissionValue
  canManageAlerts: PermissionValue
  canManageStorage: PermissionValue
  canManageInfrastructure: boolean
  canGrantTemporaryAccess: boolean
}

export type RoleAccessConfig = {
  role: SystemRole
  label: string
  description: string
  scope: ScopeType
  permissions: RolePermissionSet
}
