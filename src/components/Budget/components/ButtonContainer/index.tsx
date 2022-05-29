import type { ButtonHTMLAttributes, FC } from 'react'

import { Button } from 'components/Button'
import './index.css'

interface ButtonParameters {
  value: string
  onClick?: () => void
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

interface Props {
  // TODO: eslint-disable-next-line react/require-default-props
  // eslint-disable-next-line react/require-default-props
  title?: string
  buttonsParameters: ButtonParameters[]
}

export const ButtonContainer: FC<Props> = ({ buttonsParameters, title }) => (
  <div className="button-container">
    {title && <h2>{title}</h2>}
    <div className="button-list">
      {buttonsParameters.map(({ value, type, onClick }) => (
        <Button
          key={value}
          value={value}
          type={type}
          onClick={onClick}
          shape="rectangular"
        />
      ))}
    </div>
  </div>
)
