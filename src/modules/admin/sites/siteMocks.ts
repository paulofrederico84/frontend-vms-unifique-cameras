import type { Site } from './siteTypes'

export const SITE_MOCKS: Site[] = [
  {
    id: 'site-unifique-blumenau-hq',
    name: 'Campus Matriz Blumenau',
    description: 'NOC central e principal data center de monitoramento.',
    tenantId: 'tenant-unifique-hq',
    tenantName: 'Unifique Headquarters',
    city: 'Blumenau',
    state: 'SC',
    address: 'Rua 7 de Setembro, 1500',
    status: 'ACTIVE',
    camerasCount: 148,
    createdAt: '2023-04-12T11:00:00-03:00',
  },
  {
    id: 'site-retail-park-sul',
    name: 'Retail Park - Ala Sul',
    description: 'Shopping aberto focado em varejo de tecnologia.',
    tenantId: 'tenant-retail-park',
    tenantName: 'Retail Park Brasil',
    city: 'São Paulo',
    state: 'SP',
    address: 'Av. das Nações Unidas, 4000',
    status: 'ACTIVE',
    camerasCount: 62,
    createdAt: '2022-11-02T09:15:00-03:00',
  },
  {
    id: 'site-retail-park-norte',
    name: 'Retail Park - Cluster Norte',
    tenantId: 'tenant-retail-park',
    tenantName: 'Retail Park Brasil',
    city: 'Campinas',
    state: 'SP',
    address: 'Rod. Dom Pedro I, km 137',
    status: 'ACTIVE',
    camerasCount: 44,
    createdAt: '2023-03-19T08:45:00-03:00',
  },
  {
    id: 'site-vida-plena-centro',
    name: 'Hospital Vida Plena - Centro Cirúrgico',
    tenantId: 'tenant-vida-plena',
    tenantName: 'Hospital Vida Plena',
    city: 'Rio de Janeiro',
    state: 'RJ',
    address: 'Rua Marechal Floriano, 800',
    status: 'INACTIVE',
    camerasCount: 28,
    createdAt: '2021-01-22T07:30:00-03:00',
  },
  {
    id: 'site-horizonte-campus',
    name: 'Colégio Horizonte - Campus Principal',
    tenantId: 'tenant-horizonte-edu',
    tenantName: 'Colégio Horizonte',
    city: 'Belo Horizonte',
    state: 'MG',
    address: 'Rua da Educação, 55',
    status: 'ACTIVE',
    camerasCount: 31,
    createdAt: '2024-03-01T13:40:00-03:00',
  },
]

export function listSitesMock(options?: { tenantId?: string }): Promise<Site[]> {
  if (!options?.tenantId) {
    return Promise.resolve([...SITE_MOCKS])
  }

  return Promise.resolve(SITE_MOCKS.filter((site) => site.tenantId === options.tenantId))
}

export function getSiteByIdMock(id: string): Promise<Site | undefined> {
  return Promise.resolve(SITE_MOCKS.find((site) => site.id === id))
}
