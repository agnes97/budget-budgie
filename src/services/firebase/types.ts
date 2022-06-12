import type { DocumentData, DocumentReference } from 'firebase/firestore'

import type { DataContentOptions } from 'services/budget/types'

export type BudgetDocument = DocumentData & {
  categories: Record<string, DataContentOptions[]>
  owners: string[]
}

export type ProfileDocument = DocumentData & {
  budgets: DocumentReference[]
  ['active-budget']: DocumentReference
}
