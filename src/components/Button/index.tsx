import React from 'react'
import './index.css'

type Props = {
    className?: string
    type: "circular" | "rectangular"
    value?: string
    onClick?: () => void
}

const Button: React.FC<Props> = ({ className, type, onClick, value }) => (
    <button className={`${type} ${className}`} onClick={onClick}>
        {value}
    </button>
)

export default Button

