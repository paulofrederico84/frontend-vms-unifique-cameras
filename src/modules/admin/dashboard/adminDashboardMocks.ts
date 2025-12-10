export type CamerasStatusSummary = {
  total: number
  online: number
  offline: number
  error: number
  maintenance: number
}

export type StorageSummary = {
  totalGb: number
  usedGb: number
  usedPercent: number
  retentionDays: number
}

export type DailyEventsPoint = {
  date: string
  totalEvents: number
  criticalAlerts: number
}

export type RecentEvent = {
  id: string
  type: 'INTRUSION' | 'LPR' | 'LINE_CROSS' | 'LOITERING' | 'OTHER'
  cameraName: string
  siteName: string
  timestamp: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  description: string
}

export type AdminDashboardData = {
  camerasStatus: CamerasStatusSummary
  storage: StorageSummary
  todayEventsCount: number
  todayCriticalAlertsCount: number
  activeRecordingsCount: number
  tenantsCount?: number
  dailyEvents: DailyEventsPoint[]
  recentEvents: RecentEvent[]
}

const globalAdminData: AdminDashboardData = {
  camerasStatus: {
    total: 230,
    online: 212,
    offline: 8,
    error: 6,
    maintenance: 4,
  },
  storage: {
    totalGb: 3200,
    usedGb: 2480,
    usedPercent: 77.5,
    retentionDays: 32,
  },
  todayEventsCount: 342,
  todayCriticalAlertsCount: 9,
  activeRecordingsCount: 182,
  tenantsCount: 18,
  dailyEvents: [
    { date: '2025-12-01', totalEvents: 298, criticalAlerts: 7 },
    { date: '2025-12-02', totalEvents: 312, criticalAlerts: 6 },
    { date: '2025-12-03', totalEvents: 327, criticalAlerts: 8 },
    { date: '2025-12-04', totalEvents: 301, criticalAlerts: 5 },
    { date: '2025-12-05', totalEvents: 346, criticalAlerts: 11 },
    { date: '2025-12-06', totalEvents: 289, criticalAlerts: 4 },
    { date: '2025-12-07', totalEvents: 342, criticalAlerts: 9 },
  ],
  recentEvents: [
    {
      id: 'evt-001',
      type: 'INTRUSION',
      cameraName: 'Entrada Leste HQ',
      siteName: 'Unifique HQ',
      timestamp: '2025-12-07T08:45:00-03:00',
      severity: 'HIGH',
      description: 'Movimentação inesperada detectada durante plantão noturno.',
    },
    {
      id: 'evt-002',
      type: 'LPR',
      cameraName: 'Garagem Bloco B',
      siteName: 'Cliente Alfa',
      timestamp: '2025-12-07T09:05:00-03:00',
      severity: 'LOW',
      description: 'Veículo autorizado identificado no acesso de carga.',
    },
    {
      id: 'evt-003',
      type: 'LINE_CROSS',
      cameraName: 'Perímetro Norte',
      siteName: 'Cliente GigaMall',
      timestamp: '2025-12-07T09:18:00-03:00',
      severity: 'MEDIUM',
      description: 'Linha virtual acionada próximo ao estoque externo.',
    },
    {
      id: 'evt-004',
      type: 'LOITERING',
      cameraName: 'Hall Elevadores',
      siteName: 'Cliente Beta Tower',
      timestamp: '2025-12-07T09:36:00-03:00',
      severity: 'HIGH',
      description: 'Permanência acima do limite em zona restrita.',
    },
    {
      id: 'evt-005',
      type: 'OTHER',
      cameraName: 'Datacenter Row 3',
      siteName: 'Cliente EdgeCloud',
      timestamp: '2025-12-07T09:52:00-03:00',
      severity: 'CRITICAL',
      description: 'Acesso manual forçado ao rack 12 detectado pela IA.',
    },
  ],
}

