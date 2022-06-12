import type { ButtonHTMLAttributes, FC } from 'react'

import { Button } from 'components/Button'

import { StyledButtonContainer } from './styled'

interface ButtonParameters {
  value: string
  onClick?: () => void
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

interface Props {
  title?: string
  buttonsParameters: ButtonParameters[]
}

export const ButtonContainer: FC<Props> = ({ buttonsParameters, title }) => (
  <StyledButtonContainer>
    {title && <h2>{title}</h2>}
    <div className="button-list">
      {buttonsParameters.map(({ value, type, onClick }) => (
        <Button key={value} type={type} onClick={onClick} shape="rectangular">
          {value}
        </Button>
      ))}
    </div>
  </StyledButtonContainer>
)

ButtonContainer.defaultProps = {
  title: '',
}
