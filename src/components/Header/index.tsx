import React from 'react'
import budgie from '../../assets/budgie.png'
import './index.css'

const Header: React.FC = () => (
    <header className="main-header">
        <img className="budgie" src={budgie} alt="Budget Budgie!" />
        <h1>BUDGET BUDGIE</h1>
        <img className="budgie" src={budgie} alt="Budget Budgie!" />
    </header>
)

export default Header