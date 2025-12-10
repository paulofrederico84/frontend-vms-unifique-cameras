import type { AdminCameraStatus } from '@/modules/admin/locations/mockCameras'

const STATUS_STYLES: Record<AdminCameraStatus, { label: string; className: string }> = {
  online: { label: 'Online', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  offline: { label: 'Offline', className: 'bg-rose-100 text-rose-700 border-rose-200' },
  unstable: { label: 'Instável', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  maintenance: { label: 'Manutenção', className: 'bg-slate-100 text-slate-600 border-slate-200' },
}

type CameraStatusBadgeProps = {
  status: AdminCameraStatus
}

export function CameraStatusBadge({ status }: CameraStatusBadgeProps) {
  const meta = STATUS_STYLES[status]

  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${meta.className}`}>{meta.label}</span>
}
