import { FC } from 'react'
import { countCost, countMonthlyWage } from 'services/budget'
import { Data } from '../../../../services/budget/types'
import './index.css'

type Props = {
    budgetData: Data[]
}

export const ArticlesTotalFirstChild: FC<Props> = ({ budgetData }) => {
    const monthlyEarnings = countMonthlyWage(budgetData, 0)
    const yearlyEarning = ((countMonthlyWage(budgetData, 0) ?? 0) * 12)
    const monthlyExpenses = countCost(budgetData, 1, "cost") ?? 0
    const yearlyExpenses = monthlyExpenses * 12
    const yearlySavings = yearlyEarning - (monthlyExpenses * 12)

    return (
        (budgetData[0].class === "have-month")
            ? // DISPLAY TOTAL OF WAGES IN THE FIRST COLUMN
            <section className="total">
                <div>
                    <span className="title">MONTHLY:</span>
                    <div className="numbers-container">
                        <span className="number earnings">{monthlyEarnings?.toLocaleString()}</span>
                        <span className="number expenses">{monthlyExpenses?.toLocaleString()}</span>
                    </div>
                </div>
                <div>
                    <span className="title">YEARLY:</span>
                    <div className="numbers-container">
                        <span className="number earnings">{yearlyEarning?.toLocaleString()}</span>
                        <span className="number expenses">{yearlyExpenses?.toLocaleString()}</span>
                        <span className="number savings">{yearlySavings?.toLocaleString()}</span>
                    </div>
                </div>
            </section>
            : null
    )
}

export const ArticlesTotal: FC<Props> = ({ budgetData }) => (
    // DISPLAY TOTAL COST OF MONTHLY NEEDS IN THE SECOND COLUMN
    <section className="total">
        <span className="column-total">{countCost(budgetData, 1, "cost")?.toLocaleString()}</span>
    </section>
)