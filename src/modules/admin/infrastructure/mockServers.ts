export type InfraServerType = 'IA' | 'RECORDING' | 'STREAMING' | 'CORE'
export type InfraServerStatus = 'online' | 'degraded' | 'offline' | 'maintenance'

export type InfraServer = {
  id: string
  name: string
  type: InfraServerType
  status: InfraServerStatus
  host: string
  ip: string
  cpuUsage: number
  ramUsage: number
  diskUsage: number
  gpuUsage?: number
  tenantsCount: number
  camerasCount: number
  lastHeartbeat: string
  region?: string
}

const SERVER_TENANTS: Record<string, { name: string; share: number }[]> = {
  'srv-ia-core-01': [
    { name: 'Unifique Headquarters', share: 34 },
    { name: 'Retail Park Brasil', share: 28 },
    { name: 'Nova Ferrovia Paulista', share: 21 },
  ],
  'srv-ia-gpu-02': [
    { name: 'Hospital Vida Plena', share: 38 },
    { name: 'Colégio Horizonte', share: 26 },
    { name: 'Vila Olímpica Residencial', share: 18 },
  ],
  'srv-record-01': [
    { name: 'Retail Park Brasil', share: 40 },
    { name: 'Inova Agro Logística', share: 25 },
    { name: 'Unifique Headquarters', share: 20 },
  ],
  'srv-record-02': [
    { name: 'Unifique Headquarters', share: 37 },
    { name: 'Nova Ferrovia Paulista', share: 31 },
    { name: 'Hospital Vida Plena', share: 22 },
  ],
  'srv-record-03': [
    { name: 'Colégio Horizonte', share: 45 },
    { name: 'Vila Olímpica Residencial', share: 27 },
    { name: 'Retail Park Brasil', share: 15 },
  ],
  'srv-stream-01': [
    { name: 'Unifique Headquarters', share: 41 },
    { name: 'Retail Park Brasil', share: 33 },
    { name: 'Nova Ferrovia Paulista', share: 16 },
  ],
  'srv-core-ctrl': [
    { name: 'Operação SOC Unifique', share: 55 },
    { name: 'Clientes Enterprise', share: 30 },
    { name: 'Clientes Standard', share: 15 },
  ],
  'srv-ia-gpu-03': [
    { name: 'Retail Park Brasil', share: 44 },
    { name: 'Hospital Vida Plena', share: 29 },
    { name: 'Nova Ferrovia Paulista', share: 19 },
  ],
}

