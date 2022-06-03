import type { FC } from 'react'
import { useState } from 'react'
import './index.css'

import { Button } from 'components/Button'
import { useBudgetData } from 'contexts/Budget'
import type { DataCategory, DataContentOptions } from 'services/budget/types'
import { listEmoji } from 'services/emoji'

import { ButtonContainer } from '../ButtonContainer'

interface AddItemToCategoryProps {
  category: DataCategory['class']
}

export const AddItemToCategory: FC<AddItemToCategoryProps> = ({ category }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [newItem, setNewItem] = useState<DataContentOptions>({})
  const { addNewItem } = useBudgetData()

  // HANDLE ADDING ITEMS
  const handleAddItem = (itemCategory: string): void => {
    void addNewItem(itemCategory, newItem).then(() => {
      setIsEditMode(false)
      setNewItem({})
    })
  }

  const emojis = listEmoji()

  return (
    <section className="add-items-container">
      {isEditMode ? (
        <form
          className="add-items-form"
          onSubmit={(addItemEvent) => {
            addItemEvent.preventDefault()
            handleAddItem(category)
          }}
        >
          <div className="add-items-form-inputs">
            <div>
              <label htmlFor="cost">COST:</label>
              <input
                type="number"
                name="cost"
                onChange={(inputChangeEvent) =>
                  void setNewItem({
                    ...newItem,
                    cost: Number(inputChangeEvent.target.value),
                  })
                }
              />
            </div>
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
            <div>
              <label htmlFor="item">ITEM:</label>
              <input
                type="text"
                name="item"
                required
                onChange={(inputChangeEvent) =>
                  void setNewItem({
                    ...newItem,
                    item: inputChangeEvent.target.value.toLocaleString(),
                  })
                }
              />
            </div>
          </div>
          <ButtonContainer
            buttonsParameters={[
              { value: '✔️ ADD ITEM', type: 'submit' },
              { value: '⛔', onClick: () => void setIsEditMode(false) },
            ]}
          />
        </form>
      ) : (
        <Button
          className="submit-button"
          shape="circular"
          value="+"
          onClick={() => void setIsEditMode(true)}
        />
      )}
    </section>
  )
}
