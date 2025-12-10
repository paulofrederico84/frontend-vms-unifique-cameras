import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { TenantPlan, TenantStatus } from '@/modules/admin/tenants/mockTenants'

export type TenantFiltersBarProps = {
  search: string
  status: TenantStatus | 'all'
  plan: TenantPlan | 'all'
  onSearchChange: (value: string) => void
  onStatusChange: (value: TenantStatus | 'all') => void
  onPlanChange: (value: TenantPlan | 'all') => void
  onResetFilters: () => void
}

const STATUS_OPTIONS: Array<{ value: TenantStatus | 'all'; label: string }> = [
  { value: 'all', label: 'Todos os status' },
  { value: 'active', label: 'Ativo' },
  { value: 'suspended', label: 'Suspenso' },
  { value: 'inactive', label: 'Inativo' },
  { value: 'trial', label: 'Trial' },
]

const PLAN_OPTIONS: Array<{ value: TenantPlan | 'all'; label: string }> = [
  { value: 'all', label: 'Todos os planos' },
  { value: 'basic', label: 'Basic' },
  { value: 'standard', label: 'Standard' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'enterprise', label: 'Enterprise' },
]

export function TenantFiltersBar({
  search,
  status,
  plan,
  onSearchChange,
  onStatusChange,
  onPlanChange,
  onResetFilters,
}: TenantFiltersBarProps) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por nome, documento ou ID"
            className="h-11 rounded-2xl border-slate-200 pl-10"
          />
        </div>
        <Select value={status} onValueChange={(value) => onStatusChange(value as TenantStatus | 'all')}>
          <SelectTrigger className="h-11 w-full rounded-2xl border-slate-200 md:w-[220px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={plan} onValueChange={(value) => onPlanChange(value as TenantPlan | 'all')}>
          <SelectTrigger className="h-11 w-full rounded-2xl border-slate-200 md:w-[220px]">
            <SelectValue placeholder="Plano" />
          </SelectTrigger>
          <SelectContent>
            {PLAN_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="button" variant="ghost" className="h-11 rounded-2xl border border-slate-200 text-slate-600" onClick={onResetFilters}>
          Limpar filtros
        </Button>
      </div>
    </div>
  )
}
