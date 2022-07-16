import React from 'react'
import Aside from './Aside';

import style from './Home.module.css';

const Home = () => {

  return (
    <div className={style.container}>
      <Aside />
      <main>
        contenido paises
      </main>
    </div>
  )
}

export default Home