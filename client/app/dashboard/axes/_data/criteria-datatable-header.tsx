'use client'

import type { ColumnDef } from '@tanstack/react-table'

export const criteriaColumns: ColumnDef<AxeSubCriteriaType>[] = [
  {
    id: 'axeSubCriteriaName',
    header: 'Criteria',
    accessorKey: 'axeSubCriteriaName',
  },
  {
    id: 'axeSub.axeSubName',
    header: 'Branch',
    accessorKey: 'axeSub.axeSubName',
  },
]
