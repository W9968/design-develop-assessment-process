'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import * as yup from 'yup'
import { formProgramSchema } from '@/validation/form-program-validation'

type Program = yup.InferType<typeof formProgramSchema>

export async function GET(
  query: string = '',
  status: string = '',
  industry: string = '',
  page: number = 0,
  size: number = 10,
  sort: string = 'programEstimatedDuration',
  dir: string = 'desc'
): Promise<ProgramResponseType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program?page=${page}&size=${size}&sort=${sort},${dir}&query=${query}&status=${status}&industry=${industry}`, {
    method: 'GET',
    next: { revalidate: 0 },
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function POST(program: Program): Promise<ProgramType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
    body: JSON.stringify(program),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND(id: string): Promise<ProgramType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PUT(): Promise<void> {}

export async function DELETE(id: string): Promise<ProgramType> {
  return await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/program/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${cookies().get('token')?.value}` },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/programs')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}
