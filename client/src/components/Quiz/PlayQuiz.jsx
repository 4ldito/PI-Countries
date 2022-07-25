import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';

import { getCountries } from './../../redux/actions/countries';

import style from './PlayQuiz.module.css';

const PlayQuiz = () => {

    const dispatch = useDispatch();
    const loaded = useSelector(state => state.countries.loaded);
    const countries = useSelector(state => state.countries.countries);

    const [infoGame, setInfoGame] = useState({
        gameStarted: false,
        numberQuestions: 0,
        totalCorrect: 0,
        totalWrong: 0,
        isAnswerCorrect: null
    });

    const [question, setQuestion] = useState({
        title: '',
        correct: {},
        seeQuestion: false,
        answers: []
    });

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let random = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[random];
            array[random] = temp;
        }
        return array;
    }

    const getQuestion = () => {
        // Le damos un orden aleatorio al array de countries y agarramos las primeras 4 posiciones.
        const randomCountries = shuffleArray(countries).splice(0, 4);
        const correct = randomCountries[0];
        //desordenamos para que las respuestas se pongan en un orden aleatorio
        shuffleArray(randomCountries);
        setInfoGame(state => { return { ...state, gameStarted: true } });
        setQuestion(state => {
            return {
                ...state,
                title: `Which is the capital of ${correct.name}?`,
                correct,
                seeQuestion: true,
                answers: [
                    ...randomCountries
                ]
            }
        });
    }

    const seeScore = () => {
        setInfoGame({
            gameStarted: false,
            numberQuestions: 0,
            totalCorrect: 0,
            totalWrong: 0,
            isAnswerCorrect: null
        });
    }

    const handleClickAnswer = (e) => {
        e.preventDefault();
        const finalAnswer = e.target.value;
        if (finalAnswer === question.correct.id) {
            setInfoGame(state => { return { ...state, numberQuestions: state.numberQuestions + 1, totalCorrect: state.totalCorrect + 1, isAnswerCorrect: true } });
        }
        else {
            setInfoGame(state => { return { ...state, numberQuestions: state.numberQuestions + 1, totalWrong: state.totalWrong + 1, isAnswerCorrect: false } });
        }
        setQuestion(state => { return { ...state, seeQuestion: false } });
    }

    useEffect(() => {
        if (!loaded) dispatch(getCountries());
    }, [loaded, dispatch]);

    return (
        <div className='container'>
            <div className={`infoContainer ${style.container}`}>
                {question.seeQuestion ?
                    <div className={`${style.infoContainer}`}>
                        <h4>{question.title}</h4>
                        <div className={style.options}>
                            {question.answers.map(answer => <button className={`${style.btn} ${style.btnOption}`} onClick={handleClickAnswer} value={answer.id} key={answer.id}>{answer.capital}</button>)}
                        </div>
                    </div> :
                    loaded ?
                        infoGame.gameStarted ?
                            <div className={style.infoContainer}>
                                <p>Total Questions: {infoGame.numberQuestions}</p>
                                <p>The answer is..</p>
                                {infoGame.isAnswerCorrect ?
                                    <p className={style.correct}>Correct</p>
                                    :
                                    <p className={style.wrong}>Wrong</p>}
                                {infoGame.numberQuestions < 5 ?
                                    <button className={style.btn} onClick={getQuestion}>Next Question</button>
                                    :
                                    <>
                                        <p>Game finished :)</p>
                                        <p>You have <span className={style.correct}>{infoGame.totalCorrect}</span> answers correct and <span className={style.wrong}>{infoGame.totalWrong}</span> wrong</p>
                                        <button className={style.btn} onClick={seeScore}>Play again</button>
                                    </>
                                }

                            </div> :
                            <div className={style.infoContainer}>
                                <h3>Game 1</h3>
                                <p>You will see a country and four diferents options, and you have to answer which one do you think is the correct answer.</p>
                                <p>The total questions is 5.</p>
                                <h3>Are you ready?</h3>
                                <button className={style.btn} onClick={getQuestion}>Start Game!</button>
                            </div> :
                        <Loading />
                }
            </div>
        </div>
    )
}

export default PlayQuiz