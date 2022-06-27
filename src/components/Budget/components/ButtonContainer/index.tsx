import type { ButtonHTMLAttributes, FC } from 'react'

import { Button } from 'components/Button'

import { StyledButtonContainer } from './styled'

interface ButtonParameters {
  form?: string
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
      {buttonsParameters.map(({ value, form, type, onClick }) => (
        <Button
          key={value}
          type={type}
          form={form}
          onClick={onClick}
          shape="rectangular"
        >
          {value}
        </Button>
      ))}
    </div>
  </StyledButtonContainer>
)

ButtonContainer.defaultProps = {
  title: '',
}
