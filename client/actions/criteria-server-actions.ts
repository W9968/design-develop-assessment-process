'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function GET(
  name: string = '',
  query: string = '',
  status: string = '',
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt',
  dir: string = 'desc'
): Promise<AxeSubCriteriaResponseType> {
  return fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/axe/sub/criteria?page=${page}&size=${size}&sort=${sort},${dir}&query=${query}&name=${name}&status=${status}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/axes/criteria')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}
