import { Link } from 'react-router-dom';

import logo from '../../img/logo.png';

import style from './LandingPage.module.css';

const InitialPage = () => {
    return (
        <div className={style.container}>
            <div className={style.infoContainer}>
                <img className={style.img} src={logo} alt="Logo" />
                <Link to='/home' className={style.btn} >Start</Link>
            </div>
        </div>
    )
}

export default InitialPage