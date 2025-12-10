export type AiEventType = 'intrusion' | 'line_cross' | 'lpr' | 'people_count' | 'vehicle_count' | 'loitering' | 'epi'
export type AiEventSeverity = 'low' | 'medium' | 'high' | 'critical'

export type AiEvent = {
  id: string
  type: AiEventType
  severity: AiEventSeverity
  tenantId: string
  tenantName: string
  locationId: string
  locationName: string
  cameraName: string
  timestamp: string
}

export const AI_TYPE_LABELS: Record<AiEventType, string> = {
  intrusion: 'Intrusão',
  line_cross: 'Linha virtual',
  lpr: 'LPR / Placas',
  people_count: 'Contagem de pessoas',
  vehicle_count: 'Contagem de veículos',
  loitering: 'Permanência suspeita',
  epi: 'EPI / Segurança'
}

export const AI_TYPE_COLORS: Record<AiEventType, string> = {
  intrusion: '#f43f5e',
  line_cross: '#2563eb',
  lpr: '#7c3aed',
  people_count: '#10b981',
  vehicle_count: '#facc15',
  loitering: '#fb923c',
  epi: '#06b6d4'
}

export const AI_SEVERITY_LABELS: Record<AiEventSeverity, string> = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  critical: 'Crítica'
}

