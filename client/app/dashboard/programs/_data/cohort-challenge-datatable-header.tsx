'use client'

import { ColumnDef } from '@tanstack/react-table'

export const cohortChallengeColumns: ColumnDef<ChallengeType>[] = [
  {
    id: 'challengeName',
    header: 'Challenge Name',
    accessorKey: 'challengeTitle',
  },
  {
    id: 'challengeRequirement',
    header: 'Requirement',
    accessorKey: 'challengeRequirement',
  },
]
