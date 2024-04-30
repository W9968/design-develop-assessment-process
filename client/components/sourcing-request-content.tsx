'use client'

import type { ChangeEvent, FC } from 'react'
import { useState } from 'react'

import { LuCheck, LuX } from 'react-icons/lu'
import { getCookie } from 'cookies-next'
import { mr } from '@/utils/class-authority-merge'

import { Switch } from '@/ui/switch'
import { Button } from '@/ui/button'

export const SourcingRequestContent: FC = () => {
  const [isToggle, setToggle] = useState<boolean>()
  const [state, setState] = useState<{ loading: boolean; error: { error: string; message: string } | null; progress: number }>({
    loading: false,
    error: null,
    progress: 0,
  })

  function handleSourcing() {
    setState({ loading: true, error: null, progress: 0 })
    fetch(`${process.env.NEXT_PUBLIC_APP_SERVER}/api/startup`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${getCookie('token')}` },
    })
      .then((res) => res.json())
      .then((data) => {
        let progress = 0
        const interval = setInterval(() => {
          progress += 3
          if (progress > 100) {
            progress = 100
            clearInterval(interval)
          }
          if (data === true) {
            setState({ loading: false, error: null, progress })
          } else {
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
    <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col gap-6'>
      <Switch
        checked={isToggle}
        label={'manually lunch the sourcing script'}
        hint={'This will allow you to manually lunch the startup sourcing script from our databases.'}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setToggle(e.target.checked)}
      />

      {isToggle && (
        <div className='flex flex-col gap-6 items-start'>
          {/* progress bar */}
          <div className='w-full'>
            <div className='mb-2 flex justify-between items-center'>
              <h3 className='text-sm font-[500] dark:text-white text-content-display'>Progress title</h3>
              <span className='text-sm text-content-display'>{state.progress}%</span>
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
          {/* success alert */}
          {!state.error && state.progress === 100 && (
            <div className='w-full bg-green-100/20 border-s-4 border-green-600 p-4 dark:bg-red-800/30' role='alert'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <span className='inline-flex justify-center items-center size-8 rounded-full border-4 border-green-100 bg-green-200'>
                    <LuCheck size={16} className='text-primary-background' />
                  </span>
                </div>
                <div className='ms-3'>
                  <h3 className='text-gray-800 font-semibold dark:text-white'>Success!</h3>
                  <p className='text-sm text-gray-700 dark:text-neutral-400'>The sourcing job has been executed successfully.</p>
                </div>
              </div>
            </div>
          )}
          <Button title='execute job' size='small' variant='primary' className='w-[125px] px-2 h-[42px]' onClick={handleSourcing} loading={state.loading} />
        </div>
      )}
    </div>
  )
}
