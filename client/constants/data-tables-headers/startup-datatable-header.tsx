'use client'

import { ColumnDef } from '@tanstack/react-table'
import { LuClipboardEdit, LuExternalLink, LuEye, LuTrash } from 'react-icons/lu'

import { DELETE } from '@/lib/actions/startup-server-actions'
import { Chip } from '@/ui/chip'

export const startupColumns: ColumnDef<StartupType>[] = [
  {
    id: 'startupLogo',
    header: 'Logo',
    size: 64,
    accessorFn: (row) => row.startupLogo,
    cell: ({ row }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={row.original.startupLogo?.includes('https://startup.gov.tn/sites/default/files/2021-10/startuptunisia.png') ? 'https://api.dicebear.com/8.x/shapes/svg' : row.getValue('startupLogo')}
        alt={row.original.startupName}
        className='w-10 h-10 rounded object-fill mr-2'
      />
    ),
  },
  {
    id: 'startupName',
    header: 'Startup Name',
    accessorKey: 'startupName',
    size: 325,
    cell: ({ row }) => (
      <div className='flex flex-col items-start'>
        <p className='w-full text-content-display line-clamp-1'>{row.original.startupName}</p>
        <p className='text-xs text-content-prompt'>since {row.original.startupCreatedAt}</p>
      </div>
    ),
  },
  {
    id: 'startupActivitySector',
    header: 'Activity Sector',
    accessorKey: 'startupActivitySector',
  },
  {
    id: 'startupLabelDate',
    header: 'Label Date',
    accessorKey: 'startupLabelDate',
  },
  {
    id: 'startupWebsite',
    header: 'Website',
    accessorFn: (row) => (row.startupWebsite && row.startupWebsite.includes('http') ? row.startupWebsite : `http://${row.startupWebsite}`),
    cell: ({ row }) => (
      <div>
        {row.original.startupWebsite && row.original.startupWebsite !== 'null' ? (
          <a className={'flex items-center gap-2 text-content-display uppercase'} href={row.getValue('startupWebsite')} target='_blank' rel='noreferrer'>
            {row.original.startupWebsite && row.original.startupWebsite.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/)?.[1]}
            <LuExternalLink size={16} className='text-accent-link' />
          </a>
        ) : (
          <Chip title={'N/A'} variant={'warning'} />
        )}
      </div>
    ),
  },
  {
    id: 'startupEmail',
    header: 'Email',
    accessorKey: 'startupEmail',
    cell: ({ row }) => (
      <div>
        {row.original.startupEmail && row.original.startupEmail !== 'null' ? (
          <a className={'flex items-center gap-2 text-content-display uppercase'} href={row.getValue('startupWebsite')} target='_blank' rel='noreferrer'>
            {row.original.startupEmail}
          </a>
        ) : (
          <Chip title={'N/A'} variant={'ghost'} />
        )}
      </div>
    ),
  },
  {
    id: 'startupPhone',
    header: 'Phone',
    accessorKey: 'startupPhone',
    cell: ({ row }) => (
      <div>
        {row.original.startupPhone && row.original.startupPhone !== 'null' ? (
          <a className={'flex items-center gap-2 text-content-display uppercase'} href={row.getValue('startupWebsite')} target='_blank' rel='noreferrer'>
            {row.original.startupPhone}
          </a>
        ) : (
          <Chip title={'N/A'} variant={'danger'} />
        )}
      </div>
    ),
  },
  {
    id: 'actions',
    header: ({ header }) => <div className='text-end'>{header.column.id}</div>,
    accessorKey: 'startupName',
    // size: 64,
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2'>
        <button className='flex' onClick={() => DELETE(row.original.id)}>
          <LuTrash size={20} className='text-accent-error' />
        </button>
        <button className='flex'>
          <LuClipboardEdit size={20} className='text-accent-link' />
        </button>
        <button className='flex'>
          <LuEye size={20} className='text-accent-success' />
        </button>
        <div className='flex-1' />
      </div>
    ),
  },
]
