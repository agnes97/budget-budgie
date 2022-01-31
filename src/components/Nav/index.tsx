import { FC, MouseEvent } from 'react'
import Button from 'components/Button'
import { signUser, signUserOut } from 'services/firebase/auth'
import './index.css'
import { useUser } from 'contexts/User'


const Nav: FC = () => {
    const {user, isLoggedIn} = useUser()
    
    // USER SIGN UP / SIGN IN
    const handleOnClick = (event: MouseEvent) => {
        event.preventDefault()
        
        if (isLoggedIn) return signUserOut()
        
        signUser()
    }
    
    const LogOut: FC = () => <div>LOG OUT <span className='user-name'>{user?.displayName}</span></div>

    return (
        <nav className='header-nav'>
            <Button type={'rectangular'} value={isLoggedIn ? <LogOut /> : 'LOG IN'} onClick={handleOnClick} />
        </nav>
    )
}

export default Nav