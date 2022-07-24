import style from './About.module.css';

const About = () => {
  return (
    <div data-testid="test" className={style.container}>
      <div className={style.infoContainer}>
        <div className={style.titleContainer}>
          <h3 className={style.title}>About this page</h3>
        </div>
        <div className={style.content}>
          <p>Devworld</p>
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