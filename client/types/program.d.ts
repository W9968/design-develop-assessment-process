interface ProgramType {
  id?: string
  programPicture: string
  programName: string
  programIndustry: string
  programDescription: string
  programStartDate: string
  programEndDate?: string
  programEstimatedDuration: number
  programStatus?: string
  provider: {
    id?: string
    programProviderName: string
    programProviderLogo?: string
    programProviderWebsite?: string
  }
  cohorts: {}[]
}

type ProgramResponseType = PageableType & {
  content: ProgramType[]
}
