// eslint-disable-next-line no-warning-comments
// TODO: Add defaultProps!
/* eslint-disable react/require-default-props */
import type { ButtonHTMLAttributes, FC, MouseEventHandler, ReactElement } from 'react'
import './index.css'

type Props = {
  className?: string
  title?: string
  shape?: 'circular' | 'rectangular'
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  value?: string | ReactElement
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<Props> = ({ className, title, shape, onClick, type, value }) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} className={`${shape} ${className}`} title={title} onClick={onClick}>
    {value}
  </button>
)

