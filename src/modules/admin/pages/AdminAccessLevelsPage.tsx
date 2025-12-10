import { AlertTriangle, FileText, ShieldCheck } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageIntro } from '@/modules/shared/components/PageIntro'
import { RoleMatrixTable } from '@/modules/admin/access/RoleMatrixTable'

export function AdminAccessLevelsPage() {
  return (
    <section className="space-y-6">
      <PageIntro
        title="Níveis de acesso & permissões"
        description="Consulta consolidada dos papéis oficiais da plataforma. Somente leitura, alinhado à LGPD."
      />

      <Tabs defaultValue="matrix" className="space-y-4">
        <TabsList className="grid w-full max-w-lg grid-cols-2 rounded-2xl bg-muted/60 p-1">
          <TabsTrigger value="matrix" className="rounded-xl text-sm font-semibold">
            Matriz de acesso
          </TabsTrigger>
          <TabsTrigger value="docs" className="rounded-xl text-sm font-semibold">
            Documentação
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="space-y-4">
          <Card className="border-emerald-100 bg-emerald-50/80">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm text-emerald-900">
                <ShieldCheck className="h-4 w-4" /> Somente Admin Master
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-emerald-900/80">
              Visualização autorizada apenas para Admin Master. Conteúdo restrito a status operacional e permissões — nenhum fluxo de vídeo é exibido aqui.
            </CardContent>
          </Card>

          <RoleMatrixTable />
        </TabsContent>

        <TabsContent value="docs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-brand-primary" /> Diretrizes e roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Este módulo consolida as permissões padrão da plataforma. Em breve, o Admin Master poderá versionar políticas, exportar a matriz para compliance e solicitar exceções temporárias para clientes estratégicos.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Sem controles de edição neste release.</li>
                <li>Integração futura com fluxo de aprovação LGPD / SOC.</li>
                <li>Logs de auditoria ficarão disponíveis na aba Relatórios.</li>
              </ul>
              <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-amber-900">
                <AlertTriangle className="h-4 w-4" /> Customizações só podem ser aplicadas por change request formal.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  )
}
