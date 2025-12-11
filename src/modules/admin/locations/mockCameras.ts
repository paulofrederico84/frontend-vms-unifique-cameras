export type AdminCameraStatus = 'online' | 'offline' | 'unstable' | 'maintenance'

export type AdminCamera = {
  id: string
  locationId: string
  name: string
  model: string
  resolution: string
  ip: string
  status: AdminCameraStatus
  iaModules: {
    intrusion: boolean
    lineCross: boolean
    lpr: boolean
    peopleCounting: boolean
    vehicleCounting: boolean
  }
  recording: boolean
  lastSeen: string
}

export const CAMERA_TECH_PROFILES: Record<string, { fps: number; bitrate: string }> = {
  'Intelbras VIP 7440 IA': { fps: 30, bitrate: '6 Mbps' },
  'Axis P3265-LV': { fps: 30, bitrate: '4 Mbps' },
  'Dahua WizMind SD5A': { fps: 25, bitrate: '8 Mbps' },
  'Intelbras Mibo 9060': { fps: 20, bitrate: '3 Mbps' },
  'Hanwha PNV-A9081R': { fps: 30, bitrate: '7 Mbps' },
  'Axis Q6215-LE': { fps: 30, bitrate: '9 Mbps' },
  'Hikvision DeepinView': { fps: 30, bitrate: '5 Mbps' },
  'Intelbras VIP 5450': { fps: 30, bitrate: '6 Mbps' },
  'Axis P1377-LE': { fps: 25, bitrate: '4 Mbps' },
  'Dahua N45DL': { fps: 25, bitrate: '5 Mbps' },
  'Intelbras VIP 7260': { fps: 30, bitrate: '4 Mbps' },
  'Axis P1448-LE': { fps: 30, bitrate: '6 Mbps' },
  'Intelbras VIP 5230': { fps: 25, bitrate: '4 Mbps' },
  'Hanwha QNP-6250R': { fps: 30, bitrate: '7 Mbps' },
  'Intelbras VIP 7460 IA': { fps: 30, bitrate: '6 Mbps' },
  'Axis Q6135-LE PTZ': { fps: 30, bitrate: '8 Mbps' },
  'Hikvision TurboHD X': { fps: 25, bitrate: '5 Mbps' },
  'Hanwha XNV-8083': { fps: 30, bitrate: '4 Mbps' },
  'Axis P1468-XLE': { fps: 25, bitrate: '7 Mbps' }
}

export function getCameraTechnicalProfile(model: string) {
  return CAMERA_TECH_PROFILES[model] ?? { fps: 24, bitrate: '4 Mbps' }
}
