import Button from 'components/Button'
import React from 'react'
import './index.css'

const Nav: React.FC = () => (
    <nav className='header-nav'>
        {/* TODO: Value of button is either Log in or Log out! */}
        {/* isUserLoggedIn ? 'LOG OUT' : 'LOG IN' */}
        <Button type={'rectangular'} value="REGISTER" />
        <Button type={'rectangular'} value="LOG IN" />
    </nav>
)

export default Nav