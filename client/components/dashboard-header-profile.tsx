'use client'

import Link from 'next/link'
import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { MdLogout, MdOutlineChevronRight } from 'react-icons/md'
import { logout, me } from '@/lib/actions/auth-actions'
import { getCookie, setCookie } from 'cookies-next'

interface ComponentProps {}

export const DashboardHeaderProfile: FC<ComponentProps> = () => {
  const { push } = useRouter()
  const [user, setUser] = useState<AuthUserProfileType>()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (getCookie('token')) {
    me().then((res) => {
      if (res.fulfillment) {
        setCookie('user-uuid', res.user.id, { domain: 'localhost', path: '/' })
        localStorage.setItem('user', JSON.stringify(res.user))
        setUser(res.user)
      }
    })
  }

  return (
    <div className='relative'>
      <button className='h-full cursor-pointer flex items-center gap-3 select-none' onClick={() => setIsOpen(!isOpen)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={''} alt='' className='h-10 w-10 object-cover flex rounded-full' />
        <div className={'flex flex-1 flex-col items-start'}>
          <p className='text-primary-white text-sm capitalize'>{user?.fullName}</p>
          <p className='text-gray-300 text-xs'>{user?.email}</p>
        </div>
        <motion.span initial={{ rotate: 0 }} animate={{ rotate: isOpen ? 90 : 0 }} transition={{ type: 'just' }}>
          <MdOutlineChevronRight className='text-primary-white' size={24} />
        </motion.span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'just', duration: 0.3 }}
          className='absolute top-14 right-0 w-full bg-primary-black overflow-hidden rounded'>
          <div className='flex flex-col'>
            <Link passHref href='' className='px-3 h-12 text-gray-300 hover:text-primary-white bg-primary-black hover:bg-gray-500 flex items-center justify-between'>
              <p className='flex text-sm capitalize'>Profile</p>
            </Link>
            <Link passHref href='' className='px-3 h-12 text-gray-300 hover:text-primary-white bg-primary-black hover:bg-gray-500 flex items-center justify-between'>
              <p className='flex text-sm capitalize'>Settings</p>
            </Link>
            <div className='h-px bg-gray-500' />
            <button onClick={() => logout().then((_) => push('/'))} className='px-3 h-12 text-gray-300 hover:text-primary-white bg-primary-black hover:bg-gray-500 flex items-center justify-between'>
              <p className='flex text-sm capitalize'>Logout</p>
              <MdLogout size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
