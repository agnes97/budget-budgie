import type { FC } from 'react'

import { useBudgetData } from 'contexts/Budget'

import { Expense } from './components/Expense'
import { Income } from './components/Income'
import { StyledBudget } from './styled'

export const Budget: FC = () => {
  const { expensesData, incomeData } = useBudgetData()

  return (
    <StyledBudget>
      <Income incomeData={incomeData} />
      {expensesData.map((expenseCategoryData) => (
        <Expense
          key={expenseCategoryData.class}
          expenseCategoryData={expenseCategoryData}
        />
      ))}
    </StyledBudget>
  )
}
