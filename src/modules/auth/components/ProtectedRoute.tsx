import type { ReactNode } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/modules/auth/context/AuthContext'
import { UserRole } from '@/modules/shared/types/auth'

export type ProtectedRouteProps = {
  children: ReactNode
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (!isAuthenticated || !user) {
    // TODO: usar location.state.from para redirecionar automaticamente após autenticar
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-brand-pale px-4 text-center">
        <div className="max-w-lg space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-brand-deep/70">Acesso restrito</p>
          <h1 className="text-2xl font-semibold text-brand-deep">Você não tem permissão para acessar esta área.</h1>
          <p className="text-sm text-muted-foreground">
            Este módulo é exclusivo para {allowedRoles.map((role) => role.replace(/_/g, ' ')).join(', ')}. Faça login com um usuário
            autorizado ou retorne para o início.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Voltar
          </Button>
          <Button onClick={() => navigate('/login')}>
            Ir para o login
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
