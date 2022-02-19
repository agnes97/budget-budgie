import type { Unsubscribe } from 'firebase/firestore'
import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore'

import { firestore } from 'services/firebase'

import { categories, initialCategories } from './categories'
import type { Data, DataContentOptions } from './types'

export const subscribeData = (
  documentId: string,
  onDataChange: (data: Data[]) => void,
): Unsubscribe =>
  onSnapshot(doc(firestore, 'budgets', documentId), document => {
    if (!document.exists()) {
      return void onDataChange(initialCategories)
    }

    // eslint-disable-next-line no-warning-comments
    // TODO: Fix following linting problem:
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: Record<string, DataContentOptions[]> = document.data().categories

    onDataChange(categories.map(category => ({ ...category, content: data[category.class] ?? [] })))
  })

// FIND BUDGET BY USER
export const getBudgetIdsByUser = async (userId: string): Promise<string[]> => {
  const budgetsReference = collection(firestore, 'budgets')

  const budgetOwnersQuery = query(budgetsReference, where('owners', 'array-contains', userId))

  const querySnapshot = await getDocs(budgetOwnersQuery)

  return querySnapshot.docs.map(budget => budget.id)
}

// COUNT WAGES
// eslint-disable-next-line consistent-return
export const countMonthlyWage = (data: Data[], key: number) => {
  const location = data[key]?.content

  if (location) {
    return location
      .map((contentItem: DataContentOptions) => contentItem.wage)
      .reduce((acc: number, contentItem: number | undefined) => acc + (contentItem ?? 0), 0)
  }
}

// COUNT COSTS
// eslint-disable-next-line consistent-return
export const countCost = (data: Data[], key: number, column: 'wage' | 'cost') => {
  const location = data[key]?.content

  if (location) {
    return location
      .map((contentItem: DataContentOptions) => contentItem[column])
      .reduce((
        acc: number,
        contentItem: DataContentOptions[typeof column],
      ) => acc + (contentItem ?? 0), 0)
  }
}

// SORT ITEMS
export const sortItemsBy = (arrayToSort: DataContentOptions[], sortBy: keyof DataContentOptions) =>
  arrayToSort.sort((valueA: DataContentOptions, valueB: DataContentOptions) => {
    const one = valueA[sortBy]?.toString()?.trim()?.toLowerCase() ?? ''
    const two = valueB[sortBy]?.toString()?.trim()?.toLowerCase() ?? ''

    return one < two ? -1 : 1
  })

// SORT CERTAIN EMOJI LAST
export const sortByEmoji = (arrayToSort: DataContentOptions[], emoji: string) =>
  arrayToSort.sort((valueA: DataContentOptions, valueB: DataContentOptions) => {
    const one = valueA.emoji?.indexOf(emoji) ?? -1
    const two = valueB.emoji?.indexOf(emoji) ?? -1

    return one - two
  })

