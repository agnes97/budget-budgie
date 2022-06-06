import type { Unsubscribe } from 'firebase/firestore'
import {
  addDoc,
  collection,
  getDoc,
  doc,
  onSnapshot,
  runTransaction,
} from 'firebase/firestore'

import { budgetsCollection, firestore, profilesCollection } from 'services/firebase'

import { categories, initialCategories } from './categories'
import type {
  Data,
  DataContentOptions,
} from './types'

export const subscribeData = (
  documentId: string,
  onDataChange: (data: Data[]) => void
): Unsubscribe =>
  // eslint-disable-next-line @typescript-eslint/no-shadow
  onSnapshot(doc(budgetsCollection, documentId), (document) => {
    if (!document.exists()) {
      return void onDataChange(initialCategories)
    }

    const data = document.data().categories

    onDataChange(
      categories.map((category) => ({
        ...category,
        content: data[category.class],
      }))
    )
  })

// FIND BUDGET IDS BY USER ID
export const getBudgetIdsByUserId = async (
  userId: string
): Promise<string[]> => {
  const profileCollectionReference = doc(profilesCollection, userId)
  const profileDocumentSnapshot = await getDoc(profileCollectionReference)

  if (!profileDocumentSnapshot.exists()) {
    return []
  }

  const budgets = profileDocumentSnapshot.data().budgets

  return budgets.map(({ id }) => id)
}

// ADD NEW BUDGET
export const createNewBudget = async (
  userId: string,
  newBudgetTitle: string
): Promise<void> => {
  const profileCollectionReference = doc(profilesCollection, userId)

  const initialCategoriesMap = Object.fromEntries(
    initialCategories.map((category) => [category.class, category.content])
  )

  // Creates new budget document with auto-generated id!
  const newDocumentId = await addDoc(collection(firestore, 'budgets'), {
    title: newBudgetTitle,
    categories: initialCategoriesMap,
    owners: [userId],
  }).then((docRef) => docRef.id)

  const newBudgetReference = doc(budgetsCollection, newDocumentId)

  // Updates profile collection to include newly created budget
  try {
    await runTransaction(firestore, async (transaction) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const document = await transaction.get(profileCollectionReference)

      if (!document.exists()) {
        return
      }

      const documentContent = document.data().budgets

      transaction.update(profileCollectionReference, {
        budgets: [...documentContent, newBudgetReference],
      })
    })
  } catch (error) {
    console.error('Transaction failed: ', error)
  }
}

// void createNewBudget('gYE3GEqbfAbpxJHMgyk7UejaGpH2', 'Another budget')

// FIND ACTIVE BUDGET
export const getActiveBudgetByUserId = async (
  userId: string
): Promise<string> => {
  const profileCollectionReference = doc(profilesCollection, userId)
  const profileDocumentSnapshot = await getDoc(profileCollectionReference)

  if (!profileDocumentSnapshot.exists()) {
    return ''
  }

  const activeBudgetId = profileDocumentSnapshot.data()['active-budget'].id

  return activeBudgetId
}

// UPDATE ACTIVE BUDGET
export const setActiveBudgetByUserId = async (
  userId: string,
  newActiveBudgetId: string
): Promise<void> => {
  const profileRef = doc(profilesCollection, userId)
  const budgetRef = doc(budgetsCollection, newActiveBudgetId)

  try {
    await runTransaction(firestore, async (transaction) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const document = await transaction.get(profileRef)
      if (!document.exists()) {
        return
      }

      transaction.update(profileRef, {
        'active-budget': budgetRef,
      })
    })
  } catch (error) {
    console.error('Transaction failed: ', error)
  }
}

// FIND BUDGET BY USER
// export const getBudgetIdsByUser = async (userId: string): Promise<string[]> => {
//   const budgetsReference = collection(firestore, 'budgets')

//   const budgetOwnersQuery = query(budgetsReference, where('owners', 'array-contains', userId))

//   const querySnapshot = await getDocs(budgetOwnersQuery)

