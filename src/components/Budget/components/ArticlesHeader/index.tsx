import type { FC } from 'react'

import { StyledArticleHeader } from './styled'

import type { Data } from '../../../../services/budget/types'

interface Props {
  title: Data['title']
  subtitle: Data['subtitle']
}

export const ArticlesHeader: FC<Props> = ({ title, subtitle }) => (
  <StyledArticleHeader>
    <h2>{title}</h2>
    <h3>{subtitle}</h3>
  </StyledArticleHeader>
)
