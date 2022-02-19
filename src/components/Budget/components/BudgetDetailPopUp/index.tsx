/* eslint-disable no-console */
// eslint-disable-next-line no-warning-comments
// TODO: eslint-disable-next-line jsx-a11y/accessible-emoji
/* eslint-disable jsx-a11y/accessible-emoji */
import type { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import { Button } from 'components/Button'

import type { Data, DataContentOptions } from '../../../../services/budget/types'
import { ButtonContainer } from '../ButtonContainer'
import './index.css'

export type PopUpData = {
  className?: Data['class']
  emoji?: DataContentOptions['emoji']
  item?: DataContentOptions['item']
  note?: DataContentOptions['note']
}

type Props = PopUpData & {
  visibility: boolean
  onClose: () => void
}

export const BudgetDetailPopUp: FC<Props> = ({
  className, emoji, item, note, visibility, onClose,
}) => {
  const handlePopUpClosing = () =>
    onClose()


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
          {note
            ? <ReactMarkdown>{note}</ReactMarkdown>
            : <span className="no-note">Sadly, there is no note. 🥺</span>
          }
        </article>

        {/* eslint-disable-next-line no-warning-comments */}
        {/* TODO: ADD FUNCTIONALITY WHEN POSSIBLE! */}
        <ButtonContainer
          buttonsParameters={[
            { value: '➕ ADD OR EDIT NOTE', onClick: () => console.log('Hello world!') },
            { value: '🚫 ERASE NOTE', onClick: () => console.log('Hello world!') },
            { value: '✔️ MARK ITEM AS DONE', onClick: () => console.log('Hello world!') },
            { value: '⛔ DELETE ITEM', onClick: () => console.log('Hello world!') },
          ]}
        />
      </div>
    </section>
  )
}
