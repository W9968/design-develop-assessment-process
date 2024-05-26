interface AxeType {
  id?: string
  axeName: string
  axeDescription: string
  status: boolean
  createdAt?: string
  axeSubs: AxeSubType[]
}

interface AxeSubType {}

type AxeResponseType = PageableType & {
  content: AxeType[]
}
