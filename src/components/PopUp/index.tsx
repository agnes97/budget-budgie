import type { FC } from 'react'

import { Button } from 'components/Button'
import type { Data } from 'services/budget/types'

import { StyledPopUp } from './styled'

interface PopUpProps {
  visibility: boolean
  backgroundColor?: Data['class'] | string
  headerTitleEmoji?: string
  headerTitleText: string
  onClose: () => void
}

export const PopUp: FC<PopUpProps> = ({
  children,
  headerTitleEmoji,
  headerTitleText,
  visibility,
  backgroundColor,
  onClose,
}) => {
  const handlePopUpClosing = (): void => void onClose()

  return (
    <StyledPopUp
      className={`pop-up-full-screen ${visibility ? 'pop-up-open' : ''}`}
    >
      <div
        className={`
          pop-up-container
          ${backgroundColor ? `${backgroundColor}-colors` : 'black-colors'}
          `}
      >
        <header className="pop-up-header">
          <h2 className="pop-up-title">
            {headerTitleEmoji && (
              <span className="emoji">{headerTitleEmoji}</span>
            )}
            <span>{headerTitleText}</span>
          </h2>
          <Button
            className="close"
            onClick={handlePopUpClosing}
            shape="circular"
          >
            X
          </Button>
        </header>

        {children}
      </div>
    </StyledPopUp>
  )
}

PopUp.defaultProps = {
  backgroundColor: 'black',
  headerTitleEmoji: '',
}
