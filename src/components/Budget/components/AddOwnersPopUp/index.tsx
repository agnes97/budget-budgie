import type { FC } from 'react'

import { Form } from 'components/Form'
import { PopUp } from 'components/PopUp'
import { useBudgetData } from 'contexts/Budget'
import type { DataCategory, DataContentOptions } from 'services/budget/types'

import { ButtonContainer } from '../ButtonContainer'

interface AddOwnersPopUpProps {
  categoryClass: DataCategory['class']
  onClose: () => void
  visibility: boolean
}

export const AddOwnersPopUp: FC<AddOwnersPopUpProps> = ({
  categoryClass,
  visibility,
  onClose,
}) => {
  const { addNewOwner } = useBudgetData()

  // HANDLE ADDING ITEMS
  const handleAddOwner = (
    column: string,
    newOwner: DataContentOptions
  ): void => {
    void addNewOwner(column, newOwner)
    onClose()
  }

  return (
    <PopUp
      visibility={visibility}
      backgroundColor={categoryClass}
      headerTitleEmoji="👤"
      headerTitleText="Add new owner:"
      onClose={onClose}
    >
      <Form
        formIdentifier="addOwnerForm"
        actionOnSubmit={(formData) => {
          const newOwner = {
            name: formData.name,
            note: formData.note,
            emoji: formData.emoji,
            wage: Number(formData.wage),
          }

          void handleAddOwner(categoryClass, newOwner)
        }}
        formInputs={[
          {
            typeOfInput: 'input',
            type: 'number',
            identifier: 'wage',
            label: 'WAGE',
            placeholder: 'ENTER NUMBER OR LEAVE EMPTY.',
            required: true,
          },
          {
            typeOfInput: 'emoji',
            identifier: 'emoji',
            label: 'EMOJI',
            placeholder: 'PICK AN EMOJI OR LEAVE EMPTY.',
            required: false,
          },
          {
            typeOfInput: 'input',
            identifier: 'name',
            label: 'NEW OWNER',
            placeholder: 'ENTER TEXT. THIS FIELD IS MANDATORY!',
            required: true,
          },
          {
            typeOfInput: 'textarea',
            identifier: 'note',
            label: 'NOTE',
            placeholder: 'ENTER TEXT OR LEAVE EMPTY.',
            required: false,
          },
        ]}
      />
      <ButtonContainer
        buttonsParameters={[
          {
            value: '✔️ ADD OWNER',
            type: 'submit',
            form: 'addOwnerForm',
          },
        ]}
      />
    </PopUp>
  )
}
