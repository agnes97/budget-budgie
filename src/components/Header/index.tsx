import type { FC } from 'react'

import { Nav } from 'components/Nav'

import { StyledHeader } from './styled'

import budgie from '../../assets/budgie.png'

export const Header: FC = () => (
  <StyledHeader>
    <Nav />
    <section className="page-title">
      <img className="budgie" src={budgie} alt="Budget Budgie!" />
      <h1>BUDGET BUDGIE</h1>
      <img className="budgie" src={budgie} alt="Budget Budgie!" />
    </section>
  </StyledHeader>
)
