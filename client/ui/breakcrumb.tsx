'use client'

import type { FC } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface ComponentProps {}

export const Breadcrumb: FC<ComponentProps> = ({}) => {
  const { push } = useRouter()
  const pathname: string = usePathname()

  return (
    <div className='flex gap-1'>
      {pathname
        .split('/')
        .filter((path) => path !== '')
        .map((path, index) => (
          <div key={index} className='flex gap-1'>
            <p className='text-sm leading-5 capitalize font-[425] text-content-prompt'>{path}</p>
            {index < pathname.split('/').filter((path) => path !== '').length - 1 && <p className='text-sm leading-5 font-[425]'>/</p>}
          </div>
        ))}
    </div>
  )
}
