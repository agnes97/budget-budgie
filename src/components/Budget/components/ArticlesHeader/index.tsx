import React from 'react'
import { Data } from '../../../../../public/data/types'
import './index.css'

type Props = {
    title: Data["title"]
    subtitle: Data["subtitle"]
}

const ArticlesHeader: React.FC<Props> = ({ title, subtitle }) => (
    <header className="atricles-header">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
    </header>
)

export default ArticlesHeader