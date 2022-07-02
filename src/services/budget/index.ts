import type { DocumentReference, Unsubscribe } from 'firebase/firestore'
import {
  deleteDoc,
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
import type { BudgetDocument } from 'services/firebase/types'

import { categories, initialCategories } from './categories'
import type { Budget, BudgetInfo, Data, DataContentOptions } from './types'

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
export const getBudgetsByUserId = async (userId: string): Promise<Budget[]> => {
  const profileDocumentReference = doc(profilesCollection, userId)
  const profileDocumentSnapshot = await getDoc(profileDocumentReference)

  if (!profileDocumentSnapshot.exists()) {
    return []
  }

  const snapshotBudgetReferences = profileDocumentSnapshot.data().budgets

  const budgetSnapshots = await Promise.all(
    snapshotBudgetReferences.map(
      async (budgetReference) => await getDoc(budgetReference)
    )
  )

  return budgetSnapshots.reduce<Budget[]>(
    (budgets, budgetSnapshot) =>
      budgetSnapshot.exists()
        ? [...budgets, { id: budgetSnapshot.id, ...budgetSnapshot.data() }]
        : budgets,
    []
  )
}

// UPDATE ACTIVE BUDGET
export const setActiveBudgetByUserId = async (
  userId: string,
  newActiveBudgetId: string
): Promise<Budget> => {
  const profileDocumentReference = doc(profilesCollection, userId)

  return await runTransaction(
    firestore,
    async (transaction): Promise<Budget> => {
      const profileSnapshot = await transaction.get(profileDocumentReference)

      if (!profileSnapshot.exists()) {
        throw new Error(`User with ID "${userId}" doesn't exist!`)
      }

      const activeBudgetReference = doc(budgetsCollection, newActiveBudgetId)

      const activeBudgetSnapshot = await getDoc(activeBudgetReference)

      if (!activeBudgetSnapshot.exists()) {
        throw new Error(`Budget with ID "${newActiveBudgetId}" doesn't exist.`)
      }

      transaction.update(profileDocumentReference, {
        'active-budget': activeBudgetReference,
      })

      return { id: activeBudgetSnapshot.id, ...activeBudgetSnapshot.data() }
    }
  )
}

// ADD NEW BUDGET
export const createNewBudget = async (
  userId: string,
  newBudgetTitle: string,
  newBudgetDescription: string
): Promise<void> => {
  const profileDocumentReference = doc(profilesCollection, userId)

  const initialCategoriesMap = Object.fromEntries(
    initialCategories.map((category) => [category.class, category.content])
  )

  // Creates new budget document with auto-generated id!
  const newBudgetReference = await addDoc(collection(firestore, 'budgets'), {
    title: newBudgetTitle,
    description: newBudgetDescription,
    categories: initialCategoriesMap,
    owners: [userId],
  })

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

  await setActiveBudgetByUserId(userId, newBudgetReference.id)
}

export const cloneBudget = async (
  budgetId: string
): Promise<DocumentReference<BudgetDocument>> => {
  const budgetDocumentReference = doc(budgetsCollection, budgetId)

  return await runTransaction(firestore, async (transaction) => {
    const budgetSnapshot = await transaction.get(budgetDocumentReference)

    if (!budgetSnapshot.exists()) {
      throw new Error(
        `Budget for clonning with ID "${budgetId}" does not exist!`
      )
    }

    return await addDoc(budgetsCollection, budgetSnapshot.data())
  })
}

// REMOVE BUDGET FROM PROFILE
// (e.g. when deleting budgets)
export const removeBudgetFromProfile = async (
  userId: string,
  budgetToRemoveId: string
): Promise<void> => {
  const profileDocumentReference = doc(profilesCollection, userId)

  try {
    await runTransaction(firestore, async (transaction) => {
      const profileDocumentSnapshot = await transaction.get(
        profileDocumentReference
      )

      if (!profileDocumentSnapshot.exists()) {
        return
      }

      const profileBudgetsArray = profileDocumentSnapshot.data().budgets

      transaction.update(profileDocumentReference, {
        ['budgets']: profileBudgetsArray.filter(
          (budget) => budget.id !== budgetToRemoveId
        ),
      })
    })
  } catch (error) {
    console.error(error)
  }
}

// DELETE BUDGET
export const deleteBudgetById = async (
  userId: string,
  newActiveBudgetId: string,
  deletedBudgetId: string,
  deletedBudgetTitle: string,
  deletedBudgetTitleConfirmation: string
): Promise<void> => {
  const budgetDocumentReference = doc(budgetsCollection, deletedBudgetId)

  const profileDocumentReference = doc(profilesCollection, userId)
  const profileDocumentSnapshot = await getDoc(profileDocumentReference)

  if (!profileDocumentSnapshot.exists()) {
    throw new Error(
      `User with ID "${userId}" doesn't exist or doesn't have profile!`
    )
  }

  const budgetsByUserProfileReference = profileDocumentSnapshot.data().budgets

  const doesUserOwnBudget = budgetsByUserProfileReference.find(
    (usersBudgetById) => usersBudgetById.id === deletedBudgetId
  )

  if (!doesUserOwnBudget) {
    throw new Error(
      `You don't own budget "${deletedBudgetTitle}", therefore you cannot delete it!`
    )
  }

  // Don't throw error here!
  if (deletedBudgetTitle !== deletedBudgetTitleConfirmation) {
    throw new Error(
      `Budget title "${deletedBudgetTitle}" does not correspond with your confirmation "${deletedBudgetTitleConfirmation}"!`
    )
  }

  // Set new active budget,
  // > then delete current budget
  // > then remove it from profile!
  await setActiveBudgetByUserId(userId, newActiveBudgetId)
  await deleteDoc(budgetDocumentReference)
  await removeBudgetFromProfile(userId, deletedBudgetId)
}

// FIND ACTIVE BUDGET
export const getActiveBudgetByUserId = async (
  userId: string
): Promise<Budget | null> => {
  const profileDocumentReference = doc(profilesCollection, userId)
  const profileDocumentSnapshot = await getDoc(profileDocumentReference)

  if (!profileDocumentSnapshot.exists()) {
    return null // Don't throw error here! Interrupts creating profile during sign up.
  }

  const activeBudgetReference = profileDocumentSnapshot.data()['active-budget']

  const budgetDocumentSnapshot = await getDoc(activeBudgetReference)

  if (!budgetDocumentSnapshot.exists()) {
    throw new Error(
      `Budget with ID "${activeBudgetReference.id}" doesn't exist!`
    )
  }

  return { id: budgetDocumentSnapshot.id, ...budgetDocumentSnapshot.data() }
}

// UPDATE BUDGET INFO
export const updateBudgetInfoByBudgetId = async (
  updatedField: keyof BudgetInfo,
  budgetId: string,
  newFieldContent: string
): Promise<void> => {
  const budgetDocumentReference = doc(budgetsCollection, budgetId)

  try {
    await runTransaction(firestore, async (transaction) => {
      const budgetSnapshot = await transaction.get(budgetDocumentReference)

      if (!budgetSnapshot.exists()) {
        throw new Error(`Budget with ID "${budgetId}" doesn't exist!`)
      }

      transaction.update(budgetDocumentReference, {
        [updatedField]: newFieldContent,
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
            done: 0,
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

// SET BUDGET CATEGORY ITEM AS DONE
export const setBudgetCategoryItemAsDone = async (
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

      const newContentOption = {
        ...contentOptions[contentOptionIndex],
        done: 1,
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
