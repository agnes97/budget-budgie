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
  addNewOwnerToBudget,
  deleteBudgetById,
  deleteItemFromBudget,
  getActiveBudgetByUserId,
  setActiveBudgetByUserId,
  setBudgetCategoryItemDone,
  setNoteToBudgetCategoryItem,
  subscribeData,
  updateBudgetInfoByBudgetId,
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
  addNewOwner: (
    className: string,
    newOwner: DataContentOptions
  ) => Promise<void>
  addNewItem: (className: string, newItem: DataContentOptions) => Promise<void>
  deleteBudget: (
    newActiveBudgetId: string,
    budgetTitleConfirmation: string
  ) => Promise<void>
  deleteItem: (className: string, deletedItemIndex: number) => Promise<void>
  setActiveBudget: (newActiveBudgetId: string) => Promise<void>
  setCategoryItemAsDone: (
    className: string,
    categoryItemIndex: number,
    done: 'setDone' | 'setUndone'
  ) => Promise<void>
  setNoteToCategoryItem: (
    className: string,
    categoryItemIndex: number,
    newNote: string | null
  ) => Promise<void>
  updateBudgetInfo: (
    type: keyof BudgetInfo,
    newBudgetInfo: string
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
  addNewOwner: async () => {},
  addNewItem: async () => {},
  deleteBudget: async () => {},
  deleteItem: async () => {},
  setActiveBudget: async () => {},
  setCategoryItemAsDone: async () => {},
  setNoteToCategoryItem: async () => {},
  updateBudgetInfo: async () => {},
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
          description:
            "This is a Showcase budget meant to show you how your own budgets might look. :) After registration, you'll get your own copy of Showcase to play with.",
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

  const updateBudgetInfo = useCallback(
    async (type: keyof BudgetInfo, newBudgetInfo: string): Promise<void> => {
      await updateBudgetInfoByBudgetId(type, budgetId, newBudgetInfo)
      setBudgetInfo((currentBudget) => ({
        ...currentBudget,
        [type]: newBudgetInfo,
      }))
    },
    [budgetId, setBudgetInfo]
  )

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

      const newActiveBudget = await setActiveBudgetByUserId(
        user.uid,
        newActiveBudgetId
      )

      setBudgetId(newActiveBudget.id)
      setBudgetInfo({
        title: newActiveBudget.title,
        description: newActiveBudget.description,
      })
    },
    [budgetId, user, setBudgetId, setBudgetInfo]
  )

  const deleteBudget = useCallback(
    async (
      newActiveBudgetId: string,
      budgetTitleConfirmation: string
    ): Promise<void> => {
      if (!user) {
        return
      }

      await deleteBudgetById(
        user.uid,
        newActiveBudgetId,
        budgetId,
        budgetInfo.title,
        budgetTitleConfirmation
      )
    },
    [budgetId, budgetInfo.title, user]
  )

  const addNewOwner = useCallback(
    async (className: string, newOwner: DataContentOptions) =>
      void (await addNewOwnerToBudget(budgetId, className, newOwner)),
    [budgetId]
  )

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

  const setCategoryItemAsDone = useCallback(
    async (
      className: string,
      categoryItemIndex: number,
      done: 'setDone' | 'setUndone'
    ): Promise<void> =>
      void (await setBudgetCategoryItemDone(
        budgetId,
        className,
        categoryItemIndex,
        done
      )),
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
      setCategoryItemAsDone,
      setNoteToCategoryItem,
      updateBudgetInfo,
      addNewOwner,
      addNewItem,
      deleteBudget,
      deleteItem,
    }),
    [
      addNewOwner,
      addNewItem,
      deleteBudget,
      deleteItem,
      budgetData,
      expensesData,
      incomeData,
      budgetInfo,
      setActiveBudget,
      setCategoryItemAsDone,
      setNoteToCategoryItem,
      updateBudgetInfo,
    ]
  )

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  )
}

export const useBudgetData = (): BudgetContextType => useContext(BudgetContext)
