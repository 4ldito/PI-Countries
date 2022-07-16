import React from 'react'
import style from './LandingPage.module.css'
import logo from '../../img/logo5.png';
import { Link } from 'react-router-dom'

const InitialPage = () => {
    return (
        <div className={style.container}>
            <div className={style.infoContainer}>
                <img className={style.img} src={logo} alt="Logo" />
                <Link to='/home' className={style.btn} >Home</Link>
            </div>
        </div>
    )
}

export default InitialPage