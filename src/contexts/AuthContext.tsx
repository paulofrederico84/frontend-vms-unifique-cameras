import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'

import { getRedirectPathByRole } from '@/lib/auth/getRedirectPathByRole'
import { SystemRole } from '@/modules/shared/types/auth'
import type { User } from '@/types/user.types'

declare global {
  interface Window {
    __VMS_DEV_FLAGS__?: Record<string, unknown>
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const STORAGE_KEYS = {
  user: 'vms_user',
  accessToken: 'vms_access_token',
  refreshToken: 'vms_refresh_token',
  sessionVersion: 'vms_session_version',
}

const LOCAL_PREFIXES = ['vms_', 'tenant_', 'feature_flag_', 'devtool_']

const ROLES_REQUIRING_SCOPE = new Set<SystemRole>([
  SystemRole.CLIENT_MASTER,
  SystemRole.CLIENT_MANAGER,
  SystemRole.CLIENT_VIEWER,
])

type LogoutReason = 'USER_TRIGGERED' | 'INVALID_SESSION' | 'TEMP_ACCESS_EXPIRED' | 'SESSION_INVALIDATED'

const DEFAULT_PERMISSIONS: User['permissions'] = {
  canViewRecordings: true,
  canExportVideos: true,
  canConfigureAI: true,
  canConfigureStreamProfiles: true,
  canManageUsers: true,
  canManageCameras: true,
  canAccessDashboard: true,
  canViewLive: true,
  maxStreamQuality: '4K',
  allowedAIModules: ['LPR', 'INTRUSION', 'LINE_CROSSING', 'PEOPLE_COUNTING'],
}

const createSessionVersion = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `session_${Date.now()}`

const createMockUser = (email: string): User => {
  const timestamp = new Date().toISOString()
  return {
    id: 'usr-admin-master',
    name: 'Admin Master',
    email,
    role: SystemRole.ADMIN_MASTER,
    status: 'ACTIVE',
    tenantId: 'master',
    tenantName: 'Unifique',
    permissions: DEFAULT_PERMISSIONS,
    lastLoginAt: timestamp,
    sessionVersion: createSessionVersion(),
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

const isValidRole = (role: unknown): role is SystemRole =>
  typeof role === 'string' && Object.values(SystemRole).includes(role as SystemRole)

const hasValidScope = (user: Partial<User>) => {
  if (!user.role || !ROLES_REQUIRING_SCOPE.has(user.role)) {
    return true
  }

  if (!user.scope || !user.scope.type) {
    return false
  }

  const tenants = user.scope.tenants ?? []
  const locations = user.scope.locations ?? []
  const cameras = user.scope.cameras ?? []

  return tenants.length > 0 || locations.length > 0 || cameras.length > 0
}

const hasValidTemporaryAccess = (user: Partial<User>) => {
  if (user.role !== SystemRole.TECHNICIAN) {
    return true
  }

  const expiresAt = user.temporaryAccess?.expiresAt

  if (!expiresAt) {
    return false
  }

  return Date.parse(expiresAt) > Date.now()
}

const sanitizeUserPayload = (raw: unknown): User | null => {
  if (!raw || typeof raw !== 'object') {
    return null
  }

  const parsed = raw as User

  if (!isValidRole(parsed.role)) {
    return null
  }

  if (!hasValidScope(parsed)) {
    return null
  }

  if (!hasValidTemporaryAccess(parsed)) {
    return null
  }

  return {
    ...parsed,
    permissions: parsed.permissions ?? DEFAULT_PERMISSIONS,
    lastLoginAt: parsed.lastLoginAt ?? parsed.createdAt,
  }
}

const purgeSensitiveStorage = () => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return
  }

  const keysToRemove: string[] = []
  for (let idx = 0; idx < localStorage.length; idx += 1) {
    const key = localStorage.key(idx)
    if (!key) continue
    if (LOCAL_PREFIXES.some((prefix) => key.startsWith(prefix))) {
      keysToRemove.push(key)
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key))
  sessionStorage.clear()

  if (typeof document !== 'undefined') {
    document.cookie
      .split(';')
      .map((cookie) => cookie.split('=')[0]?.trim())
      .filter(Boolean)
      .forEach((cookieName) => {
        document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`
      })
  }

  if (typeof window !== 'undefined' && window.__VMS_DEV_FLAGS__) {
    delete window.__VMS_DEV_FLAGS__
  }
}

const persistSessionVersion = (value: string | null) => {
  if (typeof localStorage === 'undefined') {
    return
  }

  if (value) {
    localStorage.setItem(STORAGE_KEYS.sessionVersion, value)
  } else {
    localStorage.removeItem(STORAGE_KEYS.sessionVersion)
  }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const clearAuthState = useCallback(
    (reason: LogoutReason, options?: { redirect?: boolean }) => {
      purgeSensitiveStorage()
      persistSessionVersion(null)
      setUser(null)

      if (options?.redirect ?? true) {
        navigate('/login', { replace: true, state: { reason } })
      }
    },
    [navigate],
  )

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.user)
        const token = localStorage.getItem(STORAGE_KEYS.accessToken)

        if (!storedUser || !token) {
          purgeSensitiveStorage()
          return
        }

        const parsed = sanitizeUserPayload(JSON.parse(storedUser))

        if (!parsed) {
          clearAuthState('INVALID_SESSION')
          return
        }

        setUser(parsed)
        const storedSessionVersion = localStorage.getItem(STORAGE_KEYS.sessionVersion)
        if (!storedSessionVersion) {
          persistSessionVersion(parsed.sessionVersion ?? createSessionVersion())
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        clearAuthState('INVALID_SESSION')
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [clearAuthState])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEYS.sessionVersion) {
        return
      }

      if (event.newValue === null) {
        clearAuthState('SESSION_INVALIDATED')
        return
      }

      if (event.oldValue && event.newValue !== event.oldValue) {
        clearAuthState('SESSION_INVALIDATED')
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [clearAuthState])

  const login = useCallback(
    async (email: string, _password: string) => {
      setIsLoading(true)
      try {
        const mockUser = createMockUser(email)
        const sessionVersion = mockUser.sessionVersion ?? createSessionVersion()

        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(mockUser))
        localStorage.setItem(STORAGE_KEYS.accessToken, `mock_access_token_${sessionVersion}`)
        localStorage.setItem(STORAGE_KEYS.refreshToken, `mock_refresh_token_${sessionVersion}`)
        persistSessionVersion(sessionVersion)

        setUser(mockUser)

        const redirectPath = getRedirectPathByRole(mockUser.role)
        navigate(redirectPath, { replace: true })
      } catch (error) {
        console.error('Erro no login:', error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [navigate],
  )

  const logout = useCallback(async () => {
    setIsLoading(true)
    try {
      clearAuthState('USER_TRIGGERED')
    } catch (error) {
      console.error('Erro no logout:', error)
      clearAuthState('INVALID_SESSION')
    } finally {
      setIsLoading(false)
    }
  }, [clearAuthState])

  const updateUser = useCallback(
    (updatedUser: User) => {
      const sanitized = sanitizeUserPayload(updatedUser)
      if (!sanitized) {
        clearAuthState('INVALID_SESSION')
        return
      }

      setUser(sanitized)
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(sanitized))
    },
    [clearAuthState],
  )

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      updateUser,
    }),
    [user, isLoading, login, logout, updateUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
