import type { DocumentData, DocumentReference } from 'firebase/firestore'

import type { DataContentOptions } from 'services/budget/types'

export type BudgetDocument = DocumentData & {
  title: string
  description: string
  categories: Record<string, DataContentOptions[]>
  owners: string[]
}

export type ProfileDocument = DocumentData & {
  budgets: Array<DocumentReference<BudgetDocument>>
  ['active-budget']: DocumentReference<BudgetDocument>
}
