import React from 'react'
import logo from '../../img/logo.png';

import style from './Navbar.module.css'
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <Link to='/'>
        <img className={style.img} src={logo} alt="Logo" />
      </Link>
      <ul className={style.list}>
        <li>
          <NavLink className={style.btn} to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink className={style.btn} to='/create-activities'>Create Activity</NavLink>
        </li>
        <li>
          <NavLink className={style.btn} to='/about'>About</NavLink>
        </li>
        <li>
          <NavLink className={style.btn} to='/'>Back</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar