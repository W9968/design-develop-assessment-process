import type { JSX } from 'react'
import { ContentHeader } from '@/components/content-header'
import { Linker } from '@/ui/link'
import { LuPlusCircle } from 'react-icons/lu'

export default function Page(): JSX.Element {
  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader
        title={'consultants'}
        args={[<Linker key={'create-link-consultant-element'} title={'add new'} href={`/dashboard/consultants/create`} size={'large'} icon={<LuPlusCircle size={20} />} className={'gap-1 px-3'} />]}
      />
    </div>
  )
}
