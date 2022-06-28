import type { FC } from 'react'
import { useState } from 'react'

import { Button } from 'components/Button'
import { Form } from 'components/Form'
import { useBudgetData } from 'contexts/Budget'
import type { DataCategory, DataContentOptions } from 'services/budget/types'
// import { listEmoji } from 'services/emoji'

import { StyledContainer } from './styled'

import { ButtonContainer } from '../ButtonContainer'

interface AddItemToCategoryProps {
  category: DataCategory['class']
}

export const AddItemToCategory: FC<AddItemToCategoryProps> = ({ category }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const { addNewItem } = useBudgetData()

  // HANDLE ADDING ITEMS
  const handleAddItem = (
    itemCategory: string,
    newItem: DataContentOptions
  ): void => {
    void addNewItem(itemCategory, newItem).then(() => {
      setIsEditMode(false)
    })
  }

  // const emojis = listEmoji()

  return (
    <StyledContainer>
      {isEditMode ? (
        <>
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
              { value: '⛔', onClick: () => void setIsEditMode(false) },
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
        </>
      ) : (
        <Button
          className="submit-button"
          shape="circular"
          onClick={() => void setIsEditMode(true)}
        >
          +
        </Button>
      )}
    </StyledContainer>
  )
}
