interface AxeType {
  id?: string
  axeName: string
  axeDescription: string
  status: boolean
  createdAt?: string
  axeSubs: AxeSubType[]
}

interface AxeSubType {
  id?: string
  axeSubName: string
  axeSubDescription: string
  status: boolean
  axeSubWeight: number
  createdAt: Date
  axe: AxeType
  criteriaCount: number
}

interface AxeSubCriteriaType {}

type AxeResponseType = PageableType & {
  content: AxeType[]
}
