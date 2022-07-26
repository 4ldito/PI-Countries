/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import logo from '../../img/logo.png';

import style from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const listRef = useRef(null);

  const handleOnClick = () => {
    console.log(listRef.current.classList.toggle(style.visible));
  }

  return (
    <nav className={style.navbar}>
      <Link to='/home'>
        <img className={style.img} src={logo} alt="Logo" />
      </Link>
      <div className={style.btnsContainer}>
        <ul ref={listRef} className={style.list}>
          <li>
            <NavLink className={style.btn} to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink className={style.btn} to='/create-activities'>Create Activity</NavLink>
          </li>
          <li>
            <NavLink className={style.btn} to='/quiz'>Quiz</NavLink>
          </li>
          <li>
            <NavLink className={style.btn} to='/about'>About</NavLink>
          </li>
          <li>
            <a href='#' onClick={() => navigate(-1)} className={style.btn}>Back</a>
          </li>
        </ul>
        <div className={style.containerMenu}>
          <a onClick={handleOnClick} href='#'><i className={`fa-solid fa-bars ${style.btnMenu}`}></i></a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;