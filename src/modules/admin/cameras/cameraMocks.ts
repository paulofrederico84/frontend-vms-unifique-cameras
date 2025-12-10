import type { Camera } from './cameraTypes'

export let CAMERA_MOCKS: Camera[] = [
  {
    id: 'cam-hq-noc-01',
    name: 'NOC - Corredor Principal',
    tenantId: 'tenant-unifique-hq',
    tenantName: 'Unifique Headquarters',
    siteId: 'site-unifique-blumenau-hq',
    siteName: 'Campus Matriz Blumenau',
    status: 'ONLINE',
    mainRtspUrl: 'rtsp://192.168.10.10:554/Streaming/Channels/101',
    subRtspUrl: 'rtsp://192.168.10.10:554/Streaming/Channels/102',
    rtmpUrl: 'rtmp://stream.unifique.com/live/noc01',
    streamProfiles: [
      {
        id: 'stream-main',
        name: 'Principal',
        resolution: '1920x1080',
        fps: 30,
        bitrateKbps: 4096,
        codec: 'H264',
        usage: { live: true, recording: true, analytics: true },
      },
      {
        id: 'stream-sub',
        name: 'Secundário',
        resolution: '1280x720',
        fps: 15,
        bitrateKbps: 2048,
        codec: 'H265',
        usage: { live: true, recording: false, analytics: true },
      },
      {
        id: 'stream-extra-ia',
        name: 'Stream Extra IA',
        resolution: '640x360',
        fps: 12,
        bitrateKbps: 800,
        codec: 'H264',
        usage: { live: false, recording: false, analytics: true },
      },
    ],
    iaSettings: {
      enabled: true,
      sensitivity: 78,
      analytics: {
        intrusion: true,
        lineCross: true,
        lpr: false,
        peopleCounting: true,
        vehicleCounting: true,
        epi: false,
        loitering: true,
      },
    },
    recordingSettings: {
      enabled: true,
      retentionDays: 30,
      mode: 'CONTINUOUS',
    },
    createdAt: '2023-04-12T13:05:00-03:00',
    lastSeenAt: '2025-12-08T09:05:00-03:00',
  },
  {
    id: 'cam-hq-datacenter-02',
    name: 'Data Center - Sala UPS',
    tenantId: 'tenant-unifique-hq',
    tenantName: 'Unifique Headquarters',
    siteId: 'site-unifique-blumenau-hq',
    siteName: 'Campus Matriz Blumenau',
    status: 'MAINTENANCE',
    mainRtspUrl: 'rtsp://192.168.10.22:554/Streaming/Channels/101',
    subRtspUrl: 'rtsp://192.168.10.22:554/Streaming/Channels/102',
    streamProfiles: [
      {
        id: 'stream-main',
        name: 'Principal',
        resolution: '2560x1440',
        fps: 25,
        bitrateKbps: 5200,
        codec: 'H265',
        usage: { live: true, recording: true, analytics: true },
      },
      {
        id: 'stream-sub',
        name: 'Secundário',
        resolution: '1280x720',
        fps: 15,
        bitrateKbps: 1800,
        codec: 'H264',
        usage: { live: true, recording: false, analytics: false },
      },
    ],
    iaSettings: {
      enabled: true,
      sensitivity: 65,
      analytics: {
        intrusion: true,
        lineCross: false,
        lpr: false,
        peopleCounting: false,
        vehicleCounting: false,
        epi: true,
        loitering: false,
      },
    },
    recordingSettings: {
      enabled: true,
      retentionDays: 20,
      mode: 'EVENT_BASED',
    },
    createdAt: '2023-09-01T08:40:00-03:00',
    lastSeenAt: '2025-12-08T08:45:00-03:00',
  },
  {
    id: 'cam-retail-sul-01',
    name: 'Entrada Ala Sul',
    tenantId: 'tenant-retail-park',
    tenantName: 'Retail Park Brasil',
    siteId: 'site-retail-park-sul',
    siteName: 'Retail Park - Ala Sul',
    status: 'ONLINE',
    mainRtspUrl: 'rtsp://10.30.10.5:554/Streaming/Channels/101',
    subRtspUrl: 'rtsp://10.30.10.5:554/Streaming/Channels/102',
    streamProfiles: [
      {
        id: 'stream-main',
        name: 'Principal',
        resolution: '1920x1080',
        fps: 30,
        bitrateKbps: 3800,
        codec: 'H264',
        usage: { live: true, recording: true, analytics: true },
      },
      {
        id: 'stream-extra-lpr',
        name: 'Stream Extra LPR',
        resolution: '1280x720',
        fps: 20,
        bitrateKbps: 2200,
        codec: 'H265',
        usage: { live: false, recording: true, analytics: true },
      },
    ],
    iaSettings: {
      enabled: true,
      sensitivity: 82,
      analytics: {
        intrusion: true,
        lineCross: true,
        lpr: true,
        peopleCounting: false,
        vehicleCounting: true,
        epi: false,
        loitering: true,
      },
    },
    recordingSettings: {
      enabled: true,
      retentionDays: 25,
      mode: 'CONTINUOUS',
    },
    createdAt: '2022-11-04T10:10:00-03:00',
    lastSeenAt: '2025-12-08T09:02:00-03:00',
  },
  {
    id: 'cam-retail-norte-04',
    name: 'Carga e Descarga',
    tenantId: 'tenant-retail-park',
    tenantName: 'Retail Park Brasil',
    siteId: 'site-retail-park-norte',
    siteName: 'Retail Park - Cluster Norte',
    status: 'OFFLINE',
    mainRtspUrl: 'rtsp://10.30.40.14:554/Streaming/Channels/101',
    subRtspUrl: 'rtsp://10.30.40.14:554/Streaming/Channels/102',
    rtmpUrl: 'rtmp://stream.retailpark.br/offline/carga04',
    streamProfiles: [
      {
        id: 'stream-main',
        name: 'Principal',
        resolution: '1920x1080',
        fps: 25,
        bitrateKbps: 3200,
        codec: 'H264',
        usage: { live: true, recording: true, analytics: false },
      },
    ],
    iaSettings: {
      enabled: false,
      sensitivity: 50,
      analytics: {
        intrusion: false,
        lineCross: false,
        lpr: false,
        peopleCounting: false,
        vehicleCounting: false,
        epi: false,
        loitering: false,
      },
    },
    recordingSettings: {
      enabled: false,
      retentionDays: 15,
      mode: 'CONTINUOUS',
    },
    createdAt: '2023-05-22T14:25:00-03:00',
    lastSeenAt: '2025-12-07T18:30:00-03:00',
  },
  {
    id: 'cam-vida-plena-icu',
    name: 'UTI Adulto - Corredor',
    tenantId: 'tenant-vida-plena',
    tenantName: 'Hospital Vida Plena',
    siteId: 'site-vida-plena-centro',
    siteName: 'Hospital Vida Plena - Centro Cirúrgico',
    status: 'ERROR',
    mainRtspUrl: 'rtsp://172.16.40.2:554/Streaming/Channels/101',
    streamProfiles: [
      {
        id: 'stream-main',
        name: 'Principal',
        resolution: '1920x1080',
        fps: 24,
        bitrateKbps: 3600,
        codec: 'H264',
        usage: { live: true, recording: true, analytics: true },
      },
      {
        id: 'stream-sub',
        name: 'Secundário',
        resolution: '1024x576',
        fps: 15,
        bitrateKbps: 1500,
        codec: 'H265',
        usage: { live: true, recording: false, analytics: true },
      },
    ],
    iaSettings: {
      enabled: false,
      sensitivity: 40,
      analytics: {
        intrusion: false,
        lineCross: false,
        lpr: false,
        peopleCounting: true,
        vehicleCounting: false,
        epi: true,
        loitering: false,
      },
    },
    recordingSettings: {
      enabled: true,
      retentionDays: 20,
      mode: 'EVENT_BASED',
    },
    createdAt: '2021-02-02T09:15:00-03:00',
    lastSeenAt: '2025-12-08T07:52:00-03:00',
  },
  {
    id: 'cam-horizonte-patio',
    name: 'Pátio Principal',
    tenantId: 'tenant-horizonte-edu',
    tenantName: 'Colégio Horizonte',
    siteId: 'site-horizonte-campus',
    siteName: 'Colégio Horizonte - Campus Principal',
    status: 'ONLINE',
    mainRtspUrl: 'rtsp://10.88.1.40:554/Streaming/Channels/101',
    subRtspUrl: 'rtsp://10.88.1.40:554/Streaming/Channels/102',
    streamProfiles: [
      {
        id: 'stream-main',
        name: 'Principal',
        resolution: '1920x1080',
        fps: 30,
        bitrateKbps: 3000,
        codec: 'H264',
        usage: { live: true, recording: true, analytics: true },
      },
      {
        id: 'stream-extra-people',
        name: 'Stream Extra Pessoas',
        resolution: '1280x720',
        fps: 20,
        bitrateKbps: 1500,
        codec: 'H265',
        usage: { live: false, recording: false, analytics: true },
      },
    ],
    iaSettings: {
      enabled: true,
      sensitivity: 70,
      analytics: {
        intrusion: false,
        lineCross: true,
        lpr: false,
        peopleCounting: true,
        vehicleCounting: false,
        epi: false,
        loitering: true,
      },
    },
    recordingSettings: {
      enabled: true,
      retentionDays: 15,
      mode: 'CONTINUOUS',
    },
    createdAt: '2024-04-05T12:00:00-03:00',
    lastSeenAt: '2025-12-08T09:10:00-03:00',
  },
]