const tenantDashboards: Record<string, AdminDashboardData> = {
  'tenant-unifique-hq': {
    camerasStatus: {
      total: 32,
      online: 30,
      offline: 1,
      error: 0,
      maintenance: 1,
    },
    storage: {
      totalGb: 180,
      usedGb: 122,
      usedPercent: 67.8,
      retentionDays: 28,
    },
    todayEventsCount: 38,
    todayCriticalAlertsCount: 2,
    activeRecordingsCount: 31,
    dailyEvents: [
      { date: '2025-12-01', totalEvents: 33, criticalAlerts: 1 },
      { date: '2025-12-02', totalEvents: 35, criticalAlerts: 2 },
      { date: '2025-12-03', totalEvents: 31, criticalAlerts: 1 },
      { date: '2025-12-04', totalEvents: 29, criticalAlerts: 0 },
      { date: '2025-12-05', totalEvents: 42, criticalAlerts: 3 },
      { date: '2025-12-06', totalEvents: 37, criticalAlerts: 2 },
      { date: '2025-12-07', totalEvents: 38, criticalAlerts: 2 },
    ],
    recentEvents: [
      {
        id: 't-hq-001',
        type: 'INTRUSION',
        cameraName: 'Portaria Principal',
        siteName: 'Unifique HQ',
        timestamp: '2025-12-07T08:12:00-03:00',
        severity: 'MEDIUM',
        description: 'Alarme disparado em acesso de serviço durante carregamento.',
      },
      {
        id: 't-hq-002',
        type: 'LPR',
        cameraName: 'Garagem 3º subsolo',
        siteName: 'Unifique HQ',
        timestamp: '2025-12-07T08:40:00-03:00',
        severity: 'LOW',
        description: 'Veículo visitante liberado por concierge.',
      },
      {
        id: 't-hq-003',
        type: 'OTHER',
        cameraName: 'Roofdeck',
        siteName: 'Unifique HQ',
        timestamp: '2025-12-07T09:05:00-03:00',
        severity: 'HIGH',
        description: 'Sensor climático detectou rajada acima do limite, câmeras ajustadas.',
      },
    ],
  },
  'tenant-retail-park': {
    camerasStatus: {
      total: 24,
      online: 22,
      offline: 1,
      error: 1,
      maintenance: 0,
    },
    storage: {
      totalGb: 120,
      usedGb: 91,
      usedPercent: 75.8,
      retentionDays: 21,
    },
    todayEventsCount: 27,
    todayCriticalAlertsCount: 1,
    activeRecordingsCount: 23,
    dailyEvents: [
      { date: '2025-12-01', totalEvents: 19, criticalAlerts: 1 },
      { date: '2025-12-02', totalEvents: 24, criticalAlerts: 0 },
      { date: '2025-12-03', totalEvents: 21, criticalAlerts: 1 },
      { date: '2025-12-04', totalEvents: 25, criticalAlerts: 0 },
      { date: '2025-12-05', totalEvents: 28, criticalAlerts: 1 },
      { date: '2025-12-06', totalEvents: 23, criticalAlerts: 0 },
      { date: '2025-12-07', totalEvents: 27, criticalAlerts: 1 },
    ],
    recentEvents: [
      {
        id: 't-rp-001',
        type: 'LINE_CROSS',
        cameraName: 'Corredor Leste',
        siteName: 'Retail Park',
        timestamp: '2025-12-07T07:55:00-03:00',
        severity: 'MEDIUM',
        description: 'Acesso antecipado ao estoque registrado para auditoria.',
      },
      {
        id: 't-rp-002',
        type: 'LOITERING',
        cameraName: 'Praça Central',
        siteName: 'Retail Park',
        timestamp: '2025-12-07T08:20:00-03:00',
        severity: 'LOW',
        description: 'Cliente aguardando abertura prolongada monitorado pela equipe.',
      },
      {
        id: 't-rp-003',
        type: 'OTHER',
        cameraName: 'Docas Carga 2',
        siteName: 'Retail Park',
        timestamp: '2025-12-07T09:10:00-03:00',
        severity: 'HIGH',
        description: 'Falha breve em stream de câmera corrigida automaticamente.',
      },
    ],
  },
}

export function getGlobalAdminDashboardData(): AdminDashboardData {
  return globalAdminData
}

export function getTenantAdminDashboardData(tenantId: string): AdminDashboardData {
  const normalizedId = tenantId || 'tenant-default'
  if (tenantDashboards[normalizedId]) {
    return tenantDashboards[normalizedId]
  }

  return {
    camerasStatus: {
      total: 18,
      online: 17,
      offline: 1,
      error: 0,
      maintenance: 0,
    },
    storage: {
      totalGb: 96,
      usedGb: 68,
      usedPercent: 70.8,
      retentionDays: 21,
    },
    todayEventsCount: 19,
    todayCriticalAlertsCount: 1,
    activeRecordingsCount: 17,
    dailyEvents: [
      { date: '2025-12-01', totalEvents: 16, criticalAlerts: 1 },
      { date: '2025-12-02', totalEvents: 17, criticalAlerts: 0 },
      { date: '2025-12-03', totalEvents: 18, criticalAlerts: 1 },
      { date: '2025-12-04', totalEvents: 14, criticalAlerts: 0 },
      { date: '2025-12-05', totalEvents: 19, criticalAlerts: 1 },
      { date: '2025-12-06', totalEvents: 15, criticalAlerts: 0 },
      { date: '2025-12-07', totalEvents: 19, criticalAlerts: 1 },
    ],
    recentEvents: [
      {
        id: `${normalizedId}-evt-1`,
        type: 'INTRUSION',
        cameraName: 'Portão Principal',
        siteName: normalizedId,
        timestamp: '2025-12-07T08:00:00-03:00',
        severity: 'MEDIUM',
        description: 'Atividade incomum registrada e encaminhada para equipe local.',
      },
      {
        id: `${normalizedId}-evt-2`,
        type: 'OTHER',
        cameraName: 'Sala Técnica',
        siteName: normalizedId,
        timestamp: '2025-12-07T08:40:00-03:00',
        severity: 'LOW',
        description: 'Ajuste automático de bitrate concluído com sucesso.',
      },
    ],
  }
}
