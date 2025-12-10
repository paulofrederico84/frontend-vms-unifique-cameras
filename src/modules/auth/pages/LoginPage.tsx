import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/modules/auth/context/AuthContext'
import { SystemRole, type UserSummary } from '@/modules/shared/types/auth'

const mockUsers: Record<string, UserSummary> = {
  admin_master: {
    id: '1',
    name: 'Admin Master',
    email: 'admin.master@unifique.com',
    role: SystemRole.ADMIN_MASTER,
  },
  admin: {
    id: '2',
    name: 'Admin Operações',
    email: 'admin@unifique.com',
    role: SystemRole.ADMIN,
  },
  technician: {
    id: '3',
    name: 'Técnico João',
    email: 'tecnico.joao@unifique.com',
    role: SystemRole.TECHNICIAN,
    tenantId: 'tenant-unifique-hq',
    tenantName: 'Unifique Headquarters',
  },
  client_master: {
    id: '4',
    name: 'Cliente Master',
    email: 'cliente.master@cliente.com',
    role: SystemRole.CLIENT_MASTER,
    tenantId: 'tenant-retail-park',
    tenantName: 'Retail Park Brasil',
  },
  client_manager: {
    id: '5',
    name: 'Gerente Operações',
    email: 'gerente@cliente.com',
    role: SystemRole.CLIENT_MANAGER,
    tenantId: 'tenant-retail-park',
    tenantName: 'Retail Park Brasil',
  },
  client_viewer: {
    id: '6',
    name: 'Visualizador Segurança',
    email: 'viewer@cliente.com',
    role: SystemRole.CLIENT_VIEWER,
    tenantId: 'tenant-vida-plena',
    tenantName: 'Hospital Vida Plena',
  },
}

const personaOptions = [
  { value: 'admin_master', label: 'Admin Master' },
  { value: 'admin', label: 'Admin' },
  { value: 'technician', label: 'Técnico' },
  { value: 'client_master', label: 'Cliente Master' },
  { value: 'client_manager', label: 'Gerente' },
  { value: 'client_viewer', label: 'Visualizador' },
]

export function LoginPage() {
  const navigate = useNavigate()
  const { loginAs, isAuthenticated } = useAuth()
  const [selectedPersona, setSelectedPersona] = useState<string>('admin_master')
  const [email, setEmail] = useState(mockUsers.admin_master.email)

  const selectedUser = useMemo(() => mockUsers[selectedPersona], [selectedPersona])

  useEffect(() => {
    setEmail(selectedUser.email)
  }, [selectedUser])

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextUser = {
      ...selectedUser,
      email: email.trim() || selectedUser.email,
    }
    loginAs(nextUser)
    // TODO: redirecionar técnicos e clientes para rotas próprias quando estiverem prontos
    navigate('/admin/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-pale px-4 py-8">
      <Card className="w-full max-w-lg border border-primary/5 shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">VMS Unifique</p>
          <CardTitle className="text-2xl text-brand-deep">Selecione um perfil de teste</CardTitle>
          <CardDescription>Autenticação real virá depois. Escolha uma persona para navegar pelo protótipo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Perfil</label>
              <Select value={selectedPersona} onValueChange={setSelectedPersona}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o perfil" />
                </SelectTrigger>
                <SelectContent>
                  {personaOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">E-mail</label>
              <Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="off" />
              <p className="text-xs text-muted-foreground">
                Use qualquer e-mail para testar. O valor é salvo apenas localmente (localStorage).
              </p>
            </div>

            <Button type="submit" className="w-full">
              Entrar
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Perfis fora do núcleo Admin ainda redirecionam para o dashboard central até que as áreas dedicadas sejam ativadas.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
