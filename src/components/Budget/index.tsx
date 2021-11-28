import React, {useState, useEffect} from "react";
import "./index.css"

import { getData } from "services/budget";
import { Data } from '../../../public/data/types'
import ArticlesFirstChild from "./components/ArticlesFirstChild";
import Articles from "./components/Articles";

const Budget: React.FC = () => {
  const [budgetData, setBudgetData] = useState<Data[]>([])

  useEffect(() => {
    getData().then((budgetData) => setBudgetData(budgetData))
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
