export enum SystemRole {
  ADMIN_MASTER = 'ADMIN_MASTER',
  ADMIN = 'ADMIN',
  TECHNICIAN = 'TECHNICIAN',
  CLIENT_MASTER = 'CLIENT_MASTER',
  CLIENT_MANAGER = 'CLIENT_MANAGER',
  CLIENT_VIEWER = 'CLIENT_VIEWER',
}

export const UserRole = SystemRole
export type UserRole = SystemRole

export type UserSummary = {
  id: string
  name: string
  email: string
  role: SystemRole
  tenantId?: string
  tenantName?: string
}
