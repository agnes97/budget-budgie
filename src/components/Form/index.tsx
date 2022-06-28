import { useState } from 'react'
import type { FC, InputHTMLAttributes } from 'react'

import { Button } from 'components/Button'

import { StyledForm } from './styled'

interface FormInput extends InputHTMLAttributes<HTMLInputElement> {
  typeOfInput: 'input' | 'textarea'
  identifier: string
  label: string
}

export interface FormDataType {
  [key: FormInput['identifier']]: string
}

interface FormProps {
  actionOnSubmit:
    | ((formData: FormDataType) => Promise<void>)
    | ((formData: FormDataType) => void)
  displayLabels?: boolean
  formIdentifier: string
  formInputs: FormInput[]
  submitButtonText?: string
}

export const Form: FC<FormProps> = ({
  actionOnSubmit,
  displayLabels,
  formIdentifier,
  formInputs,
  submitButtonText,
}) => {
  const [formData, setFormData] = useState<FormDataType>({})
  const [titleAfterButtonText, setTitleAfterButtonText] = useState<
    string | null
  >(null)

  const handleFormData = async (): Promise<void> => {
    await actionOnSubmit(formData)
    setFormData({})
  }

  const handleInputChange = (
    inputEvent:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = inputEvent.target

    if (name === 'title') {
      setTitleAfterButtonText(value)
    }

    setFormData((previousFormData) => ({
      ...previousFormData,
      [name]: value.toLocaleString(),
    }))
  }

  return (
    <StyledForm
      id={formIdentifier}
      onSubmit={(formEvent) => {
        formEvent.preventDefault()
        void handleFormData()
      }}
    >
      <div className="form__children">
        {formInputs.map(({ typeOfInput, identifier, label, placeholder }) => (
          <div key={identifier}>
            {displayLabels && <label htmlFor={identifier}>{label}</label>}
            {typeOfInput === 'input' && (
              <input
                name={identifier}
                value={formData.identifier}
                placeholder={placeholder}
                onChange={handleInputChange}
              />
            )}
            {typeOfInput === 'textarea' && (
              <textarea
                name={identifier}
                value={formData.identifier}
                placeholder={placeholder}
                rows={4}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
      </div>
      {submitButtonText && (
        <Button shape="rectangular" type="submit" form={formIdentifier}>
          {submitButtonText}
          {titleAfterButtonText && (
            <span className="title-after-button-text">
              &apos;{titleAfterButtonText}&apos;
            </span>
          )}
        </Button>
      )}
    </StyledForm>
  )
}

Form.defaultProps = {
  displayLabels: true,
  submitButtonText: '',
}
