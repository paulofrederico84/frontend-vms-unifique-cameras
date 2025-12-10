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

export const CAMERA_MOCKS: AdminCamera[] = [
  {
    id: 'cam-0001',
    locationId: 'loc-unifique-noc',
    name: 'NOC - Hall Principal',
    model: 'Intelbras VIP 7440 IA',
    resolution: '4MP',
    ip: '10.10.1.12',
    status: 'online',
    iaModules: { intrusion: true, lineCross: true, lpr: false, peopleCounting: true, vehicleCounting: false },
    recording: true,
    lastSeen: '2025-12-10T08:42:00-03:00',
  },
  {
    id: 'cam-0002',
    locationId: 'loc-unifique-noc',
    name: 'NOC - Porta de Serviço',
    model: 'Axis P3265-LV',
    resolution: '1080p',
    ip: '10.10.1.18',
    status: 'maintenance',
    iaModules: { intrusion: false, lineCross: true, lpr: false, peopleCounting: false, vehicleCounting: false },
    recording: false,
    lastSeen: '2025-12-09T21:10:00-03:00',
  },
  {
    id: 'cam-0003',
    locationId: 'loc-unifique-floripa',
    name: 'Florianópolis - Recepção',
    model: 'Dahua WizMind SD5A',
    resolution: '4K',
    ip: '10.40.2.44',
    status: 'online',
    iaModules: { intrusion: true, lineCross: true, lpr: false, peopleCounting: true, vehicleCounting: true },
    recording: true,
    lastSeen: '2025-12-10T09:05:00-03:00',
  },
  {
    id: 'cam-0004',
    locationId: 'loc-unifique-floripa',
    name: 'Florianópolis - Garagem',
    model: 'Intelbras Mibo 9060',
    resolution: '1080p',
    ip: '10.40.2.53',
    status: 'offline',
    iaModules: { intrusion: false, lineCross: true, lpr: false, peopleCounting: false, vehicleCounting: false },
    recording: false,
    lastSeen: '2025-12-08T17:20:00-03:00',
  },
  {
    id: 'cam-0005',
    locationId: 'loc-retail-mega-sul',
    name: 'Retail Sul - Entrada A',
    model: 'Hanwha PNV-A9081R',
    resolution: '4MP',
    ip: '172.16.20.11',
    status: 'online',
    iaModules: { intrusion: true, lineCross: true, lpr: true, peopleCounting: true, vehicleCounting: true },
    recording: true,
    lastSeen: '2025-12-10T09:00:00-03:00',
  },
  {
    id: 'cam-0006',
    locationId: 'loc-retail-mega-sul',
    name: 'Retail Sul - Docas 02',
    model: 'Axis Q6215-LE',
    resolution: '4K',
    ip: '172.16.20.44',
    status: 'unstable',
    iaModules: { intrusion: true, lineCross: true, lpr: false, peopleCounting: false, vehicleCounting: true },
    recording: true,
    lastSeen: '2025-12-10T08:57:00-03:00',
  },
  {
    id: 'cam-0007',
    locationId: 'loc-retail-logistica-cps',
    name: 'Logística Campinas - Docas',
    model: 'Hikvision DeepinView',
    resolution: '4MP',
    ip: '172.16.60.77',
    status: 'online',
    iaModules: { intrusion: true, lineCross: true, lpr: false, peopleCounting: false, vehicleCounting: true },
    recording: true,
    lastSeen: '2025-12-10T08:30:00-03:00',
  },
  {
    id: 'cam-0008',
    locationId: 'loc-retail-logistica-cps',
    name: 'Logística Campinas - Portaria',
    model: 'Intelbras VIP 5450',
    resolution: '4MP',
    ip: '172.16.60.12',
    status: 'online',
    iaModules: { intrusion: true, lineCross: true, lpr: true, peopleCounting: false, vehicleCounting: true },
    recording: true,
    lastSeen: '2025-12-10T09:12:00-03:00',
  },
  {
    id: 'cam-0009',
    locationId: 'loc-vida-plena-centro',
    name: 'Hospital - UTI Adulto 01',
    model: 'Axis P1377-LE',
    resolution: '1080p',
    ip: '10.80.11.23',
    status: 'unstable',
    iaModules: { intrusion: false, lineCross: true, lpr: false, peopleCounting: true, vehicleCounting: false },
    recording: true,
    lastSeen: '2025-12-10T07:55:00-03:00',
  },
  {
    id: 'cam-0010',
    locationId: 'loc-vida-plena-centro',
    name: 'Hospital - Acesso Cirúrgico',
    model: 'Dahua N45DL',
    resolution: '4MP',
    ip: '10.80.11.41',
    status: 'offline',
    iaModules: { intrusion: false, lineCross: true, lpr: false, peopleCounting: false, vehicleCounting: false },
    recording: false,
    lastSeen: '2025-12-09T23:40:00-03:00',
  },
  {
    id: 'cam-0011',
    locationId: 'loc-colegio-horizonte-campus',
    name: 'Horizonte - Playground',
    model: 'Intelbras VIP 7260',
    resolution: '4MP',
    ip: '192.168.40.30',
    status: 'online',
    iaModules: { intrusion: true, lineCross: false, lpr: false, peopleCounting: true, vehicleCounting: false },
    recording: true,
    lastSeen: '2025-12-10T09:26:00-03:00',
  },
  {
    id: 'cam-0012',
    locationId: 'loc-colegio-horizonte-campus',
    name: 'Horizonte - Portaria Principal',
    model: 'Axis P1448-LE',
    resolution: '4K',
    ip: '192.168.40.11',
    status: 'online',
    iaModules: { intrusion: true, lineCross: true, lpr: true, peopleCounting: false, vehicleCounting: true },
    recording: true,
    lastSeen: '2025-12-10T09:21:00-03:00',
  },
  {
    id: 'cam-0013',
    locationId: 'loc-inova-cd-goiania',
    name: 'Inova - Portão Principal',
    model: 'Intelbras VIP 5230',
    resolution: '1080p',
    ip: '172.19.5.10',
    status: 'offline',
    iaModules: { intrusion: true, lineCross: true, lpr: true, peopleCounting: false, vehicleCounting: true },
    recording: false,
    lastSeen: '2025-12-08T18:15:00-03:00',
  },
  {
    id: 'cam-0014',
    locationId: 'loc-inova-cd-goiania',
    name: 'Inova - Galpão 02',
    model: 'Hanwha QNP-6250R',
    resolution: '1080p',
    ip: '172.19.5.24',
    status: 'unstable',
    iaModules: { intrusion: true, lineCross: true, lpr: false, peopleCounting: false, vehicleCounting: false },
    recording: true,
    lastSeen: '2025-12-09T22:02:00-03:00',
  },
  {
    id: 'cam-0015',
    locationId: 'loc-vila-olimpica-bloco-atlantico',
    name: 'Vila Olímpica - Lobby',
    model: 'Intelbras VIP 7460 IA',
    resolution: '4MP',
    ip: '10.120.2.14',
    status: 'online',
    iaModules: { intrusion: true, lineCross: true, lpr: false, peopleCounting: true, vehicleCounting: false },
    recording: true,
    lastSeen: '2025-12-10T09:18:00-03:00',
  },
  {
    id: 'cam-0016',
    locationId: 'loc-ferrovia-terminal-campinas',
    name: 'Ferrovia - Pátio Leste',
    model: 'Axis Q6135-LE PTZ',
    resolution: '4MP',
    ip: '10.210.10.61',
    status: 'online',
    iaModules: { intrusion: true, lineCross: true, lpr: false, peopleCounting: false, vehicleCounting: true },
    recording: true,
    lastSeen: '2025-12-10T09:08:00-03:00',
  },
  {
    id: 'cam-0017',
    locationId: 'loc-ferrovia-terminal-campinas',
    name: 'Ferrovia - Gate A',
    model: 'Hikvision TurboHD X',
    resolution: '4MP',
    ip: '10.210.10.37',
    status: 'offline',
    iaModules: { intrusion: true, lineCross: true, lpr: true, peopleCounting: false, vehicleCounting: true },
    recording: false,
    lastSeen: '2025-12-09T19:45:00-03:00',
  },
  {
    id: 'cam-0018',
    locationId: 'loc-ferrovia-coe-sp',
    name: 'Ferrovia - COE Sala 4',
    model: 'Hanwha XNV-8083',
    resolution: '4MP',
    ip: '10.215.3.18',
    status: 'online',
    iaModules: { intrusion: false, lineCross: true, lpr: false, peopleCounting: true, vehicleCounting: false },
    recording: true,
    lastSeen: '2025-12-10T09:10:00-03:00',
  },
  {
    id: 'cam-0019',
    locationId: 'loc-ferrovia-coe-sp',
    name: 'Ferrovia - Rooftop',
    model: 'Axis P1468-XLE',
    resolution: '4K',
    ip: '10.215.3.44',
    status: 'maintenance',
    iaModules: { intrusion: true, lineCross: true, lpr: false, peopleCounting: false, vehicleCounting: true },
    recording: false,
    lastSeen: '2025-12-10T03:32:00-03:00',
  },
]

export const CAMERA_MODELS = Array.from(new Set(CAMERA_MOCKS.map((camera) => camera.model))).sort()

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
  'Axis P1468-XLE': { fps: 25, bitrate: '7 Mbps' },
}

export function getCamerasByLocation(locationId: string) {
  return CAMERA_MOCKS.filter((camera) => camera.locationId === locationId)
}

export function getCameraById(cameraId: string) {
  return CAMERA_MOCKS.find((camera) => camera.id === cameraId) ?? null
}

export function getCameraTechnicalProfile(model: string) {
  return CAMERA_TECH_PROFILES[model] ?? { fps: 24, bitrate: '4 Mbps' }
}
