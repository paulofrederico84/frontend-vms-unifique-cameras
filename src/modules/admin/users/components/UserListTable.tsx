import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { AdminUserRow } from '@/modules/admin/users/mockUsers'

import { UserRoleBadge } from './UserRoleBadge'
import { UserStatusBadge } from './UserStatusBadge'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
const lastAccessFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const formatLastAccess = (value?: string) => {
  if (!value) return '—'
  const normalized = value.replace(' ', 'T')
  const date = new Date(normalized)
  if (Number.isNaN(date.getTime())) return value
  return lastAccessFormatter.format(date)
}

export type UserListTableProps = {
  users: AdminUserRow[]
  onSelectUser: (user: AdminUserRow) => void
}

export function UserListTable({ users, onSelectUser }: UserListTableProps) {
  if (users.length === 0) {
    return (
      <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
        <CardContent className="py-16 text-center text-sm text-slate-500">
          Nenhum usuário encontrado com os filtros atuais.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 bg-white shadow-sm ring-1 ring-slate-100">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <th className="px-5 py-3 text-left">Usuário</th>
                <th className="px-5 py-3 text-left">Papel</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Cliente</th>
                <th className="px-5 py-3 text-left">Criado em</th>
                <th className="px-5 py-3 text-left">Último acesso</th>
                <th className="px-5 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="cursor-pointer border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                  onClick={() => onSelectUser(user)}
                >
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{user.name}</span>
                      <span className="text-xs text-slate-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <UserRoleBadge role={user.role} />
                  </td>
                  <td className="px-5 py-4">
                    <UserStatusBadge status={user.status} />
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">{user.tenantName}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{dateFormatter.format(new Date(user.createdAt))}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{formatLastAccess(user.lastAccessAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1 rounded-full"
                        onClick={(event) => {
                          event.stopPropagation()
                          onSelectUser(user)
                        }}
                      >
                        Detalhes <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
