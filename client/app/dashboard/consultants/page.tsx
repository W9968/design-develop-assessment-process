import { JSX, Suspense } from 'react'
import { LuPlusCircle } from 'react-icons/lu'

import { Linker } from '@/ui/link'
import { DataTable } from '@/ui/storybook/data-table'

import { ContentHeader } from '@/components/content-header'

import { GET } from '@/lib/actions/consultant-server-actions'
import { consultantColumns } from '@/constants/data-tables-headers/consultant-datatable-header'

export default async function Page({ searchParams }: { searchParams: { page: string; size: string; sort: string; dir: string } }): Promise<JSX.Element> {
  const consultant: ConsultantResponseType = (await GET(Number(searchParams.page) - 1, Number(searchParams.size), searchParams.sort, searchParams.dir)) || {}

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'consultants'}
        args={[<Linker key={'create-link-consultant-element'} title={'add new'} href={`/dashboard/consultants/create`} size={'large'} icon={<LuPlusCircle size={20} />} className={'gap-1 px-3'} />]}
      />

      <Suspense key={searchParams.page + searchParams.size} fallback='loading...'>
        <DataTable<ConsultantType> data={consultant.content} columns={consultantColumns} paging={consultant} />
      </Suspense>
    </div>
  )
}
