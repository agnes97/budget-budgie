import { FC, useState, useEffect} from "react";
import "./index.css"

import { getData } from "services/budget";
import { Data } from '../../services/budget/types'
import ArticlesFirstChild from "./components/ArticlesFirstChild";
import Articles from "./components/Articles";
import { initialCategories } from "services/budget/categories";

const Budget: FC = () => {
  const [budgetData, setBudgetData] = useState<Data[]>(initialCategories)

  useEffect(() => {
    getData("showcase").then((budgetData) => setBudgetData(budgetData))
  }, [setBudgetData])

  return (
    <>
      <section>
      {budgetData.map((_, index: number) =>
        /* DISPLAY EITHER FIRST OR ALL OTHER ARTICLES */
        (index === 0)
          ? <ArticlesFirstChild key={index} budgetData={budgetData} index={index} />
          : <Articles key={index} budgetData={budgetData} index={index} />
      )}
      </section>
    </>
  )
}

export default Budget
