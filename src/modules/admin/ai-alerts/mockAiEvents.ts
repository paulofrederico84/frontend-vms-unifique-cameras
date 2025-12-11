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
