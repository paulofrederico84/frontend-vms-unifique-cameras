import type { AlertRule } from '@/modules/admin/ai-alerts/mockAlertRules'

export const mockAlerts: AlertRule[] = [
	{
		id: 'rule-001',
		name: 'Perímetro externo noturno',
		description: 'Dispara alertas críticos quando cercas virtuais são violadas fora do expediente padrão.',
		aiType: 'intrusion',
		defaultSeverity: 'critical',
		enabled: true,
		scope: 'GLOBAL',
		activeHours: '20:00 - 06:00',
		daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	{
		id: 'rule-002',
		name: 'Fluxo veículos docas',
		description: 'Monitora excesso de veículos em filas de carga e descarga nos centros logísticos.',
		aiType: 'vehicle_count',
		defaultSeverity: 'high',
		enabled: true,
		scope: 'GLOBAL',
		activeHours: '06:00 - 22:00',
		daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	},
	{
		id: 'rule-003',
		name: 'Entrada principal horário comercial',
		description: 'Linha virtual para validar fluxos de entrada em horários com grande circulação.',
		aiType: 'line_cross',
		defaultSeverity: 'medium',
		enabled: true,
		scope: 'TENANT_TEMPLATE',
		activeHours: '07:00 - 20:00',
		daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
	},
	{
		id: 'rule-004',
		name: 'LPR carga crítica',
		description: 'Exige conferência manual para placas não cadastradas em docas estratégicas.',
		aiType: 'lpr',
		defaultSeverity: 'high',
		enabled: true,
		scope: 'GLOBAL',
		activeHours: '00:00 - 23:59',
		daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	},
	{
		id: 'rule-005',
		name: 'Contagem de pessoas em área crítica',
		description: 'Limita ocupação em áreas clínicas e salas técnicas para garantir protocolos.',
		aiType: 'people_count',
		defaultSeverity: 'high',
		enabled: true,
		scope: 'TENANT_TEMPLATE',
		activeHours: '24/7',
		daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	},
	{
		id: 'rule-006',
		name: 'Permanência suspeita em varejo',
		description: 'Detecta permanência acima do limite em vitrines estratégicas.',
		aiType: 'loitering',
		defaultSeverity: 'medium',
		enabled: true,
		scope: 'TENANT_TEMPLATE',
		activeHours: '09:00 - 22:00',
		daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	},
	{
		id: 'rule-007',
		name: 'Checklist EPI obrigatórios',
		description: 'Garante que operadores utilizem os EPIs durante manutenção em campo.',
		aiType: 'epi',
		defaultSeverity: 'high',
		enabled: false,
		scope: 'GLOBAL',
		activeHours: '05:00 - 23:00',
		daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
	},
	{
		id: 'rule-008',
		name: 'Intrusão em cobertura técnica',
		description: 'Sinaliza movimento suspeito em telhados com linhas críticas.',
		aiType: 'intrusion',
		defaultSeverity: 'critical',
		enabled: true,
		scope: 'TENANT_TEMPLATE',
		activeHours: '18:00 - 06:00',
		daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	}
]
