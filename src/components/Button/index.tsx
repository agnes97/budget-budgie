import type { ButtonHTMLAttributes, FC } from 'react'
import './index.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: 'circular' | 'rectangular'
}

export const Button: FC<Props> = (props) => {
  const { shape, className, children } = props

  return (
    <button type="button" {...props} className={`${shape} ${className}`}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  shape: 'rectangular',
}
