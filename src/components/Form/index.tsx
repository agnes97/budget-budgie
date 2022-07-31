/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { IEmojiData } from 'emoji-picker-react'
import Picker from 'emoji-picker-react'
import { useState } from 'react'
import type { FC, InputHTMLAttributes } from 'react'

import { Button } from 'components/Button'

import { StyledForm, StyledPickerContainer } from './styled'

export interface FormInput extends InputHTMLAttributes<HTMLInputElement> {
  typeOfInput: 'input' | 'textarea' | 'select' | 'emoji'
  identifier: string
  label: string
  selectOptions?: Array<{
    optionValue: string
    optionTitle: string
  }>
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
  const [emojiPickerVisibility, setEmojiPickerVisibility] =
    useState<boolean>(false)
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
      | React.ChangeEvent<HTMLSelectElement>
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

  const onEmojiClick = (
    emojiEvent: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ): void => {
    emojiEvent.preventDefault()

    setFormData((previousFormData) => ({
      ...previousFormData,
      emoji: emojiObject.emoji,
    }))
    setEmojiPickerVisibility(!emojiPickerVisibility)
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
        {formInputs.map(
          ({ typeOfInput, identifier, label, placeholder, selectOptions }) => (
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
              {typeOfInput === 'select' && (
                <select
                  name={identifier}
                  value={formData.identifier}
                  onChange={handleInputChange}
                  defaultValue="defaultValue"
                >
                  <option disabled hidden value="defaultValue">
                    {placeholder}
                  </option>
                  {selectOptions &&
                    selectOptions.map(({ optionValue, optionTitle }) => (
                      <option key={optionValue} value={optionValue}>
                        {optionTitle}
                      </option>
                    ))}
                </select>
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
              {typeOfInput === 'emoji' && (
                <StyledPickerContainer
                  isEmojiChosen={formData.hasOwnProperty('emoji')}
                  visibilityProp={emojiPickerVisibility}
                >
                  <Button
                    className="emojiPickerVisibilityButton"
                    onClick={() =>
                      void setEmojiPickerVisibility(!emojiPickerVisibility)
                    }
                  >
                    {formData.emoji ? formData.emoji : placeholder}
                  </Button>

                  <Picker onEmojiClick={onEmojiClick} />
                </StyledPickerContainer>
              )}
            </div>
          )
        )}
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
