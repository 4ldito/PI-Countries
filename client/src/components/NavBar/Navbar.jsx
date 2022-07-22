/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from '../../img/logo.png';

import style from './Navbar.module.css';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={style.navbar}>
      <Link to='/'>
        <img className={style.img} src={logo} alt="Logo" />
      </Link>
      <div className={style.btnsContainer}>
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
            <a onClick={() => navigate(-1)} className={style.btn} to='/'>Back</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;