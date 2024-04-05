'use server'

import * as yup from 'yup'
import { useAxios } from '@/hooks/useAxios'
import { formLoginSchema } from '@/lib/validation/form-auth-validation'
import { cookies } from 'next/headers'

type AuthenticatedUser = yup.InferType<typeof formLoginSchema>

export async function authenticate(data: AuthenticatedUser): Promise<{
  fulfillment: boolean
  token: TokenType
  error: ErrorAuthType
}> {
  return await useAxios
    .post('/auth/login', { ...data })
    .then((res) => ({ fulfillment: true, token: res.data, error: emptyError }))
    .catch((err) => ({ fulfillment: false, token: emptyToken, error: err.response.data }))
}

export async function logout(): Promise<void> {
  cookies().delete('token')
}

export async function me(): Promise<{
  fulfillment: boolean
  user: AuthUserProfileType
  error: ErrorAuthType
}> {
  return await useAxios
    .get('/auth/me', {
      headers: {
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
    })
    .then((res) => ({ fulfillment: true, user: res.data, error: emptyError }))
    .catch((err) => ({ fulfillment: false, user: emptyUser, error: err.response.data }))
}

/**
 * empty state
 */

const emptyToken = { token: '', expiresIn: 0 }
const emptyError = {
  type: '',
  title: '',
  status: 0,
  detail: '',
  instance: '',
  description: '',
}
const emptyUser = {
  id: '',
  fullName: '',
  username: '',
  role: '',
  email: '',
  isAccountNonLocked: false,
  isAccountNonExpired: false,
  isCredentialsNonExpired: false,
  isEnabled: false,
  createdAt: '',
  enabled: false,
  authorities: [],
  accountNonLocked: false,
  accountNonExpired: false,
  credentialsNonExpired: false,
}
