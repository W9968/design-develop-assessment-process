'use client'

import { FC, useState } from 'react'

import { getCookie } from 'cookies-next'
import { mr } from '@/utils/class-authority-merge'
import { LuX } from 'react-icons/lu'

export const SourcingContent: FC = () => {
  const [state, setState] = useState<{ loading: boolean; error: { error: string; message: string } | null; progress: number }>({
    loading: false,
    error: null,
    progress: 0,
  })

  function handleSourcing() {
    fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/startup`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${getCookie('token')}` },
    })
      .then((res) => res.json())
      .then((data) => {
        let progress = 1
        const interval = setInterval(() => {
          progress += 3
          if (progress > 100) {
            progress = 100
            clearInterval(interval)
          }
          if (data === true) {
            setState({ loading: false, error: null, progress })
          } else {
            console.log('error data=> ', data)
            setState({
              loading: false,
              error: {
                error: data.error,
                message: data.message,
              },
              progress,
            })
            clearInterval(interval) // Stop the interval if data is not true
          }
        }, 100) // Change the interval as needed
      })
      .catch((err) => console.log('error data=> ', err))
  }

  return (
    <div className='flex-1 flex flex-col items-center justify-start gap-6'>
      {/* progress bar */}
      <div className='w-full'>
        <div className='mb-2 flex justify-between items-center'>
          <h3 className='text-sm font-semibold text-gray-800 dark:text-white'>Progress title</h3>
          <span className='text-sm text-gray-800 dark:text-white'>{state.progress}%</span>
        </div>
        <div className='flex w-full h-2 bg-gray-200 rounded-full overflow-hidden' role='progressbar'>
          <div
            className={mr(
              'flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500',
              state.error ? 'bg-red-600' : 'bg-blue-600',
              state.progress === 100 && 'bg-green-600'
            )}
            style={{ width: `${state.progress}%` }}></div>
        </div>
      </div>
      {/* error alert */}
      {state.error && (
        <div className='w-full bg-red-100/20 border-s-4 border-red-600 p-4 dark:bg-red-800/30' role='alert'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <span className='inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200'>
                <LuX size={16} className='text-primary-background' />
              </span>
            </div>
            <div className='ms-3'>
              <h3 className='text-gray-800 font-semibold dark:text-white'>Error!</h3>
              <p className='text-sm text-gray-700 dark:text-neutral-400'>{state.error.error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
