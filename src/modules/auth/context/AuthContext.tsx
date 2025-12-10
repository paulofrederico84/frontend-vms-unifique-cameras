import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

import { SystemRole, type UserSummary } from '@/modules/shared/types/auth'

const MOCK_ADMIN_USER: UserSummary = {
  id: '1',
  name: 'Admin Master Teste',
  email: 'admin@teste.com',
  role: SystemRole.ADMIN_MASTER,
}

type AuthState = {
  currentUser: UserSummary | null
  isAuthenticated: boolean
}

type AuthContextValue = {
  user: UserSummary | null
  isAuthenticated: boolean
  loginAs: (user: UserSummary) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ currentUser: MOCK_ADMIN_USER, isAuthenticated: true })

  const loginAs = (nextUser: UserSummary) => {
    setState({ currentUser: nextUser, isAuthenticated: true })
  }

  const logout = () => {
    setState({ currentUser: MOCK_ADMIN_USER, isAuthenticated: true })
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user: state.currentUser,
      isAuthenticated: state.isAuthenticated,
      loginAs,
      logout,
    }),
    [state.isAuthenticated, state.currentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
