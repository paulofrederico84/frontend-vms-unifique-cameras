import { RouterProvider } from 'react-router-dom'

import { appRouter } from '@/app/router/AppRouter'
import { AuthProvider } from '@/modules/auth/context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  )
}

export default App
