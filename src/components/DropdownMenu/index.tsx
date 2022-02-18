import { Button } from 'components/Button'
import { FC } from 'react'
import './index.css'

type DropdownMenuProps = {
    menuItems: string[],
    lastItem?: string,
    value: string
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ menuItems, lastItem, value }) => (
    <div className='dropdown-menu-container'>
        <Button type={'rectangular'} value={value} />
        <ul className='dropdown-menu-list'>
            {menuItems.map((item: string) => (
                <li key={item} className='dropdown-menu-item'>
                    <a href=".">{item}</a>
                </li>
            ))}

            {lastItem && (
                <li className='dropdown-menu-item'>
                    <a href="." className='gradient-text'>{lastItem}</a>
                </li>
            )}
        </ul>
    </div>
)
