import { FC } from 'react'
import budgie from '../../assets/budgie.png'
import { Nav } from 'components/Nav'
import './index.css'

export const Header: FC = () => (
    <header className="main-header">
        <Nav />
        <section className='page-title'>
            <img className="budgie" src={budgie} alt="Budget Budgie!" />
            <h1>BUDGET BUDGIE</h1>
            <img className="budgie" src={budgie} alt="Budget Budgie!" />
        </section>
    </header>
)
