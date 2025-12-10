import type { InfraServer } from '@/modules/admin/infrastructure/mockServers'

export type InfraAlertSeverity = 'info' | 'warning' | 'critical'

export type InfraAlert = {
  id: string
  serverId: string
  serverName: string
  severity: InfraAlertSeverity
  title: string
  description: string
  timestamp: string
}

export const INFRA_ALERTS: InfraAlert[] = [
  {
    id: 'alert-001',
    serverId: 'srv-ia-gpu-02',
    serverName: 'Cluster IA 02',
    severity: 'critical',
    title: 'GPU acima de 90% por 12 minutos',
    description: 'Módulos de intrusão consumindo toda a fila CUDA. Rebalancear cargas IA.',
    timestamp: '2025-12-10T09:12:00-03:00',
  },
  {
    id: 'alert-002',
    serverId: 'srv-record-03',
    serverName: 'Recorder Pool 03',
    severity: 'warning',
    title: 'Disco ocupado em 93%',
    description: 'Cluster de gravação SC-02 próximo ao limite. Avaliar compressão ou failover.',
    timestamp: '2025-12-10T09:07:00-03:00',
  },
  {
    id: 'alert-003',
    serverId: 'srv-stream-01',
    serverName: 'Streaming Edge 01',
    severity: 'info',
    title: 'Latência média subiu 18%',
    description: 'Pequeno pico de tráfego identificado em CDN Norte. Monitorar próximos 30 min.',
    timestamp: '2025-12-10T09:05:30-03:00',
  },
  {
    id: 'alert-004',
    serverId: 'srv-ia-gpu-03',
    serverName: 'Cluster IA 03',
    severity: 'warning',
    title: 'Janela de manutenção em andamento',
    description: 'Atualização de driver CUDA e firmware em execução.',
    timestamp: '2025-12-10T08:58:00-03:00',
  },
  {
    id: 'alert-005',
    serverId: 'srv-record-01',
    serverName: 'Recorder Pool 01',
    severity: 'info',
    title: 'Novo tenant alocado',
    description: 'Colégio Horizonte passou a gravar no pool 01. Sem impacto.',
    timestamp: '2025-12-10T08:45:00-03:00',
  },
  {
    id: 'alert-006',
    serverId: 'srv-ia-core-01',
    serverName: 'Cluster IA 01',
    severity: 'warning',
    title: 'Fila IA acima de 70% da capacidade',
    description: 'Recomendado mover câmeras de contagem de pessoas para cluster IA 03 quando voltar.',
    timestamp: '2025-12-10T08:40:00-03:00',
  },
  {
    id: 'alert-007',
    serverId: 'srv-core-ctrl',
    serverName: 'Orchestrator Core',
    severity: 'info',
    title: 'Deploy concluído (v1.14.3)',
    description: 'Novas métricas de telemetria disponíveis para tenants enterprise.',
    timestamp: '2025-12-10T08:35:00-03:00',
  },
  {
    id: 'alert-008',
    serverId: 'srv-record-03',
    serverName: 'Recorder Pool 03',
    severity: 'critical',
    title: 'Tempo de resposta acima de 1.4s',
    description: 'Fluxos de Retail Park e Vila Olímpica com jitter elevado.',
    timestamp: '2025-12-10T08:26:00-03:00',
  },
  {
    id: 'alert-009',
    serverId: 'srv-stream-01',
    serverName: 'Streaming Edge 01',
    severity: 'warning',
    title: 'Conexões simultâneas atingiram 82% do limite',
    description: 'Possível necessidade de instanciar Edge 02 em SC.',
    timestamp: '2025-12-10T08:15:00-03:00',
  },
  {
    id: 'alert-010',
    serverId: 'srv-ia-gpu-02',
    serverName: 'Cluster IA 02',
    severity: 'warning',
    title: 'Temperatura GPU em 72ºC',
    description: 'Verificar refrigeração no rack B4.',
    timestamp: '2025-12-10T08:05:00-03:00',
  },
]

export const ALERT_SEVERITY_META: Record<InfraAlertSeverity, { label: string; className: string }> = {
  info: { label: 'Info', className: 'bg-sky-100 text-sky-700 border-sky-200' },
  warning: { label: 'Aviso', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  critical: { label: 'Crítico', className: 'bg-rose-100 text-rose-700 border-rose-200' },
}

export function getAlertsForServer(serverId: InfraServer['id']) {
  return INFRA_ALERTS.filter((alert) => alert.serverId === serverId)
}
