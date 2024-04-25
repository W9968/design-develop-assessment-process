'use client'

import { JSX } from 'react'
import { LuFileEdit, LuSave } from 'react-icons/lu'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Switch } from '@/ui/switch'

import { ContentHeader } from '@/components/content-header'
import { FileUpload } from '@/ui/file'

export default function Page({ params, searchParams }: { params: { slug: string }; searchParams: { id: string } }): JSX.Element {
  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'consultants'}
        args={[
          params.slug === 'create' ? (
            <Button key={'create-consultant-element'} variant={'primary'} title={'Save'} size={'large'} icon={<LuSave size={20} />} className={'gap-2 px-3'} />
          ) : (
            <Button key={'update-consultant-element'} variant={'secondary'} title={'Update'} size={'large'} icon={<LuFileEdit size={20} />} className={'gap-2 px-3'} />
          ),
        ]}
      />

      <div className='flex flex-col gap-4 p-6'>
        <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex flex-col gap-4'>
          <div className='col-span-3'>
            <Input label='username' required />
          </div>
          <div className='grid grid-cols-3 gap-4'>
            <Input label='first name' required />
            <Input label='middle name' />
            <Input label='last name' required />
          </div>

          <FileUpload label='upload profile image' />
        </div>

        <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex items-center gap-4'>
          <Input label='cin' />
          <Input label='badge number' required />
          <Input label='job title' />
          <Input label='department' />
          <Input label='phone number' />
        </div>

        <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6 flex items-start gap-4'>
          <div className='flex-1'>
            <Input label='password' required />
          </div>
          <div className='flex-1'>
            <div className='grid gap-4 place-content-end'>
              <Switch width={350} label='is EY epmploye' />
              <Switch width={350} label='user can assest' />
            </div>
          </div>
        </div>

        <div>
          <Input label='notes' />
        </div>

        <div className='bg-primary-white border-[2px] border-gray-225 rounded px-4 py-6  flex items-center flex-col gap-4'>
          <Switch width={350} label='account locked' defaultChecked disabled />
          <Switch width={350} label='account not expired' defaultChecked disabled />
          <Switch width={350} label='crendentials not expired' defaultChecked disabled />
          <Switch width={350} label='account enabled' required defaultChecked hint={'block an account from accessing the interface.'} />
        </div>

        <Input label='role' />
      </div>
    </div>
  )
}