export const INFRA_SERVERS: InfraServer[] = [
  {
    id: 'srv-ia-core-01',
    name: 'Cluster IA 01',
    type: 'IA',
    status: 'online',
    host: 'srv-ia-01.unifique.local',
    ip: '10.0.10.5',
    cpuUsage: 72,
    ramUsage: 64,
    diskUsage: 58,
    gpuUsage: 69,
    tenantsCount: 42,
    camerasCount: 310,
    region: 'SC • Data Center 01',
    lastHeartbeat: '2025-12-10T09:10:00-03:00',
  },
  {
    id: 'srv-ia-gpu-02',
    name: 'Cluster IA 02',
    type: 'IA',
    status: 'degraded',
    host: 'srv-ia-02.unifique.local',
    ip: '10.0.10.6',
    cpuUsage: 88,
    ramUsage: 81,
    diskUsage: 72,
    gpuUsage: 92,
    tenantsCount: 37,
    camerasCount: 284,
    region: 'SC • Data Center 01',
    lastHeartbeat: '2025-12-10T09:08:00-03:00',
  },
  {
    id: 'srv-ia-gpu-03',
    name: 'Cluster IA 03',
    type: 'IA',
    status: 'maintenance',
    host: 'srv-ia-03.unifique.local',
    ip: '10.0.10.7',
    cpuUsage: 18,
    ramUsage: 22,
    diskUsage: 41,
    gpuUsage: 12,
    tenantsCount: 12,
    camerasCount: 90,
    region: 'SP • Zona Cloud 02',
    lastHeartbeat: '2025-12-10T08:55:00-03:00',
  },
  {
    id: 'srv-record-01',
    name: 'Recorder Pool 01',
    type: 'RECORDING',
    status: 'online',
    host: 'rec-core-01.unifique.local',
    ip: '10.20.0.11',
    cpuUsage: 63,
    ramUsage: 57,
    diskUsage: 81,
    tenantsCount: 28,
    camerasCount: 520,
    region: 'SP • Data Center 03',
    lastHeartbeat: '2025-12-10T09:11:00-03:00',
  },
  {
    id: 'srv-record-02',
    name: 'Recorder Pool 02',
    type: 'RECORDING',
    status: 'online',
    host: 'rec-core-02.unifique.local',
    ip: '10.20.0.12',
    cpuUsage: 52,
    ramUsage: 49,
    diskUsage: 67,
    tenantsCount: 31,
    camerasCount: 488,
    region: 'RJ • Data Center 01',
    lastHeartbeat: '2025-12-10T09:12:00-03:00',
  },
  {
    id: 'srv-record-03',
    name: 'Recorder Pool 03',
    type: 'RECORDING',
    status: 'degraded',
    host: 'rec-core-03.unifique.local',
    ip: '10.20.0.13',
    cpuUsage: 79,
    ramUsage: 73,
    diskUsage: 93,
    tenantsCount: 25,
    camerasCount: 402,
    region: 'SC • Data Center 02',
    lastHeartbeat: '2025-12-10T09:04:40-03:00',
  },
  {
    id: 'srv-stream-01',
    name: 'Streaming Edge 01',
    type: 'STREAMING',
    status: 'online',
    host: 'stream-01.unifique.local',
    ip: '10.40.5.8',
    cpuUsage: 48,
    ramUsage: 54,
    diskUsage: 36,
    tenantsCount: 46,
    camerasCount: 612,
    region: 'SC • CDN Norte',
    lastHeartbeat: '2025-12-10T09:15:00-03:00',
  },
  {
    id: 'srv-core-ctrl',
    name: 'Orchestrator Core',
    type: 'CORE',
    status: 'online',
    host: 'core-controller.unifique.local',
    ip: '10.100.0.2',
    cpuUsage: 41,
    ramUsage: 46,
    diskUsage: 52,
    tenantsCount: 58,
    camerasCount: 0,
    region: 'SC • Rede Privada',
    lastHeartbeat: '2025-12-10T09:14:10-03:00',
  },
]

export function buildInfraKpis(servers: InfraServer[]) {
  const totalServers = servers.length
  const online = servers.filter((server) => server.status === 'online').length
  const degraded = servers.filter((server) => server.status === 'degraded').length
  const offline = servers.filter((server) => server.status === 'offline').length
  const avgCpu = Math.round(servers.reduce((total, server) => total + server.cpuUsage, 0) / totalServers)
  const avgRam = Math.round(servers.reduce((total, server) => total + server.ramUsage, 0) / totalServers)

  return { totalServers, online, degraded, offline, avgCpu, avgRam }
}

export function buildInfraHealthSummary(servers: InfraServer[]) {
  const avgDiskUsage = Math.round(servers.reduce((total, server) => total + server.diskUsage, 0) / servers.length)
  const avgCpuUsage = Math.round(servers.reduce((total, server) => total + server.cpuUsage, 0) / servers.length)
  const avgRamUsage = Math.round(servers.reduce((total, server) => total + server.ramUsage, 0) / servers.length)
  const gpuOverload = servers.filter((server) => server.type === 'IA' && (server.gpuUsage ?? 0) > 85).length
  const riskServers = servers.filter(
    (server) => server.cpuUsage > 90 || server.ramUsage > 90 || server.diskUsage > 90,
  ).length
  const degradedPenalty = servers.filter((server) => server.status === 'degraded').length * 4
  const offlinePenalty = servers.filter((server) => server.status === 'offline').length * 12
  const maintenancePenalty = servers.filter((server) => server.status === 'maintenance').length * 3
  const utilizationPenalty = Math.round((avgCpuUsage + avgRamUsage + avgDiskUsage) / 10)
  const healthScore = Math.max(0, 100 - degradedPenalty - offlinePenalty - maintenancePenalty - utilizationPenalty)

  return {
    healthScore,
    gpuOverload,
    avgDiskUsage,
    riskServers,
  }
}

export function getServerTopTenants(serverId: string) {
  return SERVER_TENANTS[serverId] ?? [
    { name: 'Clientes Enterprise', share: 45 },
    { name: 'Clientes Advanced', share: 32 },
    { name: 'Clientes Standard', share: 23 },
  ]
}
