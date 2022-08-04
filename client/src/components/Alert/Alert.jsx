/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef } from 'react';

import imgOK from '../../img/ok_Icon.png';
import imgError from '../../img/error_icon.png';

import style from './Alert.module.css'
import styleBackground from '../CreateActivity/CreateActivity.module.css';
const Alert = ({ title, text, textBTN, background, type }) => {

    const alert = useRef();

    const handleOnClick = (e) => {
        e.preventDefault();
        background.current.classList.toggle(styleBackground.showVisibility)
        alert.current.classList.toggle(`${style.openPopUp}`);
    }

    return (
        <div ref={alert} className={style.popup}>
            <img className={style.img} src={type === 'success' ? imgOK : imgError} alt={'Icon'} />
            <h3 className={style.title}>{title}</h3>
            <p>{text}</p>
            <button onClick={handleOnClick} className={style.btn} href='#'>{textBTN}</button>
        </div>
    )
}

export default Alert