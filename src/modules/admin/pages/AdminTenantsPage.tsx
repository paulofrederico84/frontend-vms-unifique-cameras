import { useCallback, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { TenantDetailsDrawer } from '@/modules/admin/tenants/components/TenantDetailsDrawer'
import { TenantFiltersBar } from '@/modules/admin/tenants/components/TenantFiltersBar'
import { TenantKpisHeader } from '@/modules/admin/tenants/components/TenantKpisHeader'
import { TenantListTable } from '@/modules/admin/tenants/components/TenantListTable'
import type { TenantPlan, TenantRecord, TenantStatus } from '@/modules/admin/tenants/mockTenants'
import { useDevData } from '@/hooks/useDevData'
import { useAuth } from '@/contexts/AuthContext'
import { SystemRole } from '@/modules/shared/types/auth'

function buildTenantStats(tenants: TenantRecord[]) {
  const totalTenants = tenants.length
  const activeTenants = tenants.filter((tenant) => tenant.status === 'active').length
  const suspendedTenants = tenants.filter((tenant) => tenant.status === 'suspended').length
  const totalCameras = tenants.reduce((total, tenant) => total + tenant.cameras, 0)
  const averageCameras = totalTenants === 0 ? 0 : totalCameras / totalTenants

  return { totalTenants, activeTenants, suspendedTenants, totalCameras, averageCameras }
}

export function AdminTenantsPage() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<TenantStatus | 'all'>('all')
  const [planFilter, setPlanFilter] = useState<TenantPlan | 'all'>('all')
  const [selectedTenant, setSelectedTenant] = useState<TenantRecord | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const loadTenantsFixtures = useCallback(async () => {
    const module = await import('@/fixtures')
    return module.mockTenants
  }, [])

  const devTenants = useDevData<TenantRecord>(loadTenantsFixtures)

  const tenants = import.meta.env.DEV ? devTenants : []

  const kpiStats = useMemo(() => buildTenantStats(tenants), [tenants])

  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant) => {
      const matchesSearch =
        search.trim().length === 0 ||
        tenant.name.toLowerCase().includes(search.toLowerCase()) ||
        tenant.document.toLowerCase().includes(search.toLowerCase()) ||
        tenant.id.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = statusFilter === 'all' ? true : tenant.status === statusFilter
      const matchesPlan = planFilter === 'all' ? true : tenant.plan === planFilter

      return matchesSearch && matchesStatus && matchesPlan
    })
  }, [planFilter, search, statusFilter, tenants])

  if (!user) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white/70 p-6 text-sm text-slate-500">
        Carregando contexto do usuário...
      </div>
    )
  }

  const canManageTenants = user.role === SystemRole.ADMIN_MASTER || user.role === SystemRole.ADMIN

  if (!canManageTenants) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 text-sm text-slate-500">
        Apenas administradores centrais podem acessar a gestão de tenants.
      </div>
    )
  }

  const handleSelectTenant = (tenant: TenantRecord) => {
    setSelectedTenant(tenant)
    setIsDetailsOpen(true)
  }

  const handleDrawerOpenChange = (open: boolean) => {
    setIsDetailsOpen(open)
    if (!open) {
      setSelectedTenant(null)
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Clientes / Inquilinos</p>
          <h1 className="mt-1 text-3xl font-semibold text-slate-900">Gestão de tenants</h1>
          <p className="text-sm text-slate-500">Gestão dos tenants monitorados pela Unifique.</p>
        </div>
        <Button type="button" className="h-11 rounded-2xl bg-slate-900 text-white" disabled>
          Novo cliente
        </Button>
      </header>

      <TenantKpisHeader stats={kpiStats} />

      <TenantFiltersBar
        search={search}
        status={statusFilter}
        plan={planFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onPlanChange={setPlanFilter}
        onResetFilters={() => {
          setSearch('')
          setStatusFilter('all')
          setPlanFilter('all')
        }}
      />

      <TenantListTable
        tenants={filteredTenants}
        onSelectTenant={handleSelectTenant}
        onOpenPortal={(tenant) => console.info(`Abrir portal de ${tenant.name}`)}
        onSuspendTenant={(tenant) => console.info(`Solicitar suspensão de ${tenant.name}`)}
      />

      <TenantDetailsDrawer tenant={selectedTenant} open={isDetailsOpen} onOpenChange={handleDrawerOpenChange} />
    </div>
  )
}
