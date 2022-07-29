import type { FC } from 'react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { PopUp } from 'components/PopUp'
import { useBudgetData } from 'contexts/Budget'

import type {
  Data,
  DataContentOptions,
} from '../../../../services/budget/types'
import { ButtonContainer } from '../ButtonContainer'

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
  className,
  index,
  emoji,
  item,
  note,
  visibility,
  onClose,
}) => {
  const { setNoteToCategoryItem, deleteItem, setCategoryItemAsDone } =
    useBudgetData()
  const [currentNote, setCurrentNote] = useState<string | null | undefined>(
    note
  )

  useEffect(() => {
    setCurrentNote(note)
  }, [note])

  // HANDLE NOTE EDIT
  const handleNoteEdit = (newNote: string | null): void => {
    if (typeof index === 'undefined') {
      return
    }

    if (newNote === null) {
      return
    }

    void setNoteToCategoryItem(className, index, newNote).then(
      () => void setCurrentNote(newNote)
    )
  }

  // HANDLE ITEM DELETE
  const handleItemDelete = (): Promise<void> | undefined => {
    if (typeof index === 'undefined') {
      return
    }

    void deleteItem(className, index).then(onClose)
  }

  // HANDLE NOTE DELETE
  const handleNoteDelete = (): void => {
    if (typeof index === 'undefined') {
      return
    }

    void setNoteToCategoryItem(className, index, null).then(
      () => void setCurrentNote(null)
    )
  }

  // HANDLE SET ITEM AS DONE
  const handleSetItemAsDone = (): void => {
    if (typeof index === 'undefined') {
      return
    }

    void setCategoryItemAsDone(className, index).then(onClose)
  }

  return (
    <PopUp
      visibility={visibility}
      backgroundColor={className}
      headerTitleEmoji={emoji}
      headerTitleText={item ?? ''}
      onClose={onClose}
    >
      <article className="note-container">
        {currentNote ? (
          <ReactMarkdown>{currentNote}</ReactMarkdown>
        ) : (
          <p className="no-note">
            <span>Sadly, there is no note.</span>
            <span role="img" aria-label="sad emoji">
              🥺
            </span>
          </p>
        )}
      </article>
      <ButtonContainer
        buttonsParameters={[
          {
            value: '➕ ADD OR EDIT NOTE',
            onClick: () =>
              void handleNoteEdit(
                prompt(
                  'Please enter new note!',
                  currentNote !== null ? currentNote?.toLocaleString() : ''
                )
              ),
          },
          { value: '🚫 ERASE NOTE', onClick: () => void handleNoteDelete() },
          {
            value: '✔️ MARK ITEM AS DONE',
            onClick: () => void handleSetItemAsDone(),
          },
          { value: '⛔ DELETE ITEM', onClick: () => handleItemDelete() },
        ]}
      />
    </PopUp>
  )
}
