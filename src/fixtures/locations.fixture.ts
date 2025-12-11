import type { AdminLocation } from '@/modules/admin/locations/mockLocations'

export const mockLocations: AdminLocation[] = [
  {
    id: 'loc-unifique-noc',
    tenantId: 'tnt-001',
    tenantName: 'Unifique Headquarters',
    name: 'Campus NOC Blumenau',
    cameras: 96,
    onlineCameras: 90,
    offlineCameras: 2,
    unstableCameras: 2,
    maintenanceCameras: 2,
    createdAt: '2022-04-10T08:00:00-03:00'
  },
  {
    id: 'loc-unifique-floripa',
    tenantId: 'tnt-001',
    tenantName: 'Unifique Headquarters',
    name: 'Campus Florianópolis',
    cameras: 64,
    onlineCameras: 58,
    offlineCameras: 3,
    unstableCameras: 2,
    maintenanceCameras: 1,
    createdAt: '2023-01-22T09:30:00-03:00'
  },
  {
    id: 'loc-retail-mega-sul',
    tenantId: 'tnt-002',
    tenantName: 'Retail Park Brasil',
    name: 'Retail Park - Mega Center Sul',
    cameras: 64,
    onlineCameras: 52,
    offlineCameras: 6,
    unstableCameras: 4,
    maintenanceCameras: 2,
    createdAt: '2022-09-05T10:15:00-03:00'
  },
  {
    id: 'loc-retail-logistica-cps',
    tenantId: 'tnt-002',
    tenantName: 'Retail Park Brasil',
    name: 'Retail Park - Logística Campinas',
    cameras: 48,
    onlineCameras: 41,
    offlineCameras: 3,
    unstableCameras: 2,
    maintenanceCameras: 2,
    createdAt: '2023-03-18T07:45:00-03:00'
  },
  {
    id: 'loc-vida-plena-centro',
    tenantId: 'tnt-003',
    tenantName: 'Hospital Vida Plena',
    name: 'Hospital Vida Plena - Centro Cirúrgico',
    cameras: 48,
    onlineCameras: 36,
    offlineCameras: 4,
    unstableCameras: 5,
    maintenanceCameras: 3,
    createdAt: '2021-02-14T06:30:00-03:00'
  },
  {
    id: 'loc-colegio-horizonte-campus',
    tenantId: 'tnt-004',
    tenantName: 'Colégio Horizonte',
    name: 'Colégio Horizonte - Campus Principal',
    cameras: 32,
    onlineCameras: 29,
    offlineCameras: 1,
    unstableCameras: 1,
    maintenanceCameras: 1,
    createdAt: '2024-03-02T13:20:00-03:00'
  },
  {
    id: 'loc-inova-cd-goiania',
    tenantId: 'tnt-005',
    tenantName: 'Inova Agro Logística',
    name: 'Inova Agro - CD Goiânia',
    cameras: 18,
    onlineCameras: 10,
    offlineCameras: 4,
    unstableCameras: 2,
    maintenanceCameras: 2,
    createdAt: '2020-07-18T11:05:00-03:00'
  },
  {
    id: 'loc-vila-olimpica-bloco-atlantico',
    tenantId: 'tnt-006',
    tenantName: 'Vila Olímpica Residencial',
    name: 'Vila Olímpica - Bloco Atlântico',
    cameras: 22,
    onlineCameras: 18,
    offlineCameras: 1,
    unstableCameras: 2,
    maintenanceCameras: 1,
    createdAt: '2025-05-20T15:00:00-03:00'
  },
  {
    id: 'loc-ferrovia-terminal-campinas',
    tenantId: 'tnt-007',
    tenantName: 'Nova Ferrovia Paulista',
    name: 'Nova Ferrovia - Terminal Campinas',
    cameras: 74,
    onlineCameras: 60,
    offlineCameras: 8,
    unstableCameras: 4,
    maintenanceCameras: 2,
    createdAt: '2023-11-10T05:40:00-03:00'
  },
  {
    id: 'loc-ferrovia-coe-sp',
    tenantId: 'tnt-007',
    tenantName: 'Nova Ferrovia Paulista',
    name: 'Nova Ferrovia - COE São Paulo',
    cameras: 42,
    onlineCameras: 34,
    offlineCameras: 3,
    unstableCameras: 3,
    maintenanceCameras: 2,
    createdAt: '2024-01-05T08:30:00-03:00'
  }
]
