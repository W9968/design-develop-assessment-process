import type { Metadata } from 'next'
import { type JSX, Suspense } from 'react'
import { LuCog, LuPlus, LuStore } from 'react-icons/lu'

import { Linker } from '@/ui/link'
import { DataTable } from '@/ui/storybook/data-table'

import { ContentHeader } from '@/components/content-header'
import { startupColumns } from '@/app/dashboard/startups/_data/startup-datatable-header'

import { ServerSelect } from '@/ui/storybook/server-select'
import { SearchInput } from '@/components/content-data-table-search'
import { GET, GET_ACTIVITY_SECTOR } from '@/actions/startup-server-actions'
import { FilterOptions } from '@/components/filter-options'

export const metadata: Metadata = {
  title: 'EY Dashboard',
  description: 'Dashboard page',
  icons: {
    icon: '/assets/logo/ey-logo-black.png',
  },
}

export default async function Page({ searchParams }: { searchParams: { page: string; size: string; sort: string; dir: string; search: string; query: string; sector: string } }): Promise<JSX.Element> {
  const startups: StartupResponseType = (await GET(Number(searchParams.page) - 1, Number(searchParams.size), searchParams.sort, searchParams.dir, searchParams.query, searchParams.sector)) || {}
  const activitySectors: string[] = (await GET_ACTIVITY_SECTOR()) || []

  return (
    <div className='h-full min-h-full w-full flex flex-col'>
      <ContentHeader
        title={'startups'}
        args={[
          <Linker
            key={'config-link-startup'}
            size={'large'}
            title={'Config'}
            variant={'primary'}
            className={'gap-2 px-3'}
            href={`/dashboard/settings/sourcing`}
            icon={<LuCog className='flex' size={18} />}
          />,
          <Linker key={'create-link-startup'} size={'large'} title={'add new'} className={'gap-2 px-3'} href={`/dashboard/startups/create`} icon={<LuPlus className='flex' size={18} />} />,
        ]}
      />

      {(searchParams.sector || searchParams.query) && (
        <div className='px-6 mb-6'>
          <FilterOptions
            filter={[
              { name: 'query', option: searchParams.query },
              { name: 'sector', option: searchParams.sector },
            ]}
          />
        </div>
      )}

      <div className='bg-primary-white flex flex-col border-t-[2px] border-gray-200'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='flex-1'>
            <SearchInput placeholder={'search startup'} className={'max-w-[300px]'} />
          </div>
          <div>
            <ServerSelect
              placeholder={
                <div className='flex items-center gap-2 capitalize text-gray-400'>
                  <LuStore size={20} />
                  <p className='text-sm font-medium'>activity sector</p>
                </div>
              }
              classname={'min-w-[250px]'}
              data={activitySectors.map((sector) => ({ label: sector, value: sector }))}
              paramQuery={'sector'}
            />
          </div>
        </div>
        <Suspense key={searchParams.page + searchParams.size} fallback='loading...'>
          <DataTable<StartupType> data={startups.content} columns={startupColumns} paging={startups} />
        </Suspense>
      </div>
    </div>
  )
}
