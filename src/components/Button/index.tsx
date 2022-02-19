// eslint-disable-next-line no-warning-comments
// TODO: Add defaultProps!
/* eslint-disable react/require-default-props */
import type { FC, MouseEventHandler, ReactElement } from 'react'
import './index.css'

type Props = {
  className?: string
  title?: string
  type?: 'circular' | 'rectangular'
  value?: string | ReactElement
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<Props> = ({ className, title, type, onClick, value }) => (
  // eslint-disable-next-line react/button-has-type
  <button className={`${type} ${className}`} title={title} onClick={onClick}>
    {value}
  </button>
)

