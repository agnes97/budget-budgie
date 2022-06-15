import type { FC } from 'react'
import { useState } from 'react'

import { Button } from 'components/Button'

import { StyledForm } from './styled'

interface FormProps {
  actionOnSubmit: (formData: FormDataType) => Promise<void>
  formInputs: FormInput[]
  submitButtonText: string
}

interface FormInput {
  identifier: string
  label: string
  placeholder: string
}

export interface FormDataType {
  [key: FormInput['identifier']]: string
}

export const Form: FC<FormProps> = ({
  actionOnSubmit,
  formInputs,
  submitButtonText,
}) => {
  const [formData, setFormData] = useState<FormDataType>({})
  const [titleAfterButtonText, setTitleAfterButtonText] = useState<
    string | null
  >(null)

  const clearFormData = () => void setFormData({})

  const handleFormData = async (): Promise<void> => {
    await actionOnSubmit(formData)
    clearFormData()
  }

  const handleInputChange = (
    inputEvent: React.ChangeEvent<HTMLInputElement>
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
      onSubmit={(formEvent) => {
        formEvent.preventDefault()
        void handleFormData()
      }}
    >
      <div className="form__children">
        {formInputs.map(({ identifier, label, placeholder }) => (
          <div key={identifier}>
            <label htmlFor={identifier}>{label}</label>
            <input
              name={identifier}
              value={formData.identifier}
              type="text"
              placeholder={placeholder}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>
      <Button shape="rectangular" type="submit">
        {submitButtonText}
        {titleAfterButtonText && (
          <span className="title-after-button-text">
            &apos;{titleAfterButtonText}&apos;
          </span>
        )}
      </Button>
    </StyledForm>
  )
}
