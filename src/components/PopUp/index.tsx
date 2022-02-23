/* eslint-disable react/require-default-props */
import type { FC } from 'react'

import { Button } from 'components/Button'
import './index.css'
import type { Data } from 'services/budget/types'

type PopUpProps = {
  visibility: boolean
  backgroundColor: Data['class']
  headerTitleEmoji?: string
  headerTitleText: string
  onClose: () => void
}

export const PopUp: FC<PopUpProps> = ({
  children, headerTitleEmoji, headerTitleText, visibility, backgroundColor, onClose,
}) => {
  const handlePopUpClosing = () => onClose()

  return (
    <section className={`pop-up-full-screen ${visibility ? 'pop-up-open' : ''}`}>
      <div className={`pop-up-container ${backgroundColor}-colors`}>
        <header className="pop-up-header">
          <h2 className="pop-up-title">
            {headerTitleEmoji && <span className="emoji">{headerTitleEmoji}</span>}
            <span>{headerTitleText}</span>
          </h2>
          <Button
            className="close"
            onClick={handlePopUpClosing}
            shape="circular"
            value="X"
          />
        </header>

        {children}
      </div>
    </section>
  )
}
