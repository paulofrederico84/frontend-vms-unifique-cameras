import { useEffect, useMemo, useState } from 'react'
import { Loader2, Plus, Search, SlidersHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TenantDetailsDrawer } from './TenantDetailsDrawer'
import { TenantForm, type TenantFormData } from '@/modules/admin/tenants/TenantForm'
import { createTenantMock, listTenantsMock } from '@/modules/admin/tenants/tenantMocks'
import type { Tenant, TenantStatus } from '@/modules/admin/tenants/tenantTypes'

const statusLabelMap: Record<TenantStatus, string> = {
  ACTIVE: 'Ativo',
  SUSPENDED: 'Suspenso',
  INACTIVE: 'Inativo',
}

const statusBadgeClass: Record<TenantStatus, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  SUSPENDED: 'bg-amber-100 text-amber-700 border border-amber-200',
  INACTIVE: 'bg-slate-100 text-slate-500 border border-slate-200',
}

export function TenantList() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | TenantStatus>('ALL')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const loadTenants = async (options: { showSpinner?: boolean } = {}) => {
    if (options.showSpinner ?? true) {
      setIsLoading(true)
    }
    const data = await listTenantsMock()
    setTenants(data)
    setIsLoading(false)
  }

  useEffect(() => {
    let isMounted = true

    listTenantsMock()
      .then((data) => {
        if (!isMounted) {
          return
        }
        setTenants(data)
        setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant) => {
      const matchesSearch =
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.document.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === 'ALL' ? true : tenant.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [tenants, searchTerm, statusFilter])

  const handleCreateTenant = async (data: TenantFormData) => {
    await createTenantMock(data)
    await loadTenants()
    setIsCreateModalOpen(false)
  }

  const handleOpenDetails = (tenantId: string) => {
    setSelectedTenantId(tenantId)
    setIsDetailsOpen(true)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Buscar por nome ou documento"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as 'ALL' | TenantStatus)}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os status</SelectItem>
              <SelectItem value="ACTIVE">Ativos</SelectItem>
              <SelectItem value="SUSPENDED">Suspensos</SelectItem>
              <SelectItem value="INACTIVE">Inativos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2 self-start">
            <Plus className="h-4 w-4" /> Novo cliente
          </Button>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Novo cliente</DialogTitle>
            </DialogHeader>
            <TenantForm mode="create" onSubmit={handleCreateTenant} onCancel={() => setIsCreateModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-0 bg-white shadow-sm ring-1 ring-muted/30">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Carregando clientes...
            </div>
          ) : filteredTenants.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Nenhum tenant encontrado com os filtros atuais.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-3">Cliente</th>
                    <th className="px-4 py-3">Plano</th>
                    <th className="px-4 py-3">Câmeras</th>
                    <th className="px-4 py-3">Sites</th>
                    <th className="px-4 py-3">Usuários</th>
                    <th className="px-4 py-3">Criado em</th>
                    <th className="px-4 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTenants.map((tenant) => (
                    <tr key={tenant.id} className="border-b last:border-0">
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">{tenant.name}</span>
                          <span className="text-xs text-muted-foreground">{tenant.document}</span>
                        </div>
                        <div className="mt-2 inline-flex items-center gap-2 text-xs">
                          <span className={`rounded-full px-2 py-0.5 ${statusBadgeClass[tenant.status]}`}>
                            {statusLabelMap[tenant.status]}
                          </span>
                          <span className="text-muted-foreground">Contato: {tenant.contactName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold">
                          {tenant.plan}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-foreground">{tenant.camerasCount}</p>
                        <p className="text-xs text-muted-foreground">câmeras</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-foreground">{tenant.sitesCount}</p>
                        <p className="text-xs text-muted-foreground">sites</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-foreground">{tenant.activeUsersCount}</p>
                        <p className="text-xs text-muted-foreground">usuários</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{formatDate(tenant.createdAt)}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="gap-2" onClick={() => handleOpenDetails(tenant.id)}>
                            <SlidersHorizontal className="h-4 w-4" /> Detalhes
                          </Button>
                          <Button variant="ghost" size="sm" disabled>
                            Portal
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <TenantDetailsDrawer
        tenantId={selectedTenantId || ''}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onTenantUpdated={loadTenants}
      />
    </div>
  )
}
