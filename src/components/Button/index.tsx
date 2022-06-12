import type { ButtonHTMLAttributes, FC } from 'react'

import { StyledButton } from './styled'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: 'circular' | 'rectangular'
}

export const Button: FC<Props> = (props) => {
  const { shape, className, children } = props

  return (
    <StyledButton type="button" {...props} className={`${shape} ${className}`}>
      {children}
    </StyledButton>
  )
}

Button.defaultProps = {
  shape: 'rectangular',
}
