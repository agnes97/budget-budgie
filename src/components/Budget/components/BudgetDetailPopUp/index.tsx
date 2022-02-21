/* eslint-disable no-console */
// eslint-disable-next-line no-warning-comments
// TODO: eslint-disable-next-line jsx-a11y/accessible-emoji
/* eslint-disable jsx-a11y/accessible-emoji */
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { Button } from 'components/Button'
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
  visibility: boolean
  onClose: () => void
}

export const BudgetDetailPopUp: FC<Props> = ({
  className, index, emoji, item, note, visibility, onClose,
}) => {
  const { setNoteToCategoryItem } = useBudgetData()
  const [currentNote, setCurrentNote] = useState<string | null | undefined>(note)

  const handlePopUpClosing = () => onClose()

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

  // HANDLE NOTE DELETE
  const handleNoteDelete = () => {
    if (!index) {
      return
    }

    void setNoteToCategoryItem(className, index, null).then(() => setCurrentNote(null))
  }

  return (
    <section className={`pop-up-full-screen ${visibility ? 'pop-up-open' : ''}`}>
      <div className={`pop-up-container ${className}-colors`}>
        <header className="pop-up-header">
          <h2 className="pop-up-title">
            <span className="emoji">{emoji}</span>
            <span>{item}</span>
          </h2>
          <Button
            className="close"
            onClick={handlePopUpClosing}
            type="circular"
            value="X"
          />
        </header>

        <article className="note-container">
          {currentNote
            ? <ReactMarkdown>{currentNote}</ReactMarkdown>
            : <span className="no-note">Sadly, there is no note. 🥺</span>
          }
        </article>

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
            { value: '⛔ DELETE ITEM', onClick: () => console.log('Hello world!') },
          ]}
        />
      </div>
    </section>
  )
}
