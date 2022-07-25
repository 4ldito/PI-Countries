import style from './About.module.css';

const About = () => {
  return (
    <div data-testid="test" className='container'>
      <div className='infoContainer'>
        <div className='titleContainer'>
          <h3 className='title'>About this page</h3>
        </div>
        <div className={style.content}>
          <p>This page is an Individual Project for SoyHenry's bootcamp.</p>
          <p> Here you can find information about all countries in the world, such as the population, touristic activities that you can do there, etc.
            It counts with filters which allows you to find the country that you want easily.
          </p>

          <div className={style.containerTechs}>
            Technologies
            <i className="fa-brands fa-react"></i>
            <i className="fa-brands fa-node"></i>
            <i className="fa-brands fa-html5"></i>
            <i className="fa-brands fa-css3-alt"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About