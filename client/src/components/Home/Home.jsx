import style from './Home.module.css';
import Aside from '../Aside/Aside';
import Countries from '../Countries/Countries';

const Home = () => {
  return (
    <div className={style.container}>
      <Aside />
      <Countries />
    </div>
  )
}

export default Home;