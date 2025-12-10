import { SystemRole } from '@/modules/shared/types/auth'

export const ROLE_LABELS: Record<SystemRole, string> = {
  [SystemRole.ADMIN_MASTER]: 'Admin Master',
  [SystemRole.ADMIN]: 'Admin',
  [SystemRole.TECHNICIAN]: 'Técnico',
  [SystemRole.CLIENT_MASTER]: 'Cliente Master',
  [SystemRole.CLIENT_MANAGER]: 'Gerente',
  [SystemRole.CLIENT_VIEWER]: 'Visualizador',
}
