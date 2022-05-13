/* eslint-disable no-console */
import type { FC } from 'react'
import { useState } from 'react'
import './index.css'

import { Button } from 'components/Button'
import { useBudgetData } from 'contexts/Budget'
import type { DataCategory, DataContentOptions } from 'services/budget/types'
import { listEmoji } from 'services/emoji'

import { ButtonContainer } from '../ButtonContainer'

type AddItemToCategoryProps = {
  category: DataCategory['class']
}

export const AddItemToCategory: FC<AddItemToCategoryProps> = ({ category }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [newItem, setNewItem] = useState<DataContentOptions>({})
  const { addNewItem } = useBudgetData()

  // HANDLE ADDING ITEMS
  const handleAddItem = (category: string) => {
    void addNewItem(category, newItem).then(() => {
      setIsEditMode(false)
      setNewItem({})
    })
  }

  const emojis = listEmoji()

  return (
    <section className='add-items-container'>
      {isEditMode
        ? (
          <form
            className='add-items-form' onSubmit={event => {
              event.preventDefault()
              handleAddItem(category)
            }}
          >
            <div className='add-items-form-inputs'>
              <div>
                <label htmlFor="cost">COST:</label>
                <input
                  type="number"
                  name="cost"
                  onChange={event => setNewItem({ ...newItem, cost: Number(event.target.value) })}
                />
              </div>
              <div>
                <label htmlFor="cost">EMOJI:</label>
                <select
                  name="cost"
                  onChange={event => setNewItem({
                    ...newItem, emoji: event.target.value.toLocaleString(),
                  })}
                >
                  {emojis.map((emoji, index) =>
                    // eslint-disable-next-line react/no-array-index-key
                    <option key={index} value={emoji}>{emoji}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="item">ITEM:</label>
                <input
                  type="text"
                  name="item"
                  required
                  onChange={event => setNewItem({
                    ...newItem, item: event.target.value.toLocaleString(),
                  })}
                />
              </div>
            </div>
            <ButtonContainer
              buttonsParameters={[
                { value: '✔️ ADD ITEM', type: 'submit' },
                { value: '⛔', onClick: () => setIsEditMode(false) },
              ]}
            />
          </form>
        )
        : (
          <Button
            className="submit-button"
            shape='circular'
            value="+"
            onClick={() => setIsEditMode(true)}
          />
        )
      }
    </section>
  )
}