function generateCameraId() {
  return `cam-${Math.random().toString(36).slice(2, 6)}-${Date.now().toString(36)}`
}

export function listCamerasMock(options?: {
  tenantId?: string
  siteId?: string
  status?: Camera['status']
}): Promise<Camera[]> {
  let cameras = [...CAMERA_MOCKS]

  if (options?.tenantId) {
    cameras = cameras.filter((camera) => camera.tenantId === options.tenantId)
  }

  if (options?.siteId) {
    cameras = cameras.filter((camera) => camera.siteId === options.siteId)
  }

  if (options?.status) {
    cameras = cameras.filter((camera) => camera.status === options.status)
  }

  return Promise.resolve(cameras)
}

export function getCameraByIdMock(id: string): Promise<Camera | undefined> {
  return Promise.resolve(CAMERA_MOCKS.find((camera) => camera.id === id))
}

export function createCameraMock(data: Omit<Camera, 'id' | 'createdAt' | 'lastSeenAt'>): Promise<Camera> {
  const newCamera: Camera = {
    ...data,
    id: generateCameraId(),
    createdAt: new Date().toISOString(),
    lastSeenAt: new Date().toISOString(),
  }

  CAMERA_MOCKS = [newCamera, ...CAMERA_MOCKS]
  return Promise.resolve(newCamera)
}

export function updateCameraMock(id: string, data: Partial<Camera>): Promise<Camera | undefined> {
  const index = CAMERA_MOCKS.findIndex((camera) => camera.id === id)

  if (index === -1) {
    return Promise.resolve(undefined)
  }

  const updatedCamera: Camera = {
    ...CAMERA_MOCKS[index],
    ...data,
    lastSeenAt: data.lastSeenAt || CAMERA_MOCKS[index].lastSeenAt,
  }

  CAMERA_MOCKS[index] = updatedCamera
  return Promise.resolve(updatedCamera)
}
