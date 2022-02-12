import { FC } from "react";

import { Header } from "components/Header";
import { Budget } from "components/Budget"
import { Footer } from "components/Footer";
import { BudgetDataProvider } from "contexts/Budget";

export const Home: FC = () => (
  <>
    <Header />
    <main>
      <BudgetDataProvider>
        <Budget />
      </BudgetDataProvider>
    </main>
    <Footer />
  </>
)

