import { useEffect, useMemo, useState } from 'react'

/**
 * Hook para carregar dados de desenvolvimento (fixtures)
 * Em produção, sempre retorna array vazio
 */
export function useDevData<T>(fixtureLoader: () => Promise<T[]> | T[]): T[] {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<Error | null>(null)

  const isProd = useMemo(() => import.meta.env.PROD, [])

  useEffect(() => {
    if (isProd) {
      if (error === null) {
        console.warn('useDevData chamado em produção - retornando array vazio')
        setError(new Error('Fixtures indisponíveis em produção'))
      }
      setData([])
      return
    }

    let isMounted = true

    const load = async () => {
      try {
        const result = await fixtureLoader()
        if (isMounted) {
          setData(result)
        }
      } catch (err) {
        console.error('Erro ao carregar fixture:', err)
        if (isMounted) {
          setData([])
        }
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [fixtureLoader, isProd, error])

  return data
}
