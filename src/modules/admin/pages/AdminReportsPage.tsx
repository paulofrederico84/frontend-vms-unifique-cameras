import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageIntro } from '@/modules/shared/components/PageIntro'
import { AdminPlaceholder } from '@/modules/admin/components/AdminPlaceholder'

export function AdminReportsPage() {
  return (
    <section className="space-y-6">
      <PageIntro
        title="Relatórios e auditoria"
        description="Gere relatórios operacionais, exporte planos de ação e consulte o histórico completo de auditoria por usuário."
        actions={<Button>Agendar envio semanal</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((reportId) => (
          <Card key={reportId}>
            <CardHeader>
              <CardTitle>Conjunto #{reportId}</CardTitle>
              <CardDescription>Modelo pré-definido com KPIs críticos.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Última geração: há 2 dias</p>
                <p className="text-sm text-muted-foreground">Formato: PDF + CSV</p>
              </div>
              <Button variant="outline">Exportar</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <AdminPlaceholder title="Auditoria detalhada" description="Linha do tempo com cada ação auditável do portal." />
    </section>
  )
}
