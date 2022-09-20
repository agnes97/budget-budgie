import type { ButtonHTMLAttributes, FC } from 'react'

import { Button } from 'components/Button'
import { useUser } from 'contexts/User'

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

export const ButtonContainer: FC<Props> = ({ buttonsParameters, title }) => {
  const { user } = useUser()

  return (
    <StyledButtonContainer>
      {title && <h2>{title}</h2>}
      <div className={`button-list ${!user && 'disabled-overlay'}`}>
        {buttonsParameters.map(({ value, form, type, onClick }) => (
          <Button
            key={value}
            type={type}
            form={form}
            onClick={user ? onClick : () => null}
            shape="rectangular"
          >
            {value}
          </Button>
        ))}
      </div>
    </StyledButtonContainer>
  )
}

ButtonContainer.defaultProps = {
  title: '',
}
