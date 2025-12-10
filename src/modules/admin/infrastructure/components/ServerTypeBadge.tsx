import type { InfraServerType } from '@/modules/admin/infrastructure/mockServers'

const TYPE_META: Record<InfraServerType, { label: string; className: string }> = {
  IA: { label: 'Serviço IA', className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  RECORDING: { label: 'Gravação', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  STREAMING: { label: 'Streaming', className: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
  CORE: { label: 'Orquestração', className: 'bg-slate-100 text-slate-700 border-slate-200' },
}

type ServerTypeBadgeProps = {
  type: InfraServerType
}

export function ServerTypeBadge({ type }: ServerTypeBadgeProps) {
  const meta = TYPE_META[type]

  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${meta.className}`}>{meta.label}</span>
}
