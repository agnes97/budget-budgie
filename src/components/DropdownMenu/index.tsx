import type { FC } from 'react'

import { Button } from 'components/Button'

import { StyledDropdownMenu } from './styled'

interface DropdownMenuProps<TItem> {
  value: string
  menuItems: TItem[]
  menuItemsOnClick: (itemId: string) => void
  emptyMessage: string
  lastItem: string
  lastItemOnClick: (lastItem: string) => void
  hidden?: boolean
}

export interface DropdownItem {
  id: string
  title: string
}

export const DropdownMenu = <TItem extends DropdownItem>({
  value,
  menuItems,
  menuItemsOnClick,
  emptyMessage,
  lastItem,
  lastItemOnClick,
  hidden,
}: DropdownMenuProps<TItem>): ReturnType<FC> => (
  <StyledDropdownMenu
    className={`dropdown-menu-container ${hidden && 'hidden'}`}
  >
    <Button shape="rectangular">{value}</Button>
    <ul className="dropdown-menu-list">
      {menuItems.length <= 0 && (
        <li className="dropdown-menu-item">
          {/* TODO: Handle click-events-have-key-event by adding onKeyPress handlerer */}
          <div aria-hidden="true">{emptyMessage}</div>
        </li>
      )}
      {menuItems.map((item) => (
        <li key={item.id} className="dropdown-menu-item">
          {/* TODO: Handle click-events-have-key-event by adding onKeyPress handlerer */}
          <div
            onClick={() => void menuItemsOnClick(item.id)}
            aria-hidden="true"
          >
            {item.title}
          </div>
        </li>
      ))}

      {lastItem && (
        <li className="dropdown-menu-item last-dropdown-menu-item">
          {/* TODO: Onclick has different function! */}
          <div
            onClick={() => void lastItemOnClick(lastItem)}
            aria-hidden="true"
            className="gradient-text"
          >
            {lastItem}
          </div>
        </li>
      )}
    </ul>
  </StyledDropdownMenu>
)

DropdownMenu.defaultProps = {
  hidden: true,
}
