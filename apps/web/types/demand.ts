export type CreateDemand = {
  name: string
  description: string
  links?: string[]
  public: boolean | string
}

export type UpdateDemand = {
  name: string
  description: string
  links?: string[]
  public: boolean | string
}