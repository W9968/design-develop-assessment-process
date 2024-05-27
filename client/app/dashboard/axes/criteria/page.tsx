import { type JSX, Suspense } from 'react'
import { LuPlusCircle, LuSlidersHorizontal } from 'react-icons/lu'

import { Linker } from '@/ui/link'
import { DataTable } from '@/ui/storybook/data-table'
import { ServerSelect } from '@/ui/storybook/server-select'

import { ContentHeader } from '@/components/content-header'
import { SearchInput } from '@/components/content-data-table-search'

import { GET } from '@/actions/criteria-server-actions'
import { criteriaColumns } from '@/app/dashboard/axes/_data/criteria-datatable-header'
import { FilterOptions } from '@/components/filter-options'

export default async function Page({ searchParams }: { searchParams: { page: string; size: string; sort: string; dir: string; query: string; name: string; status: string } }): Promise<JSX.Element> {
  const criterias: AxeSubCriteriaResponseType =
    (await GET(searchParams.name, searchParams.query, searchParams.status, Number(searchParams.page) - 1, Number(searchParams.size), searchParams.sort, searchParams.dir)) || {}

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'Axes'}
        args={[<Linker key={'create-link-axe-element'} title={'add new axe'} href={`/dashboard/axes/create`} size={'large'} icon={<LuPlusCircle size={20} />} className={'gap-2 px-3'} />]}
      />

      {(searchParams.name || searchParams.status || searchParams.query) && (
        <div className='px-6 mb-6'>
          <FilterOptions
            filter={[
              { name: 'query', option: searchParams.query },
              { name: 'name', option: searchParams.name },
              { name: 'status', option: searchParams.status },
            ]}
          />
        </div>
      )}

      <div className='bg-primary-white flex flex-col border-t-[2px] border-gray-200'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div className='flex-1'>
            <SearchInput placeholder={'search axe'} className={'max-w-[300px]'} />
          </div>
          <div className='flex items-center gap-2'>
            <ServerSelect
              placeholder={
                <div className='flex items-center gap-2 capitalize text-gray-400'>
                  <LuSlidersHorizontal size={20} />
                  <p className='text-sm font-medium'>visibility</p>
                </div>
              }
              classname={'min-w-[150px]'}
              data={[
                { label: 'Active', value: 'true' },
                { label: 'Disabled', value: 'false' },
              ]}
              paramQuery={'status'}
            />
          </div>
        </div>
        <Suspense key={searchParams.page + searchParams.size} fallback='loading...'>
          <DataTable<AxeSubCriteriaType> data={criterias.content} columns={criteriaColumns} paging={criterias} />
        </Suspense>
      </div>
    </div>
  )
}
