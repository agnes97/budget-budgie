import { FC } from "react";
import "./index.css"

import { ArticlesFirstChild } from "./components/ArticlesFirstChild";
import { Articles } from "./components/Articles";
import { useBudgetData } from "contexts/Budget";

export const Budget: FC = () => {
  const { budgetData } = useBudgetData();

  return (
    <section>
      {budgetData.map((_, index: number) =>
        /* DISPLAY EITHER FIRST OR ALL OTHER ARTICLES */
        (index === 0)
          ? <ArticlesFirstChild key={index} budgetData={budgetData} index={index} />
          : <Articles key={index} budgetData={budgetData} index={index} />
      )}
    </section>
  )
}
