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
import { addNewItemToBudget, deleteItemFromBudget, getBudgetIdsByUser, setNoteToBudgetCategoryItem, subscribeData } from 'services/budget'
import { initialCategories } from 'services/budget/categories'
import type { Data, DataContentOptions } from 'services/budget/types'

type BudgetContextType = {
  budgetData: Data[]
  expensesData: Data[]
  incomeData: Data | undefined
  addNewItem: (className: string, newItem: DataContentOptions) => Promise<void>
  deleteItem: (className: string, deletedItemIndex: number) => Promise<void>
  setNoteToCategoryItem: (
    className: string,
    categoryItemIndex: number,
    newNote: string | null,
  ) => Promise<void>
}

const BudgetContext = createContext<BudgetContextType>({
  budgetData: initialCategories,
  expensesData: [],
  incomeData: { class: 'have-month', title: 'WHAT WE HAVE', subtitle: 'per month', content: [] },
  addNewItem: async () => { },
  deleteItem: async () => { },
  setNoteToCategoryItem: async () => { },
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
      return (await getBudgetIdsByUser(user.uid))[0] ?? defaultBudgetId
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getBudgetByUser().then(budgetId => setBudgetId(budgetId))
  }, [user, setBudgetId])

  useEffect(() => {
    const unsubscribe = subscribeData(budgetId, budgetData => setBudgetData(budgetData))
    return () => unsubscribe()
  }, [setBudgetData, budgetId])

  // eslint-disable-next-line no-warning-comments
  // TODO: Reduce to get both in one loop of budgetData!
  const incomeData = budgetData.find(categories => categories.class === 'have-month')
  const expensesData = budgetData.filter(categories => categories.class !== 'have-month')

  const addNewItem = useCallback(
    async (className: string, newItem: DataContentOptions) =>
      await addNewItemToBudget(budgetId, className, newItem),
    [budgetId],
  )

  const deleteItem = useCallback(
    async (className: string, deletedItemIndex: number) =>
      await deleteItemFromBudget(budgetId, className, deletedItemIndex),
    [budgetId],
  )

  const setNoteToCategoryItem = useCallback(
    async (
      className: string,
      categoryItemIndex: number,
      newNote: string | null,
    ) => await setNoteToBudgetCategoryItem(budgetId, className, categoryItemIndex, newNote),
    [budgetId],
  )

  const value = useMemo(() => ({
    budgetData,
    expensesData,
    incomeData,
    setNoteToCategoryItem,
    addNewItem,
    deleteItem,
  }), [addNewItem, deleteItem, budgetData, expensesData, incomeData, setNoteToCategoryItem])

  return (
    // eslint-disable-next-line no-warning-comments
    // TODO: Fix the following linting problem:
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  )
}

export const useBudgetData = (): BudgetContextType => useContext(BudgetContext)
