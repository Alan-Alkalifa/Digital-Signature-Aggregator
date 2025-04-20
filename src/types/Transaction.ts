// types/Transaction.ts

export interface Transaction {
  id: string
  date: string
  provider: string
  type: string
  nominal: string
  status: 'Success' | 'Pending' | 'Cenceled'
}
