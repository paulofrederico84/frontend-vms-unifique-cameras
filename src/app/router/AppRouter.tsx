import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'

import { AdminLayout } from '@/app/layout/AdminLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AuthProvider } from '@/contexts/AuthContext'
import { LoginPage } from '@/modules/auth/pages/LoginPage'
import { AdminDashboardPage } from '@/modules/admin/pages/AdminDashboardPage'
import { AdminTenantsPage } from '@/modules/admin/pages/AdminTenantsPage'
import { AdminUsersPage } from '@/modules/admin/pages/AdminUsersPage'
import { AdminAccessLevelsPage } from '@/modules/admin/pages/AdminAccessLevelsPage'
import { AdminLocationsPage } from '@/modules/admin/pages/AdminLocationsPage'
import { AdminAiAlertsPage } from '@/modules/admin/pages/AdminAiAlertsPage'
import { AdminReportsPage } from '@/modules/admin/pages/AdminReportsPage'
import { AdminSettingsPage } from '@/modules/admin/pages/AdminSettingsPage'
import { AdminAuditPage } from '@/modules/admin/pages/AdminAuditPage'
import { SystemRole } from '@/modules/shared/types/auth'

function AppProviders() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export const appRouter = createBrowserRouter([
  {
    element: <AppProviders />,
    children: [
      {
        path: '/',
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute allowedRoles={[SystemRole.ADMIN_MASTER, SystemRole.ADMIN, SystemRole.CLIENT_MASTER]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboardPage /> },
          { path: 'tenants', element: <AdminTenantsPage /> },
          { path: 'users', element: <AdminUsersPage /> },
          {
            path: 'access-levels',
            element: (
              <ProtectedRoute allowedRoles={[SystemRole.ADMIN_MASTER]}>
                <AdminAccessLevelsPage />
              </ProtectedRoute>
            ),
          },
          { path: 'cameras', element: <AdminLocationsPage /> },
          { path: 'ai-alerts', element: <AdminAiAlertsPage /> },
          {
            path: 'audit',
            element: (
              <ProtectedRoute allowedRoles={[SystemRole.ADMIN_MASTER]}>
                <AdminAuditPage />
              </ProtectedRoute>
            ),
          },
          { path: 'analytics-notifications', element: <Navigate to="ai-alerts" replace /> },
          { path: 'reports', element: <AdminReportsPage /> },
          { path: 'settings', element: <AdminSettingsPage /> },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/admin/dashboard" replace />,
      },
    ],
  },
  // TODO: adicionar rotas protegidas específicas para técnicos (/technician/*) e clientes finais (/client/*)
])
