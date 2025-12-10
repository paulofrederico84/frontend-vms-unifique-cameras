import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PageIntro } from '@/modules/shared/components/PageIntro'

export function AdminSettingsPage() {
  return (
    <section className="space-y-6">
      <PageIntro
        title="Configurações do sistema"
        description="Centralize parâmetros globais, integrações e preferências de branding para tenants."
        actions={<Button variant="outline">Publicar alterações</Button>}
      />

      <Card>
        <CardHeader>
          <CardTitle>Marca e identidade</CardTitle>
          <CardDescription>Controle os elementos compartilhados entre tenants e squads.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Nome do produto" defaultValue="VMS Unifique" />
          <Input placeholder="URL do portal" defaultValue="https://portal.unifique.com.br" />
          <div className="text-sm text-muted-foreground">
            Upload de logotipo e tema escuro serão adicionados na próxima etapa.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
          <CardDescription>Conexões com APIs externas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {['API NOC', 'Plataforma de tickets', 'Storage cloud'].map((integration) => (
            <div key={integration} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm">
              <div>
                <p className="font-semibold text-brand-deep">{integration}</p>
                <p className="text-muted-foreground">Em breve exibiremos status em tempo real.</p>
              </div>
              <Button size="sm" variant="ghost">
                Configurar
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
