import { Link } from 'react-router-dom';

import style from './Page404.module.css';

const Page404 = () => {
  return (
    <div className={style.container}>
      <div className={style.infoContainer}>
            <h4 className={style.title}>Error - 404</h4>
        <div className={style.containerAnimation}>
          <div className={`${style.globeLoader} fa-solid fa-globe`}>
            <i className="fas fa-plane"></i>
            <Link className={style.link} to='/home'>Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page404