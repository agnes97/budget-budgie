import Button from 'components/Button'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Data, KindaEverything } from '../../../../../public/data/types'
import ButtonContainer from '../ButtonContainer'
import './index.css'

export type PopUpData = {
    className?: Data["class"]
    emoji?: KindaEverything["emoji"]
    item?: KindaEverything["item"]
    note?: any
}

type Props = PopUpData & {
    visibility: boolean
    onClose: () => void
}

const BudgetDetailPopUp: React.FC<Props> = ({ className, emoji, item, note, visibility, onClose }) => {
    const handlePopUpClosing = () => (
        onClose()
    )

    return (
        <section className={`pop-up-full-screen ${(visibility === true) ? "pop-up-open" : ""}`}>
            <div className={`pop-up-container ${className}-colors`}>
                <header className="pop-up-header">
                    <h2 className="pop-up-title">
                        <span className="emoji">{emoji}</span>
                        <span>{item}</span>
                    </h2>
                    <Button 
                        className="close"
                        onClick={handlePopUpClosing} 
                        type="circular"
                        value="X"
                    />
                </header>
                
                <article className="note-container">
                    {(note)
                        ? <ReactMarkdown>{note}</ReactMarkdown>
                        : <span className="no-note">Sadly, there is no note. 🥺</span>
                    }
                </article>

                {/* TODO: ADD FUNCTIONALITY WHEN POSSIBLE! */}
                <ButtonContainer buttonsParameters={[
                    {value: "➕ ADD OR EDIT NOTE", onClick: () => console.log("Hello world!")},
                    {value: "🚫 ERASE NOTE", onClick: () => console.log("Hello world!")},
                    {value: "✔️ MARK ITEM AS DONE", onClick: () => console.log("Hello world!")},
                    {value: "⛔ DELETE ITEM", onClick: () => console.log("Hello world!")}
                ]} />
            </div>
        </section>
    )
}

export default BudgetDetailPopUp