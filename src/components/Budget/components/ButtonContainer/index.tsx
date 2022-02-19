import type { FC } from 'react'

import { Button } from 'components/Button'
import './index.css'

type ButtonParameters = {
  value: string
  onClick: () => void
}

type Props = {
  // eslint-disable-next-line no-warning-comments
  // TODO: eslint-disable-next-line react/require-default-props
  // eslint-disable-next-line react/require-default-props
  title?: string
  buttonsParameters: ButtonParameters[]
}

export const ButtonContainer: FC<Props> = ({ buttonsParameters, title }) => (
  <div className="button-container">
    {title && <h2>{title}</h2>}
    <div className="button-list">
      {buttonsParameters.map(({ value, onClick }) => (
        <Button
          key={value}
          value={value}
          onClick={onClick}
          type="rectangular"
        />
      ))}
    </div>
  </div>
)