export const AI_EVENT_MOCKS: AiEvent[] = [
  {
    id: 'evt-0001',
    type: 'intrusion',
    severity: 'high',
    tenantId: 'tnt-001',
    tenantName: 'Unifique Headquarters',
    locationId: 'loc-unifique-noc',
    locationName: 'Campus NOC Blumenau',
    cameraName: 'Perímetro Leste',
    timestamp: '2025-12-10T00:45:00-03:00'
  },
  {
    id: 'evt-0002',
    type: 'line_cross',
    severity: 'medium',
    tenantId: 'tnt-001',
    tenantName: 'Unifique Headquarters',
    locationId: 'loc-unifique-noc',
    locationName: 'Campus NOC Blumenau',
    cameraName: 'Portaria Principal',
    timestamp: '2025-12-10T01:15:00-03:00'
  },
  {
    id: 'evt-0003',
    type: 'lpr',
    severity: 'medium',
    tenantId: 'tnt-001',
    tenantName: 'Unifique Headquarters',
    locationId: 'loc-unifique-floripa',
    locationName: 'Campus Florianópolis',
    cameraName: 'Acesso garagem',
    timestamp: '2025-12-10T02:05:00-03:00'
  },
  {
    id: 'evt-0004',
    type: 'people_count',
    severity: 'low',
    tenantId: 'tnt-001',
    tenantName: 'Unifique Headquarters',
    locationId: 'loc-unifique-floripa',
    locationName: 'Campus Florianópolis',
    cameraName: 'Recepção principal',
    timestamp: '2025-12-10T03:10:00-03:00'
  },
  {
    id: 'evt-0005',
    type: 'intrusion',
    severity: 'critical',
    tenantId: 'tnt-002',
    tenantName: 'Retail Park Brasil',
    locationId: 'loc-retail-mega-sul',
    locationName: 'Retail Park - Mega Center Sul',
    cameraName: 'Docas 03',
    timestamp: '2025-12-10T04:35:00-03:00'
  },
  {
    id: 'evt-0006',
    type: 'vehicle_count',
    severity: 'medium',
    tenantId: 'tnt-002',
    tenantName: 'Retail Park Brasil',
    locationId: 'loc-retail-mega-sul',
    locationName: 'Retail Park - Mega Center Sul',
    cameraName: 'Entrada logística',
    timestamp: '2025-12-10T05:00:00-03:00'
  },
  {
    id: 'evt-0007',
    type: 'loitering',
    severity: 'high',
    tenantId: 'tnt-002',
    tenantName: 'Retail Park Brasil',
    locationId: 'loc-retail-logistica-cps',
    locationName: 'Retail Park - Logística Campinas',
    cameraName: 'Estacionamento',
    timestamp: '2025-12-10T05:40:00-03:00'
  },
  {
    id: 'evt-0008',
    type: 'epi',
    severity: 'medium',
    tenantId: 'tnt-003',
    tenantName: 'Hospital Vida Plena',
    locationId: 'loc-vida-plena-centro',
    locationName: 'Hospital Vida Plena - Centro Cirúrgico',
    cameraName: 'Sala de esterilização',
    timestamp: '2025-12-10T06:10:00-03:00'
  },
  {
    id: 'evt-0009',
    type: 'people_count',
    severity: 'low',
    tenantId: 'tnt-003',
    tenantName: 'Hospital Vida Plena',
    locationId: 'loc-vida-plena-centro',
    locationName: 'Hospital Vida Plena - Centro Cirúrgico',
    cameraName: 'Corredor UTI',
    timestamp: '2025-12-10T06:45:00-03:00'
  },
  {
    id: 'evt-0010',
    type: 'intrusion',
    severity: 'critical',
    tenantId: 'tnt-004',
    tenantName: 'Colégio Horizonte',
    locationId: 'loc-colegio-horizonte-campus',
    locationName: 'Colégio Horizonte - Campus Principal',
    cameraName: 'Quadra externa',
    timestamp: '2025-12-10T07:05:00-03:00'
  },
  {
    id: 'evt-0011',
    type: 'line_cross',
    severity: 'medium',
    tenantId: 'tnt-004',
    tenantName: 'Colégio Horizonte',
    locationId: 'loc-colegio-horizonte-campus',
    locationName: 'Colégio Horizonte - Campus Principal',
    cameraName: 'Portaria alunos',
    timestamp: '2025-12-10T07:35:00-03:00'
  },
  {
    id: 'evt-0012',
    type: 'lpr',
    severity: 'high',
    tenantId: 'tnt-004',
    tenantName: 'Colégio Horizonte',
    locationId: 'loc-colegio-horizonte-campus',
    locationName: 'Colégio Horizonte - Campus Principal',
    cameraName: 'Estacionamento visitante',
    timestamp: '2025-12-10T08:00:00-03:00'
  },
  {
    id: 'evt-0013',
    type: 'vehicle_count',
    severity: 'medium',
    tenantId: 'tnt-005',
    tenantName: 'Inova Agro Logística',
    locationId: 'loc-inova-cd-goiania',
    locationName: 'Inova Agro - CD Goiânia',
    cameraName: 'Portão principal',
    timestamp: '2025-12-10T08:20:00-03:00'
  },
  {
    id: 'evt-0014',
    type: 'intrusion',
    severity: 'high',
    tenantId: 'tnt-005',
    tenantName: 'Inova Agro Logística',
    locationId: 'loc-inova-cd-goiania',
    locationName: 'Inova Agro - CD Goiânia',
    cameraName: 'Galpão 02',
    timestamp: '2025-12-10T08:40:00-03:00'
  },
  {
    id: 'evt-0015',
    type: 'people_count',
    severity: 'low',
    tenantId: 'tnt-006',
    tenantName: 'Vila Olímpica Residencial',
    locationId: 'loc-vila-olimpica-bloco-atlantico',
    locationName: 'Vila Olímpica - Bloco Atlântico',
    cameraName: 'Lobby torre A',
    timestamp: '2025-12-10T09:10:00-03:00'
  },
  {
    id: 'evt-0016',
    type: 'loitering',
    severity: 'medium',
    tenantId: 'tnt-006',
    tenantName: 'Vila Olímpica Residencial',
    locationId: 'loc-vila-olimpica-bloco-atlantico',
    locationName: 'Vila Olímpica - Bloco Atlântico',
    cameraName: 'Jardins internos',
    timestamp: '2025-12-10T09:30:00-03:00'
  },
  {
    id: 'evt-0017',
    type: 'epi',
    severity: 'medium',
    tenantId: 'tnt-007',
    tenantName: 'Nova Ferrovia Paulista',
    locationId: 'loc-ferrovia-terminal-campinas',
    locationName: 'Nova Ferrovia - Terminal Campinas',
    cameraName: 'Patio manutenção',
    timestamp: '2025-12-10T10:05:00-03:00'
  },
  {
    id: 'evt-0018',
    type: 'vehicle_count',
    severity: 'low',
    tenantId: 'tnt-007',
    tenantName: 'Nova Ferrovia Paulista',
    locationId: 'loc-ferrovia-terminal-campinas',
    locationName: 'Nova Ferrovia - Terminal Campinas',
    cameraName: 'Gate A',
    timestamp: '2025-12-10T10:40:00-03:00'
  },
  {
    id: 'evt-0019',
    type: 'line_cross',
    severity: 'medium',
    tenantId: 'tnt-007',
    tenantName: 'Nova Ferrovia Paulista',
    locationId: 'loc-ferrovia-coe-sp',
    locationName: 'Nova Ferrovia - COE São Paulo',
    cameraName: 'Sala controle',
    timestamp: '2025-12-10T11:05:00-03:00'
  },
  {
    id: 'evt-0020',
    type: 'intrusion',
    severity: 'critical',
    tenantId: 'tnt-002',
    tenantName: 'Retail Park Brasil',
    locationId: 'loc-retail-mega-sul',
    locationName: 'Retail Park - Mega Center Sul',
    cameraName: 'Cobertura lojas',
    timestamp: '2025-12-10T11:30:00-03:00'
  },
  {
    id: 'evt-0021',
    type: 'lpr',
    severity: 'high',
    tenantId: 'tnt-002',
    tenantName: 'Retail Park Brasil',
    locationId: 'loc-retail-mega-sul',
    locationName: 'Retail Park - Mega Center Sul',
    cameraName: 'Entrada principal',
    timestamp: '2025-12-10T12:10:00-03:00'
  },
  {
    id: 'evt-0022',
    type: 'people_count',
    severity: 'medium',
    tenantId: 'tnt-001',
    tenantName: 'Unifique Headquarters',
    locationId: 'loc-unifique-floripa',
    locationName: 'Campus Florianópolis',
    cameraName: 'Auditório 2º andar',
    timestamp: '2025-12-10T12:40:00-03:00'
  },
  {
    id: 'evt-0023',
    type: 'epi',
    severity: 'high',
    tenantId: 'tnt-003',
    tenantName: 'Hospital Vida Plena',
    locationId: 'loc-vida-plena-centro',
    locationName: 'Hospital Vida Plena - Centro Cirúrgico',
    cameraName: 'Sala cirúrgica 4',
    timestamp: '2025-12-10T13:05:00-03:00'
  },
  {
    id: 'evt-0024',
    type: 'vehicle_count',
    severity: 'medium',
    tenantId: 'tnt-006',
    tenantName: 'Vila Olímpica Residencial',
    locationId: 'loc-vila-olimpica-bloco-atlantico',
    locationName: 'Vila Olímpica - Bloco Atlântico',
    cameraName: 'Garagem subsolo',
    timestamp: '2025-12-10T13:30:00-03:00'
  },
  {
    id: 'evt-0025',
    type: 'loitering',
    severity: 'medium',
    tenantId: 'tnt-001',
    tenantName: 'Unifique Headquarters',
    locationId: 'loc-unifique-noc',
    locationName: 'Campus NOC Blumenau',
    cameraName: 'Jardim frontal',
    timestamp: '2025-12-10T14:05:00-03:00'
  },
  {
    id: 'evt-0026',
    type: 'intrusion',
    severity: 'critical',
    tenantId: 'tnt-007',
    tenantName: 'Nova Ferrovia Paulista',
    locationId: 'loc-ferrovia-terminal-campinas',
    locationName: 'Nova Ferrovia - Terminal Campinas',
    cameraName: 'Pátio leste',
    timestamp: '2025-12-10T14:25:00-03:00'
  },
  {
    id: 'evt-0027',
    type: 'line_cross',
    severity: 'medium',
    tenantId: 'tnt-007',
    tenantName: 'Nova Ferrovia Paulista',
    locationId: 'loc-ferrovia-coe-sp',
    locationName: 'Nova Ferrovia - COE São Paulo',
    cameraName: 'Corredor restrito',
    timestamp: '2025-12-10T15:00:00-03:00'
  },
  {
    id: 'evt-0028',
    type: 'epi',
    severity: 'medium',
    tenantId: 'tnt-005',
    tenantName: 'Inova Agro Logística',
    locationId: 'loc-inova-cd-goiania',
    locationName: 'Inova Agro - CD Goiânia',
    cameraName: 'Docas EPI',
    timestamp: '2025-12-10T15:20:00-03:00'
  },
  {
    id: 'evt-0029',
    type: 'people_count',
    severity: 'medium',
    tenantId: 'tnt-004',
    tenantName: 'Colégio Horizonte',
    locationId: 'loc-colegio-horizonte-campus',
    locationName: 'Colégio Horizonte - Campus Principal',
    cameraName: 'Refeitório',
    timestamp: '2025-12-10T16:05:00-03:00'
  },
  {
    id: 'evt-0030',
    type: 'vehicle_count',
    severity: 'high',
    tenantId: 'tnt-002',
    tenantName: 'Retail Park Brasil',
    locationId: 'loc-retail-logistica-cps',
    locationName: 'Retail Park - Logística Campinas',
    cameraName: 'Gate B',
    timestamp: '2025-12-10T16:45:00-03:00'
  },
  {
    id: 'evt-0031',
    type: 'intrusion',
    severity: 'high',
    tenantId: 'tnt-001',
    tenantName: 'Unifique Headquarters',
    locationId: 'loc-unifique-noc',
    locationName: 'Campus NOC Blumenau',
    cameraName: 'Telhado datacenter',
    timestamp: '2025-12-10T17:10:00-03:00'
  },
  {
    id: 'evt-0032',
    type: 'loitering',
    severity: 'medium',
    tenantId: 'tnt-002',
    tenantName: 'Retail Park Brasil',
    locationId: 'loc-retail-mega-sul',
    locationName: 'Retail Park - Mega Center Sul',
    cameraName: 'Praça central',
    timestamp: '2025-12-10T17:35:00-03:00'
  },
  {
    id: 'evt-0033',
    type: 'epi',
    severity: 'high',
    tenantId: 'tnt-003',
    tenantName: 'Hospital Vida Plena',
    locationId: 'loc-vida-plena-centro',
    locationName: 'Hospital Vida Plena - Centro Cirúrgico',
    cameraName: 'Sala de preparo',
    timestamp: '2025-12-10T18:05:00-03:00'
  },
  {
    id: 'evt-0034',
    type: 'vehicle_count',
    severity: 'medium',
    tenantId: 'tnt-006',
    tenantName: 'Vila Olímpica Residencial',
    locationId: 'loc-vila-olimpica-bloco-atlantico',
    locationName: 'Vila Olímpica - Bloco Atlântico',
    cameraName: 'Entrada de serviço',
    timestamp: '2025-12-10T18:40:00-03:00'
  },
  {
    id: 'evt-0035',
    type: 'line_cross',
    severity: 'medium',
    tenantId: 'tnt-004',
    tenantName: 'Colégio Horizonte',
    locationId: 'loc-colegio-horizonte-campus',
    locationName: 'Colégio Horizonte - Campus Principal',
    cameraName: 'Biblioteca',
    timestamp: '2025-12-10T19:05:00-03:00'
  },
  {
    id: 'evt-0036',
    type: 'intrusion',
    severity: 'critical',
    tenantId: 'tnt-007',
    tenantName: 'Nova Ferrovia Paulista',
    locationId: 'loc-ferrovia-terminal-campinas',
    locationName: 'Nova Ferrovia - Terminal Campinas',
    cameraName: 'Terminal cargas',
    timestamp: '2025-12-10T19:45:00-03:00'
  }
]

