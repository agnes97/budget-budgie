import type { FC } from 'react'
import './index.css'

import { useBudgetData } from 'contexts/Budget'

import { Expense } from './components/Expense'
import { Income } from './components/Income'

export const Budget: FC = () => {
  const { expensesData, incomeData } = useBudgetData()

  return (
    <section>
      <Income incomeData={incomeData} />
      {expensesData.map((expenseCategoryData) => (
        <Expense
          key={expenseCategoryData.class}
          expenseCategoryData={expenseCategoryData}
        />
      ))}
    </section>
  )
}