//   return querySnapshot.docs.map(budget => budget.id)
// }

// ADD NEW ITEM TO BUDGET
export const addNewItemToBudget = async (
  budgetId: string,
  className: string,
  newItem: DataContentOptions
): Promise<void> => {
  const budgetRef = doc(budgetsCollection, budgetId)

  try {
    await runTransaction(firestore, async (transaction) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const document = await transaction.get(budgetRef)
      if (!document.exists()) {
        return
      }

      const content = document.data().categories[className]

      transaction.update(budgetRef, {
        [`categories.${className}`]: [...content, newItem],
      })
    })
  } catch (error) {
    console.error('Transaction failed: ', error)
  }
}

// DELETE ITEM FROM BUDGET
export const deleteItemFromBudget = async (
  budgetId: string,
  className: string,
  deletedItemIndex: number
): Promise<void> => {
  const budgetRef = doc(budgetsCollection, budgetId)

  try {
    await runTransaction(firestore, async (transaction) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const document = await transaction.get(budgetRef)
      if (!document.exists()) {
        return
      }

      const category = document.data().categories[className]

      transaction.update(budgetRef, {
        [`categories.${className}`]: category.filter(
          (_, index) => index !== deletedItemIndex
        ),
      })
    })
  } catch (error) {
    console.error('Transaction failed: ', error)
  }
}

// SET NOTE TO BUDGET CATEGORY ITEM
export const setNoteToBudgetCategoryItem = async (
  budgetId: string,
  className: string,
  categoryItemIndex: number,
  newNote: string | null
): Promise<void> => {
  const budgetRef = doc(budgetsCollection, budgetId)

  try {
    await runTransaction(firestore, async (transaction) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const document = await transaction.get(budgetRef)
      if (!document.exists()) {
        return
      }

      const category = document.data().categories[className]

      const categoryItem = category[categoryItemIndex]

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!categoryItem) {
        return
      }

      const newCategoryItem = { ...categoryItem, note: newNote }

      transaction.update(budgetRef, {
        [`categories.${className}`]: category.map((item, index) =>
          index === categoryItemIndex ? newCategoryItem : item
        ),
      })
    })
  } catch (error) {
    console.error('Transaction failed: ', error)
  }
}

// COUNT WAGES
export const countMonthlyWage = (data: Data[], key: number): number => {
  const locationOfData = data[key]?.content

  return locationOfData
    .map((contentItem: DataContentOptions) => contentItem.wage)
    .reduce(
      (acc: number, contentItem: number | undefined) =>
        acc + (contentItem ?? 0),
      0
    )
}

// COUNT COSTS
export const countCost = (
  data: Data[],
  key: number,
  column: 'wage' | 'cost'
): number | undefined => {
  const locationOfData = data[key]?.content

  return locationOfData
    .map((contentItem: DataContentOptions) => contentItem[column])
    .reduce(
      (acc: number, contentItem: DataContentOptions[typeof column]) =>
        acc + (contentItem ?? 0),
      0
    )
}

// SORT ITEMS
export const sortItemsBy = (
  arrayToSort: DataContentOptions[],
  sortBy: keyof DataContentOptions
): DataContentOptions[] =>
  arrayToSort.sort((valueA: DataContentOptions, valueB: DataContentOptions) => {
    const one = valueA[sortBy]?.toString()?.trim()?.toLowerCase() ?? ''
    const two = valueB[sortBy]?.toString()?.trim()?.toLowerCase() ?? ''

    return one < two ? -1 : 1
  })

// SORT CERTAIN EMOJI LAST
export const sortByEmoji = (
  arrayToSort: DataContentOptions[],
  emoji: string
): DataContentOptions[] =>
  arrayToSort.sort((valueA: DataContentOptions, valueB: DataContentOptions) => {
    const one = valueA.emoji?.indexOf(emoji) ?? -1
    const two = valueB.emoji?.indexOf(emoji) ?? -1

    return one - two
  })
