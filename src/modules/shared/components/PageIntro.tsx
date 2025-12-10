import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type PageIntroProps = {
  title: string
  description: string
  actions?: ReactNode
  className?: string
}

export function PageIntro({ title, description, actions, className }: PageIntroProps) {
  return (
    <div className={cn('flex flex-wrap items-start justify-between gap-4', className)}>
      <div>
        <h1 className="text-2xl font-semibold text-brand-deep">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{description}</p>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}
