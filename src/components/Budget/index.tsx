import { FC } from "react";
import "./index.css"

import { Income } from "./components/Income";
import { Expense } from "./components/Expense";
import { useBudgetData } from "contexts/Budget";

export const Budget: FC = () => {
  const { expensesData, incomeData } = useBudgetData();

  return (
    <section>
      <Income incomeData={incomeData} />
      {expensesData.map((expenseCategoryData, index: number) =>
        <Expense key={index} expenseCategoryData={expenseCategoryData} />
      )}
    </section>
  )
}
