import type { FC } from 'react'

import { Form } from 'components/Form'
import { PopUp } from 'components/PopUp'
import { useBudgetData } from 'contexts/Budget'
import type { DataCategory, DataContentOptions } from 'services/budget/types'

import { ButtonContainer } from '../ButtonContainer'

interface AddItemToCategoryProps {
  category: DataCategory['class']
  onClose: () => void
  visibility: boolean
}

export const AddItemToCategoryPopUp: FC<AddItemToCategoryProps> = ({
  category,
  visibility,
  onClose,
}) => {
  const { addNewItem } = useBudgetData()

  // HANDLE ADDING ITEMS
  const handleAddItem = (
    itemCategory: string,
    newItem: DataContentOptions
  ): void => {
    void addNewItem(itemCategory, newItem)
    onClose()
  }

  return (
    <PopUp
      visibility={visibility}
      backgroundColor={category}
      headerTitleEmoji="✏️"
      headerTitleText="Add new item:"
      onClose={onClose}
    >
      <Form
        formIdentifier="addItemToCategoryForm"
        actionOnSubmit={(formData) => {
          const newItem = {
            cost: Number(formData.cost.replace(/\s/u, '')),
            item: formData.item,
            note: formData.note,
            emoji: formData.emoji,
          }

          void handleAddItem(category, newItem)
        }}
        formInputs={[
          {
            typeOfInput: 'input',
            type: 'number',
            identifier: 'cost',
            label: 'COST',
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
            identifier: 'item',
            label: 'ITEM',
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
            value: '✔️ ADD ITEM',
            type: 'submit',
            form: 'addItemToCategoryForm',
          },
        ]}
      />
    </PopUp>
  )
}
