import type { FC } from 'react'

import { StyledFooter } from './styled'

const currentYear: number = new Date().getFullYear()

export const Footer: FC = () => (
  <StyledFooter>
    <p>&copy; Jana Chaloupková 2021 - {currentYear}</p>
  </StyledFooter>
)
