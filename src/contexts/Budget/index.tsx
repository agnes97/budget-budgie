import {
    FC,
    createContext,
    useContext,
    useState,
    useEffect
} from 'react'
import { subscribeData } from 'services/budget'
import { initialCategories } from 'services/budget/categories'
import { Data } from 'services/budget/types'

type BudgetContextType = {
    budgetData: Data[],
    expensesData: Data[],
    incomeData: Data | undefined
}

const BudgetContext = createContext<BudgetContextType>({ 
    budgetData: initialCategories,
    expensesData: [],
    incomeData: { class: 'have-month', title: 'WHAT WE HAVE', subtitle: 'per month', content: [] },
})

export const BudgetDataProvider: FC = ({ children }) => {
    const [budgetData, setBudgetData] = useState<Data[]>(initialCategories)

    useEffect(() => {
        const unsubscribe = subscribeData("showcase", (budgetData) => setBudgetData(budgetData))
        return () => unsubscribe()
    }, [setBudgetData])

    // TODO: Reduce to get both in one loop of budgetData!
    const incomeData = budgetData.find(categories => (categories.class === 'have-month'))
    const expensesData = budgetData.filter(categories => (categories.class !== 'have-month'))

    return (
        <BudgetContext.Provider value={{ budgetData, expensesData, incomeData }}>
            {children}
        </BudgetContext.Provider>
    )
}

export const useBudgetData = (): BudgetContextType => useContext(BudgetContext)