export function buildAiAlertsKpis(events: AiEvent[]) {
  const totalEvents = events.length
  const criticalEvents = events.filter((event) => event.severity === 'critical').length
  const tenantSet = new Set(events.map((event) => event.tenantId))
  const moduleSet = new Set(events.map((event) => event.type))

  return {
    totalEvents,
    criticalEvents,
    activeTenants: tenantSet.size,
    activeModules: moduleSet.size
  }
}

export function aggregateEventsByType(events: AiEvent[]) {
  const totals: Record<AiEventType, number> = {
    intrusion: 0,
    line_cross: 0,
    lpr: 0,
    people_count: 0,
    vehicle_count: 0,
    loitering: 0,
    epi: 0
  }

  events.forEach((event) => {
    totals[event.type] += 1
  })

  const totalEvents = events.length || 1

  return (Object.keys(totals) as AiEventType[])
    .filter((type) => totals[type] > 0)
    .map((type) => ({
      type,
      label: AI_TYPE_LABELS[type],
      color: AI_TYPE_COLORS[type],
      count: totals[type],
      percentage: Math.round((totals[type] / totalEvents) * 100)
    }))
}

export function buildEventsTimeline(events: AiEvent[]) {
  const buckets = new Map<number, number>()

  events.forEach((event) => {
    const date = new Date(event.timestamp)
    const hour = date.getHours()
    buckets.set(hour, (buckets.get(hour) ?? 0) + 1)
  })

  return Array.from(buckets.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([hour, count]) => ({
      hourLabel: `${String(hour).padStart(2, '0')}h`,
      count
    }))
}

export function buildTenantEventStats(events: AiEvent[]) {
  const tenants = new Map<
    string,
    {
      tenantId: string
      tenantName: string
      totalEvents: number
      criticalEvents: number
      locations: Set<string>
    }
  >()

  events.forEach((event) => {
    if (!tenants.has(event.tenantId)) {
      tenants.set(event.tenantId, {
        tenantId: event.tenantId,
        tenantName: event.tenantName,
        totalEvents: 0,
        criticalEvents: 0,
        locations: new Set()
      })
    }

    const entry = tenants.get(event.tenantId)!
    entry.totalEvents += 1
    if (event.severity === 'critical') {
      entry.criticalEvents += 1
    }
    entry.locations.add(event.locationName)
  })

  return Array.from(tenants.values())
    .map((tenant) => ({
      tenantId: tenant.tenantId,
      tenantName: tenant.tenantName,
      totalEvents: tenant.totalEvents,
      criticalEvents: tenant.criticalEvents,
      locationsAffected: tenant.locations.size,
      highVolume: tenant.totalEvents >= 15
    }))
    .sort((a, b) => b.totalEvents - a.totalEvents)
}
