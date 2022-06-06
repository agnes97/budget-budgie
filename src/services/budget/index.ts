import type { Unsubscribe } from 'firebase/firestore'
import {
  addDoc,
  collection,
  getDoc,
  doc,
  onSnapshot,
  runTransaction,
} from 'firebase/firestore'

import {
  budgetsCollection,
  firestore,
  profilesCollection,
} from 'services/firebase'

import { categories, initialCategories } from './categories'
import type { Data, DataContentOptions } from './types'

export const subscribeData = (
  documentId: string,
  onDataChange: (data: Data[]) => void
): Unsubscribe =>
  onSnapshot(doc(budgetsCollection, documentId), (snapshot) => {
    if (!snapshot.exists()) {
      return void onDataChange(initialCategories)
    }

    const snapshotCategories = snapshot.data().categories

    onDataChange(
      categories.map((category) => ({
        ...category,
        content: snapshotCategories[category.class],
      }))
    )
  })

// FIND BUDGET IDS BY USER ID
export const getBudgetIdsByUserId = async (
  userId: string
): Promise<string[]> => {
  const profileDocumentReference = doc(profilesCollection, userId)
  const profileDocumentSnapshot = await getDoc(profileDocumentReference)

  if (!profileDocumentSnapshot.exists()) {
    return []
  }

  const snapshotBudgets = profileDocumentSnapshot.data().budgets

  const budgetIds = snapshotBudgets.map(({ id }) => id)

  return budgetIds
}

// ADD NEW BUDGET
export const createNewBudget = async (
  userId: string,
  newBudgetTitle: string
): Promise<void> => {
  const profileDocumentReference = doc(profilesCollection, userId)

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
      const profileSnapshot = await transaction.get(profileDocumentReference)

      if (!profileSnapshot.exists()) {
        return
      }

      const snapshotBudgets = profileSnapshot.data().budgets

      transaction.update(profileDocumentReference, {
        budgets: [...snapshotBudgets, newBudgetReference],
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
  const profileDocumentReference = doc(profilesCollection, userId)
  const profileDocumentSnapshot = await getDoc(profileDocumentReference)

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
  const profileDocumentReference = doc(profilesCollection, userId)

  try {
    await runTransaction(firestore, async (transaction) => {
      const profileSnapshot = await transaction.get(profileDocumentReference)

      if (!profileSnapshot.exists()) {
        return
      }

      transaction.update(profileDocumentReference, {
        'active-budget': doc(budgetsCollection, newActiveBudgetId),
      })
    })
  } catch (error) {
    console.error('Transaction failed: ', error)
  }
}

// ADD NEW ITEM TO BUDGET
export const addNewItemToBudget = async (
  budgetId: string,
  className: string,
  newContentOption: DataContentOptions
): Promise<void> => {
  const budgetDocumentReference = doc(budgetsCollection, budgetId)

  try {
    await runTransaction(firestore, async (transaction) => {
      const budgetSnapshot = await transaction.get(budgetDocumentReference)

      if (!budgetSnapshot.exists()) {
        return
      }

      const contentOptions = budgetSnapshot.data().categories[className]

      transaction.update(budgetDocumentReference, {
        [`categories.${className}`]: [
          ...contentOptions,
          {
            note: null,
            ...newContentOption,
          },
        ],
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
  contentOptionIndex: number
): Promise<void> => {
  const budgetDocumentReference = doc(budgetsCollection, budgetId)

  try {
    await runTransaction(firestore, async (transaction) => {
      const budgetSnapshot = await transaction.get(budgetDocumentReference)

      if (!budgetSnapshot.exists()) {
        return
      }

      const contentOptions = budgetSnapshot.data().categories[className]

      transaction.update(budgetDocumentReference, {
        [`categories.${className}`]: contentOptions.filter(
          (_, index) => index !== contentOptionIndex
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
  contentOptionIndex: number,
  newNote: string | null
): Promise<void> => {
  const budgetDocumentReference = doc(budgetsCollection, budgetId)

  try {
    await runTransaction(firestore, async (transaction) => {
      const budgetSnapshot = await transaction.get(budgetDocumentReference)

      if (!budgetSnapshot.exists()) {
        return
      }

      const contentOptions = budgetSnapshot.data().categories[className]

      const newContentOption = {
        ...contentOptions[contentOptionIndex],
        note: newNote,
      }

      transaction.update(budgetDocumentReference, {
        [`categories.${className}`]: contentOptions.map(
          (contentOption, index) =>
            index === contentOptionIndex ? newContentOption : contentOption
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
