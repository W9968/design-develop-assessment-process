'use client'

import { type JSX } from 'react'

import { useRouter } from 'next/navigation'

export default function Page({ searchParams }: { searchParams: { axe: string; id: string } }): JSX.Element {
  const { push } = useRouter()

  return <></>
}
