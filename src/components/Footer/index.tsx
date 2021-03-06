import type { FC } from 'react'

import { StyledFooter } from './styled'

const currentYear: number = new Date().getFullYear()

export const Footer: FC = () => (
  <StyledFooter>
    <p>&copy; Jana Chaloupkov√° 2021 - {currentYear}</p>
  </StyledFooter>
)
