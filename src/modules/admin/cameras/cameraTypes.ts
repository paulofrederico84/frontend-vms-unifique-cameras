export type CameraStatus = 'ONLINE' | 'OFFLINE' | 'ERROR' | 'MAINTENANCE'

export type CameraStreamProfile = {
  id: string
  name: string
  resolution: string
  fps: number
  bitrateKbps: number
  codec: 'H264' | 'H265'
  usage: {
    live: boolean
    recording: boolean
    analytics: boolean
  }
}

export type CameraIASettings = {
  enabled: boolean
  sensitivity: number
  analytics: {
    intrusion: boolean
    lineCross: boolean
    lpr: boolean
    peopleCounting: boolean
    vehicleCounting: boolean
    epi: boolean
    loitering: boolean
  }
}

export type CameraRecordingSettings = {
  enabled: boolean
  retentionDays: number
  mode: 'CONTINUOUS' | 'EVENT_BASED'
}

export type Camera = {
  id: string
  name: string
  tenantId: string
  tenantName: string
  siteId: string
  siteName: string
  status: CameraStatus
  mainRtspUrl: string
  subRtspUrl?: string
  rtmpUrl?: string
  streamProfiles: CameraStreamProfile[]
  iaSettings: CameraIASettings
  recordingSettings: CameraRecordingSettings
  createdAt: string
  lastSeenAt?: string
}
