'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { LuClipboardEdit, LuEye, LuTrash } from 'react-icons/lu'
import Link from 'next/link'
import { DELETE } from '@/actions/program-server-actions'

export const programColumns: ColumnDef<ProgramType>[] = [
  {
    id: 'programName',
    header: 'Program Name',
    accessorKey: 'programName',
  },
  {
    id: 'programIndustry',
    header: 'Industry',
    accessorKey: 'programIndustry',
  },
  {
    id: 'programDescription',
    header: 'Description',
    accessorKey: 'programDescription',
  },
  {
    id: 'programStartDate',
    header: 'Start Date',
    accessorFn: (row) => new Date(row.programStartDate).toLocaleDateString(),
  },
  {
    id: 'programEndDate',
    header: 'End Date',
    accessorFn: (row) => new Date(row.programEndDate!).toLocaleDateString() || 'N/A',
  },
  {
    id: 'programEstimatedDuration',
    header: 'Duration',
    accessorKey: 'programEstimatedDuration',
  },
  {
    id: 'programStatus',
    header: 'Status',
    accessorKey: 'programStatus',
  },
  {
    id: 'provider',
    header: 'Provider',
    accessorKey: 'provider.programProviderName',
  },
  {
    id: 'cohorts',
    header: 'Cohorts',
    accessorKey: 'cohorts.length',
  },
  {
    id: 'actions',
    header: ({ header }) => <div className='text-end'>{header.column.id}</div>,
    accessorKey: 'id',
    // size: 64,
    cell: ({ row }) => (
      <div className='flex flex-row-reverse justify-end gap-2'>
        <button title='Remove Program from list' className='flex' onClick={() => DELETE(row.original.id!)}>
          <LuTrash size={20} className='text-accent-error' />
        </button>
        <Link passHref href={`/dashboard/programs/${row.original.programName}?id=${row.original.id}`}>
          <button title='Edit Program information' className='flex'>
            <LuClipboardEdit size={20} className='text-accent-link' />
          </button>
        </Link>
        <button title='More information' className='flex'>
          <LuEye size={20} className='text-accent-success' />
        </button>
        <div className='flex-1' />
      </div>
    ),
  },
]
