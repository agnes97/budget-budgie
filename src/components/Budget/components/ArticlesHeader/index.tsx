import { FC } from 'react'
import { Data } from '../../../../services/budget/types'
import './index.css'

type Props = {
    title: Data["title"]
    subtitle: Data["subtitle"]
}

const ArticlesHeader: FC<Props> = ({ title, subtitle }) => (
    <header className="atricles-header">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
    </header>
)

export default ArticlesHeader