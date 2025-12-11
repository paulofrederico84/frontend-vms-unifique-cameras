// Este arquivo só deve ser importado em modo desenvolvimento
if (import.meta.env.PROD) {
  throw new Error('Fixtures não devem ser importados em produção!')
}

export { mockTenants } from './tenants.fixture'
export { mockUsers } from './users.fixture'
export { mockCameras } from './cameras.fixture'
export { mockLocations } from './locations.fixture'
export { mockAdminUsers } from './admin-users.fixture'
export { mockAuditEvents } from './audit.fixture'
export { mockAiEvents } from './ai.fixture'
export { mockAlerts } from './alerts.fixture'
