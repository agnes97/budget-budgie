// TODO: Add defaultProps!
/* eslint-disable react/require-default-props */
import type { FC } from 'react'

import { Button } from 'components/Button'
import './index.css'

interface DropdownMenuProps {
  hidden?: boolean
  menuItems: string[]
  lastItem?: string
  value: string
  menuItemsOnClick: (budgetId: string) => void
  lastItemOnClick: (lastItem: string) => void
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  hidden,
  menuItems,
  menuItemsOnClick,
  lastItem,
  lastItemOnClick,
  value,
}) => (
  <div className={`dropdown-menu-container ${hidden && 'hidden'}`}>
    <Button shape="rectangular" value={value} />
    <ul className='dropdown-menu-list'>
      {menuItems.map((item: string) => (
        <li key={item} className='dropdown-menu-item'>
          {/* TODO: Handle click-events-have-key-event by adding onKeyPress handlerer */}
          <div onClick={() => void menuItemsOnClick(item)} aria-hidden="true">{item}</div>
        </li>
      ))}

      {lastItem && (
        <li className='dropdown-menu-item last-dropdown-menu-item'>
          {/* TODO: Onclick has different function! */}
          <div
            onClick={() => void lastItemOnClick(lastItem)}
            aria-hidden="true"
            className='gradient-text'
          >
            {lastItem}
          </div>
        </li>
      )}
    </ul>
  </div>
)
