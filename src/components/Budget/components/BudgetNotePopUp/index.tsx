/* eslint-disable no-console */
// eslint-disable-next-line no-warning-comments
// TODO: eslint-disable-next-line jsx-a11y/accessible-emoji
/* eslint-disable jsx-a11y/accessible-emoji */
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { PopUp } from 'components/PopUp'
import { useBudgetData } from 'contexts/Budget'

import type { Data, DataContentOptions } from '../../../../services/budget/types'
import { ButtonContainer } from '../ButtonContainer'

import './index.css'

export type PopUpData = {
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
  const handleNoteEdit = (newNote: string | null) => {
    if (!index) {
      return
    }

    void setNoteToCategoryItem(className, index, newNote).then(() => setCurrentNote(newNote))
  }

  // HANDLE ITEM DELETE
  const handleItemDelete = (): Promise<void> | undefined => {
    if (!index) {
      return
    }

    void deleteItem(className, index).then(onClose)
  }

  // HANDLE NOTE DELETE
  const handleNoteDelete = () => {
    if (!index) {
      return
    }

    void setNoteToCategoryItem(className, index, null).then(() => setCurrentNote(null))
  }

  return (
    <PopUp
      visibility={visibility}
      backgroundColor={className}
      headerTitleEmoji={emoji}
      headerTitleText={item ?? ''}
      onClose={onClose}
    >
      {/* eslint-disable-next-line no-warning-comments */}
      {/* TODO: Divide styles between here and global PopUp! */}
      <article className="note-container">
        {currentNote
          ? <ReactMarkdown>{currentNote}</ReactMarkdown>
          : <span className="no-note">Sadly, there is no note. 🥺</span>
        }
      </article>

      {/* eslint-disable-next-line no-warning-comments */}
      {/* TODO: Better solution for ButtonContainer! */}
      <ButtonContainer
        buttonsParameters={[
          {
            value: '➕ ADD OR EDIT NOTE',
            // eslint-disable-next-line no-warning-comments
            // TODO: Exchange prompt with input!
            // eslint-disable-next-line max-len
            onClick: () => handleNoteEdit(prompt('Please enter new note!', currentNote !== null ? currentNote?.toLocaleString() : '')),
          },
          { value: '🚫 ERASE NOTE', onClick: () => handleNoteDelete() },
          { value: '✔️ MARK ITEM AS DONE', onClick: () => console.log('Hello world!') },
          { value: '⛔ DELETE ITEM', onClick: () => handleItemDelete() },
        ]}
      />
    </PopUp>
  )
}
