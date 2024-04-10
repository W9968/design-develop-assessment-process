import '@/styles/main.css'

import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'

import { mr } from '@/utils/class-authority-merge'

const ps = Public_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  icons: {
    icon: '/assets/logo/ey-logo-black.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body className={mr(ps.className, 'overscroll-none')}>{children}</body>
    </html>
  )
}
