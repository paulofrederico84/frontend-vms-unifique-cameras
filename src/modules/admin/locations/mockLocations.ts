export type AdminLocation = {
  id: string
  tenantId: string
  tenantName: string
  name: string
  cameras: number
  onlineCameras: number
  offlineCameras: number
  unstableCameras: number
  maintenanceCameras: number
  createdAt: string
}
export function buildLocationKpiStats(locations: AdminLocation[]) {
  const totalLocations = locations.length
  const totalCameras = locations.reduce((total, location) => total + location.cameras, 0)
  const onlineCameras = locations.reduce((total, location) => total + location.onlineCameras, 0)
  const offlineCameras = locations.reduce((total, location) => total + location.offlineCameras, 0)
  const unstableCameras = locations.reduce((total, location) => total + location.unstableCameras, 0)
  const maintenanceCameras = locations.reduce((total, location) => total + location.maintenanceCameras, 0)
  const healthPercentage = totalCameras === 0 ? 0 : Math.round((onlineCameras / totalCameras) * 100)

  return {
    totalLocations,
    totalCameras,
    onlineCameras,
    offlineCameras,
    unstableCameras,
    maintenanceCameras,
    healthPercentage,
  }
}
