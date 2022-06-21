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
import type {
  Budget,
  BudgetInfo,
  Data,
  DataContentOptions,
} from 'services/budget/types'

interface BudgetContextType {
  budgetData: Data[]
  expensesData: Data[]
  incomeData: Data | undefined
  budgetInfo: BudgetInfo
  addNewItem: (className: string, newItem: DataContentOptions) => Promise<void>
  deleteItem: (className: string, deletedItemIndex: number) => Promise<void>
  setActiveBudget: (newActiveBudgetId: string) => Promise<void>
  setNoteToCategoryItem: (
    className: string,
    categoryItemIndex: number,
    newNote: string | null
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
  budgetInfo: {
    title: '',
    description: '',
  },
  addNewItem: async () => {},
  deleteItem: async () => {},
  setActiveBudget: async () => {},
  setNoteToCategoryItem: async () => {},
})

export const BudgetDataProvider: FC = ({ children }) => {
  const { user } = useUser()
  const [budgetData, setBudgetData] = useState<Data[]>(initialCategories)
  const [budgetInfo, setBudgetInfo] = useState<BudgetInfo>({
    title: '',
    description: '',
  })

  const defaultBudgetId = 'showcase'
  const [budgetId, setBudgetId] = useState(defaultBudgetId)

  useEffect(() => {
    const getBudgetByUser = async (): Promise<Budget | null> => {
      if (!user) {
        return null
      }

      const activeBudget = await getActiveBudgetByUserId(user.uid)
      return activeBudget
    }

    void getBudgetByUser().then((currentBudget) => {
      if (!currentBudget) {
        setBudgetId(defaultBudgetId)
        setBudgetInfo({
          title: '',
          description: '',
        })
        return
      }

      setBudgetId(currentBudget.id)
      setBudgetInfo({
        title: currentBudget.title,
        description: currentBudget.description,
      })
    })
  }, [user, setBudgetId, setBudgetInfo])

  useEffect(() => {
    const unsubscribe = subscribeData(
      budgetId,
      (subscribedBudgetData) => void setBudgetData(subscribedBudgetData)
    )
    return () => void unsubscribe()
  }, [setBudgetData, budgetId])

  const incomeData = budgetData.find(
    (categories) => categories.class === 'have-month'
  )

  const expensesData = budgetData.filter(
    (categories) => categories.class !== 'have-month'
  )

  const setActiveBudget = useCallback(
    async (newActiveBudgetId: string) => {
      if (!user) {
        return
      }

      if (budgetId === newActiveBudgetId) {
        return
      }

      await setActiveBudgetByUserId(user.uid, newActiveBudgetId)
      setBudgetId(newActiveBudgetId)
    },
    [budgetId, user, setBudgetId]
  )

  // void setActiveBudgetByUserId(user?.uid, 'showcase')
  // void setActiveBudget('showcase')

  const addNewItem = useCallback(
    async (className: string, newItem: DataContentOptions) =>
      void (await addNewItemToBudget(budgetId, className, newItem)),
    [budgetId]
  )

  const deleteItem = useCallback(
    async (className: string, deletedItemIndex: number) =>
      void (await deleteItemFromBudget(budgetId, className, deletedItemIndex)),
    [budgetId]
  )

  const setNoteToCategoryItem = useCallback(
    async (
      className: string,
      categoryItemIndex: number,
      newNote: string | null
    ) =>
      void (await setNoteToBudgetCategoryItem(
        budgetId,
        className,
        categoryItemIndex,
        newNote
      )),
    [budgetId]
  )

  const value = useMemo(
    () => ({
      budgetData,
      expensesData,
      incomeData,
      budgetInfo,
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
      budgetInfo,
      setActiveBudget,
      setNoteToCategoryItem,
    ]
  )

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  )
}

export const useBudgetData = (): BudgetContextType => useContext(BudgetContext)
