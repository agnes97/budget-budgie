import type { FC } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react'

import { useUser } from 'contexts/User'
import { getBudgetIdsByUser, setNoteToBudgetCategoryItem, subscribeData } from 'services/budget'
import { initialCategories } from 'services/budget/categories'
import type { Data } from 'services/budget/types'

type BudgetContextType = {
  budgetData: Data[]
  expensesData: Data[]
  incomeData: Data | undefined
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
  // eslint-disable-next-line no-empty-function
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

  const setNoteToCategoryItem = useCallback(
    async (
      className: string,
      categoryItemIndex: number,
      newNote: string | null,
    ) => await setNoteToBudgetCategoryItem(budgetId, className, categoryItemIndex, newNote),
    [budgetId],
  )

  return (
    // eslint-disable-next-line no-warning-comments
    // TODO: Fix the following linting problem:
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <BudgetContext.Provider value={{ budgetData, expensesData, incomeData, setNoteToCategoryItem }}>
      {children}
    </BudgetContext.Provider>
  )
}

export const useBudgetData = (): BudgetContextType => useContext(BudgetContext)
