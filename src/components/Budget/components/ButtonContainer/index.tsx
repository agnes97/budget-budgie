import { FC } from 'react'
import { Button } from 'components/Button'
import './index.css'

type ButtonParameters = {
    value: string
    onClick: () => void
}

type Props = {
    buttonsParameters: ButtonParameters[]
    title?: string 
}

export const ButtonContainer: FC<Props> = ({ buttonsParameters, title }) => (
    <div className="button-container">
        {title ? <h2>{title}</h2> : null}
        <div className="button-list">
            {buttonsParameters.map(({ value, onClick }, index: number) => (
                <Button 
                    key={index}
                    value={value}
                    onClick={onClick}
                    type={'rectangular'}
                />
            ))}
        </div>
    </div>
)
