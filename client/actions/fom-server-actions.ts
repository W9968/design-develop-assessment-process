'use server'

import { cookies } from 'next/headers'

export async function GET(query: string = '', status: string = '', page: number = 0, size: number = 10, sort: string = 'createdAt', dir: string = 'desc'): Promise<ForumResponseType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/forum?page=${page}&size=${size}&sort=${sort},${dir}&query=${query}&status=${status}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}
