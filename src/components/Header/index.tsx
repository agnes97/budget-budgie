import React from 'react'
import budgie from '../../assets/budgie.png'
import Nav from 'components/Nav'
import './index.css'

const Header: React.FC = () => (
    <header className="main-header">
        <Nav />
        <section className='page-title'>
            <img className="budgie" src={budgie} alt="Budget Budgie!" />
            <h1>BUDGET BUDGIE</h1>
            <img className="budgie" src={budgie} alt="Budget Budgie!" />
        </section>
    </header>
)

export default Header