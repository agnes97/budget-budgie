/* eslint-disable no-empty-function */
import type { FC } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useUser } from 'contexts/User'
import {
  addNewItemToBudget,
  deleteItemFromBudget,
  getActiveBudgetByUserId,
  setActiveBudgetByUserId,
  setNoteToBudgetCategoryItem,
  subscribeData,
} from 'services/budget'
import { initialCategories } from 'services/budget/categories'
import type { Data, DataContentOptions } from 'services/budget/types'

interface BudgetContextType {
  budgetData: Data[]
  expensesData: Data[]
  incomeData: Data | undefined
  addNewItem: (className: string, newItem: DataContentOptions) => Promise<void>
  deleteItem: (className: string, deletedItemIndex: number) => Promise<void>
  setActiveBudget: (newActiveBudgetId: string) => Promise<void>
  setNoteToCategoryItem: (
    className: string,
    categoryItemIndex: number,
    newNote: string | null,
  ) => Promise<void>
}

const BudgetContext = createContext<BudgetContextType>({
  budgetData: initialCategories,
  expensesData: [],
  incomeData: {
    class: 'have-month',
    title: 'WHAT WE HAVE',
    subtitle: 'per month',
    content: [],
  },
  addNewItem: async () => {},
  deleteItem: async () => {},
  setActiveBudget: async () => {},
  setNoteToCategoryItem: async () => {},
})

export const BudgetDataProvider: FC = ({ children }) => {
  const { user } = useUser()
  const [budgetData, setBudgetData] = useState<Data[]>(initialCategories)

  const defaultBudgetId = 'showcase'
  const [budgetId, setBudgetId] = useState(defaultBudgetId)

  useEffect(() => {
    const getBudgetByUser = async (): Promise<string> => {
      if (!user) {
        return defaultBudgetId
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      return await getActiveBudgetByUserId(user.uid) ?? defaultBudgetId
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    void getBudgetByUser().then(budgetId => void setBudgetId(budgetId))
  }, [user, setBudgetId])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const unsubscribe = subscribeData(budgetId, budgetData => void setBudgetData(budgetData))
    return () => void unsubscribe()
  }, [setBudgetData, budgetId])

  // TODO: Reduce to get both in one loop of budgetData!
  const incomeData = budgetData.find(categories => categories.class === 'have-month')
  const expensesData = budgetData.filter(categories => categories.class !== 'have-month')

  const setActiveBudget = useCallback(async (newActiveBudgetId: string) => {
    if (!user) {
      return
    }

    if (budgetId === newActiveBudgetId) {
      return
    }

    await setActiveBudgetByUserId(user.uid, newActiveBudgetId)
    setBudgetId(newActiveBudgetId)
  }, [budgetId, user])

  // void setActiveBudgetByUserId(user?.uid, 'showcase')
  // void setActiveBudget('showcase')

  const addNewItem = useCallback(
    async (className: string, newItem: DataContentOptions) =>
      void await addNewItemToBudget(budgetId, className, newItem),
    [budgetId],
  )

  const deleteItem = useCallback(
    async (className: string, deletedItemIndex: number) =>
      void await deleteItemFromBudget(budgetId, className, deletedItemIndex),
    [budgetId],
  )

  const setNoteToCategoryItem = useCallback(
    async (
      className: string,
      categoryItemIndex: number,
      newNote: string | null,
    ) =>
      void await setNoteToBudgetCategoryItem(
        budgetId,
        className,
        categoryItemIndex,
        newNote,
      ),
    [budgetId],
  )

  const value = useMemo(
    () => ({
      budgetData,
      expensesData,
      incomeData,
      setActiveBudget,
      setNoteToCategoryItem,
      addNewItem,
      deleteItem,
    }),
    [
      addNewItem,
      deleteItem,
      budgetData,
      expensesData,
      incomeData,
      setActiveBudget,
      setNoteToCategoryItem,
    ],
  )

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  )
}

export const useBudgetData = (): BudgetContextType => useContext(BudgetContext)
