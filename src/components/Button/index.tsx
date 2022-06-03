import type {
  ButtonHTMLAttributes,
  FC,
  MouseEventHandler,
  ReactElement,
} from 'react'
import './index.css'

interface Props {
  className?: string
  title?: string
  shape?: 'circular' | 'rectangular'
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  value?: string | ReactElement
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<Props> = ({
  className,
  title,
  shape,
  onClick,
  type,
  value,
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={`${shape} ${className}`}
    title={title}
    onClick={onClick}
  >
    {value}
  </button>
)

Button.defaultProps = {
  className: '',
  title: '',
  shape: 'rectangular',
  type: 'button',
  value: 'CLICK HERE',
  onClick: () => null,
}
