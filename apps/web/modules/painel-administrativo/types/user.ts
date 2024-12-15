export type UserType = {
  id: string
  name: string
  role: 'ADMIN' |'USER'
  utype: 'COMPANY' | 'RESEARCHER' | 'NONE'
  status: 'APPROVED' | 'BLOCKED' | 'PENDING'
}
