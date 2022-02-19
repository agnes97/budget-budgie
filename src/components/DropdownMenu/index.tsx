// eslint-disable-next-line no-warning-comments
// TODO: Add defaultProps!
/* eslint-disable react/require-default-props */
import type { FC } from 'react'

import { Button } from 'components/Button'
import './index.css'

type DropdownMenuProps = {
  hidden?: boolean
  menuItems: string[]
  lastItem?: string
  value: string
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ hidden, menuItems, lastItem, value }) => (
  <div className={`dropdown-menu-container ${hidden && 'hidden'}`}>
    <Button type="rectangular" value={value} />
    <ul className='dropdown-menu-list'>
      {menuItems.map((item: string) => (
        <li key={item} className='dropdown-menu-item'>
          <a href=".">{item}</a>
        </li>
      ))}

      {lastItem && (
        <li className='dropdown-menu-item last-dropdown-menu-item'>
          <a href="." className='gradient-text'>{lastItem}</a>
        </li>
      )}
    </ul>
  </div>
)
