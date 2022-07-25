
import style from './Quiz.module.css'
import { Link } from 'react-router-dom';

const Quiz = () => {
    return (
        <div className='container'>
            <div className='infoContainer'>
                <div className={`titleContainer`}>
                    <h3 className='title'>Quiz</h3>
                    <div className={style.infoContainer}>
                        <p className={style.explication}>This is a game that you have to answer cuestions about countries.</p>
                        <Link className={style.btn} to='/quiz/play'>Explain me!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quiz