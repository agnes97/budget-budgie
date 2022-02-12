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
    budgetData: Data[]
}

const BudgetContext = createContext<BudgetContextType>({ budgetData: initialCategories })

export const BudgetDataProvider: FC = ({ children }) => {
    const [budgetData, setBudgetData] = useState<Data[]>(initialCategories)

    useEffect(() => {
        const unsubscribe = subscribeData("showcase", (budgetData) => setBudgetData(budgetData))
        return () => unsubscribe()
    }, [setBudgetData])

    return (
        <BudgetContext.Provider value={{ budgetData }}>
            {children}
        </BudgetContext.Provider>
    )
}

export const useBudgetData = (): BudgetContextType => useContext(BudgetContext)
