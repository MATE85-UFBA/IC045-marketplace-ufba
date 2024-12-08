export type UserType = {
  id: string
  name: string
  role: 'ADMIN' |'USER'
  utype: 'COMPANY' | 'RESEARCHER' | 'NONE'
  isActive: boolean
}
