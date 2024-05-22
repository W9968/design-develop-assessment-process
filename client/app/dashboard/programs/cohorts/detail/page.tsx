import { type JSX } from 'react'
import { LuAirplay, LuCalendarCheck, LuCalendarDays, LuFileEdit, LuStickyNote, LuText, LuTimer, LuUserSquare } from 'react-icons/lu'
import { GoNumber } from 'react-icons/go'

import { redirect } from 'next/navigation'
import { Linker } from '@/ui/link'
import { Chip } from '@/ui/chip'
import { DataTable } from '@/ui/storybook/data-table'

import { ContentHeader } from '@/components/content-header'
import { FIND } from '@/actions/cohort-server-actions'
import { cohortChallengeColumns } from '@/app/dashboard/programs/_data/cohort-challenge-datatable-header'

export default async function Page({ searchParams }: { searchParams: { id: string } }): Promise<JSX.Element> {
  if (!searchParams.id) {
    redirect('/dashboard/programs')
  }

  const cohort: CohortType = (await FIND(searchParams.id)) || {}

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={cohort.cohortName || 'cohort'}
        args={[
          <Linker
            key={'edit-link-cohort'}
            title={'edit cohort'}
            href={`/dashboard/programs/cohorts/${cohort.cohortName.replaceAll(' ', '-')}?id=${cohort.id}`}
            size={'large'}
            icon={<LuFileEdit size={20} />}
            className={'gap-2 px-3'}
          />,
        ]}
      />

      <div className='relative bg-primary-white flex flex-col gap-4 border-y-[2px] border-gray-200 p-6'>
        <div>
          <h2 className='text-xl font-bold text-content-display capitalize'>details</h2>
          <p className='text-sm text-content-prompt mb-1'>The information that describes the cohort and its requirements.</p>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuAirplay className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>cohort</p>
            </div>
            <div className='col-span-4'>
              <p className='text text-content-display capitalize'>{cohort.cohortName}</p>
            </div>
          </div>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuCalendarCheck className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>From</p>
            </div>
            <div className='col-span-4'>
              <p className='text text-content-display capitalize'>{new Date(cohort.cohortStartDate).toDateString()}</p>
            </div>
          </div>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuCalendarDays className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>To</p>
            </div>
            <div className='col-span-4'>
              <p className='text text-content-display capitalize'>{new Date(cohort.cohortEndDate!).toDateString()}</p>
            </div>
          </div>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuTimer className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>Duration</p>
            </div>
            <div className='col-span-4'>
              <p className='text text-content-display capitalize'>{cohort.cohortDuration} weeks</p>
            </div>
          </div>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <GoNumber className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>cohort challenges</p>
            </div>
            <div className='col-span-4'>
              <Chip title={cohort.challenges.length === 0 ? 'N/A' : `${cohort.challenges.length} challenges`} variant={cohort.challenges.length === 0 ? 'danger' : 'info'} size='small' />
            </div>
          </div>

          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuText className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>cohort Description</p>
            </div>
            <div className='col-span-4'>
              <p className='text text-content-display capitalize'>{cohort.cohortDescription}</p>
            </div>
          </div>
          <div className='grid grid-cols-5'>
            <div className='col-span-1 flex items-center gap-2'>
              <LuUserSquare className='text-gray-400' size={20} />
              <p className='text-sm text-content-prompt capitalize font-[500]'>cohort program</p>
            </div>
            <div className='col-span-4'>
              <div className='flex flex-row items-center gap-2'>
                <div>
                  {cohort.program.programPicture ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cohort.program.programPicture} alt={cohort.program.programName} className='flex w-10 h-10 rounded-full' />
                  ) : (
                    <div className='flex w-10 h-10 rounded-full items-center justify-center bg-yellow-600 leading-7 font-[550] border border-yellow-700 uppercase'>
                      <p>{cohort.program.programName[0]}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className='text-sm text-content-display capitalize'>{cohort.program.programName}</p>
                  <p className='text-xs text-content-prompt capitalize'>provider: {cohort.program.provider.programProviderName}</p>
                </div>
              </div>
            </div>
          </div>
          {/**/}
        </div>
      </div>

      <div className='relative bg-primary-white flex flex-col border-y-[2px] border-gray-200 p-6 mt-6'>
        <div className='flex flex-col gap-4'>
          <div className='w-full flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-bold text-content-display capitalize'>challenges</h2>
              <p className='text-sm text-content-prompt mb-1'>The cohort challenges that are currently available for the cohort.</p>
            </div>
            <div>
              <Linker title={'add new challenge'} href={`/dashboard/programs/cohorts/challenges/create?cohort=${cohort.id}`} size='large' icon={<LuStickyNote size={20} />} className={'gap-2 px-3'} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <DataTable<ChallengeType> rounded data={cohort.challenges?.reverse()} columns={cohortChallengeColumns} />
          </div>
        </div>
      </div>
    </div>
  )
}