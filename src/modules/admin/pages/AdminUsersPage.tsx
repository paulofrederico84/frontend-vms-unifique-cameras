import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PageIntro } from '@/modules/shared/components/PageIntro'
import { AdminPlaceholder } from '@/modules/admin/components/AdminPlaceholder'

const mockUsers = [
  { name: 'Beatriz Andrade', email: 'beatriz@unifique.com.br', role: 'ADMIN_MASTER' },
  { name: 'Juliano Ribeiro', email: 'juliano@tenant.com', role: 'CLIENT_MASTER' },
  { name: 'Equipe Campo Floripa', email: 'campo.fl@unifique.com.br', role: 'TECHNICIAN' },
]

export function AdminUsersPage() {
  return (
    <section className="space-y-6">
      <PageIntro
        title="Usuários e permissões"
        description="Defina personas, convide novos administradores e acompanhe auditorias de acesso em tempo real."
        actions={
          <div className="flex gap-2">
            <Button variant="outline">Importar lista</Button>
            <Button>Convidar usuário</Button>
          </div>
        }
      />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Equipe ativa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Input className="max-w-sm" placeholder="Busque por nome, e-mail ou tenant" />
            <Button variant="outline">Filtrar por role</Button>
          </div>
          <div className="divide-y rounded-xl border">
            {mockUsers.map((user) => (
              <div key={user.email} className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 text-sm">
                <div>
                  <p className="font-semibold text-brand-deep">{user.name}</p>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <span className="rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-semibold text-brand-secondary">
                  {user.role}
                </span>
                <Button size="sm" variant="ghost">
                  Gerenciar acesso
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AdminPlaceholder title="Fluxos de aprovação" description="Configure etapas obrigatórias para mudanças sensíveis." />
    </section>
  )
}
