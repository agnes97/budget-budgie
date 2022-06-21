import type { FC } from 'react'

import { Nav } from 'components/Nav'
import { useBudgetData } from 'contexts/Budget'

import { StyledHeader } from './styled'

import budgie from '../../assets/budgie.png'

export const Header: FC = () => {
  const { budgetInfo } = useBudgetData()

  return (
    <StyledHeader>
      <Nav />
      <section className="page-title">
        <img className="budgie" src={budgie} alt="Budget Budgie!" />
        <h1>{!budgetInfo.title ? 'BUDGET BUDGIE' : budgetInfo.title}</h1>
        <img className="budgie" src={budgie} alt="Budget Budgie!" />
      </section>
      {budgetInfo.description && (
        <section className="description">{budgetInfo.description}</section>
      )}
    </StyledHeader>
  )
}
