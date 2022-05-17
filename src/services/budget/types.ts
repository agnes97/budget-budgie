import type { DocumentData, DocumentReference } from 'firebase/firestore'

export type DataContentOptions = {
  cost?: number
  date?: string
  done?: number
  emoji?: string
  item?: string
  name?: string
  note?: string
  wage?: number
}

export type DataCategory = {
  class: string
  title: string
  subtitle: string
}

export type Data = DataCategory & { content: DataContentOptions[] }

export type BudgetDocument = DocumentData & {
  categories: Record<string, DataContentOptions[]>
  owners: string[]
}

export type ProfileDocument = DocumentData & {
  budgets: DocumentReference[]
  ['active-budget']: DocumentReference
}
