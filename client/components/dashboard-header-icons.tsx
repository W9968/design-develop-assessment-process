import type { FC, ReactNode } from 'react'

import { MdCalendarMonth, MdOutlineNotificationsNone } from 'react-icons/md'
import Link from 'next/link'

export const DashboardHeaderIcons: FC = () => (
  <div className='h-full flex flex-row items-center gap-4'>
    {navigation_icons.map((item, index) => (
      <Link key={index} href={item.href} passHref className='h-12 w-12 hover:bg-content-display rounded-full flex items-center justify-center outline-none'>
        {item.icon}
      </Link>
    ))}
  </div>
)

const navigation_icons: { icon: ReactNode; href: string }[] = [
  { icon: <MdOutlineNotificationsNone className='text-gray-300 hover:text-primary-white cursor-pointer' size={24} />, href: '/dashboard/notifications' },
  { icon: <MdCalendarMonth className='text-gray-300 hover:text-primary-white cursor-pointer' size={24} />, href: '/dashboard/calendar' },
]
