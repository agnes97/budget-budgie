import { FC, MouseEventHandler, ReactElement } from 'react'
import './index.css'

type Props = {
    className?: string
    type: "circular" | "rectangular"
    value?: string | ReactElement
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: FC<Props> = ({ className, type, onClick, value }) => (
    <button className={`${type} ${className}`} onClick={onClick}>
        {value}
    </button>
)

export default Button

