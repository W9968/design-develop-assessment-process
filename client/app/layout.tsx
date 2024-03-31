import '@/styles/main.css'

import { Suspense, type ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { mr } from '@/lib/class-authority-merge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  icons: {
    icon: '/assets/logo/ey-logo-black.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <body className={mr(inter.className)}>{children}</body>
    </html>
  )
}
