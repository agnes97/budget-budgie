import type { FC } from 'react'

import { Form } from 'components/Form'
import { PopUp } from 'components/PopUp'
import { useBudgetData } from 'contexts/Budget'
import type { DataCategory, DataContentOptions } from 'services/budget/types'
// import { listEmoji } from 'services/emoji'

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
  }

  // const emojis = listEmoji()

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
            cost: Number(formData.cost),
            item: formData.item,
          }

          void handleAddItem(category, newItem)
        }}
        formInputs={[
          {
            typeOfInput: 'input',
            type: 'number',
            identifier: 'cost',
            label: 'COST',
            placeholder: '123,-',
            required: true,
          },
          {
            typeOfInput: 'input',
            identifier: 'item',
            label: 'ITEM',
            placeholder: 'ITEM',
            required: true,
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

      {/* 
              <div>
                <label htmlFor="cost">EMOJI:</label>
                <select
                  name="cost"
                  onChange={(selectChangeEvent) =>
                    void setNewItem({
                      ...newItem,
                      emoji: selectChangeEvent.target.value.toLocaleString(),
                    })
                  }
                >
                  {emojis.map((emoji) => (
                    <option key={emoji} value={emoji}>
                      {emoji}
                    </option>
                  ))}
                </select>
              </div>
               */}
    </PopUp>
  )
}
