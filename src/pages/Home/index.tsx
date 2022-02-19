import type { FC } from 'react'

import { Budget } from 'components/Budget'
import { Footer } from 'components/Footer'
import { Header } from 'components/Header'
import { BudgetDataProvider } from 'contexts/Budget'

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

