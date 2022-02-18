import { FC, MouseEventHandler, ReactElement } from 'react'
import './index.css'

type Props = {
    className?: string
    title?: string
    type: "circular" | "rectangular"
    value?: string | ReactElement
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<Props> = ({ className, title, type, onClick, value }) => (
    <button className={`${type} ${className}`} title={title} onClick={onClick}>
        {value}
    </button>
)

