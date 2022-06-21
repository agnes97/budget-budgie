import type { FC } from 'react'

import { Nav } from 'components/Nav'
import { useBudgetData } from 'contexts/Budget'
import { useUser } from 'contexts/User'

import { StyledHeader } from './styled'

import budgie from '../../assets/budgie.png'

export const Header: FC = () => {
  const { user } = useUser()
  const { budgetInfo } = useBudgetData()

  return (
    <StyledHeader animate={!!user}>
      <Nav />
      <section className="page-title-container">
        <div className="page-title">
          <img className="budgie" src={budgie} alt="Budget Budgie!" />
          <h1>{!budgetInfo.title ? 'BUDGET BUDGIE' : budgetInfo.title}</h1>
          <img className="budgie" src={budgie} alt="Budget Budgie!" />
        </div>
      </section>
      {budgetInfo.description && (
        <section className="description">{budgetInfo.description}</section>
      )}
    </StyledHeader>
  )
}
