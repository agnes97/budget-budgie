import type { FC } from 'react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { PopUp } from 'components/PopUp'
import { useBudgetData } from 'contexts/Budget'

import type { Data, DataContentOptions } from '../../../../services/budget/types'
import { ButtonContainer } from '../ButtonContainer'

import './index.css'

export interface PopUpData {
  index?: number
  emoji?: DataContentOptions['emoji']
  item?: DataContentOptions['item']
  note?: DataContentOptions['note']
}

type Props = PopUpData & {
  className: Data['class']
  onClose: () => void
  visibility: boolean
}

export const BudgetNotePopUp: FC<Props> = ({
  className, index, emoji, item, note, visibility, onClose,
}) => {
  const { setNoteToCategoryItem, deleteItem } = useBudgetData()
  const [currentNote, setCurrentNote] = useState<string | null | undefined>(note)

  useEffect(() => {
    setCurrentNote(note)
  }, [note])

  // HANDLE NOTE EDIT
  const handleNoteEdit = (newNote: string | null): void => {
    if (!index) {
      return
    }

    void setNoteToCategoryItem(className, index, newNote).then(() => void setCurrentNote(newNote))
  }

  // HANDLE ITEM DELETE
  const handleItemDelete = (): Promise<void> | undefined => {
    if (!index) {
      return
    }

    void deleteItem(className, index).then(onClose)
  }

  // HANDLE NOTE DELETE
  const handleNoteDelete = (): void => {
    if (!index) {
      return
    }

    void setNoteToCategoryItem(className, index, null).then(() => void setCurrentNote(null))
  }

  return (
    <PopUp
      visibility={visibility}
      backgroundColor={className}
      headerTitleEmoji={emoji}
      headerTitleText={item ?? ''}
      onClose={onClose}
    >
      {/* TODO: Divide styles between here and global PopUp! */}
      <article className="note-container">
        {currentNote
          ? <ReactMarkdown>{currentNote}</ReactMarkdown>
          // eslint-disable-next-line jsx-a11y/accessible-emoji
          : <span className="no-note">Sadly, there is no note. 🥺</span>
        }
      </article>

      {/* TODO: Better solution for ButtonContainer! */}
      <ButtonContainer
        buttonsParameters={[
          {
            value: '➕ ADD OR EDIT NOTE',
            // TODO: Exchange prompt with input!
            onClick: () => void handleNoteEdit(prompt('Please enter new note!', currentNote !== null ? currentNote?.toLocaleString() : '')),
          },
          { value: '🚫 ERASE NOTE', onClick: () => void handleNoteDelete() },
          // eslint-disable-next-line no-console
          { value: '✔️ MARK ITEM AS DONE', onClick: () => void console.log('Hello world!') },
          { value: '⛔ DELETE ITEM', onClick: () => handleItemDelete() },
        ]}
      />
    </PopUp>
  )
}
