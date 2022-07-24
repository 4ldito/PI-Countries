/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanActivity, createActivity } from '../../redux/actions/activities';
import { filterCountries } from './../../redux/actions/countries';
import { useSearchParams } from 'react-router-dom';

import Alert from './../Alert/Alert';
import Loading from '../Loading/Loading';

import style from './CreateActivity.module.css';
import styleAlert from '../Alert/Alert.module.css'

/**
 * modificar input range
 */

const CreateActivity = () => {

  const dispatch = useDispatch();

  const countries = useSelector(state => state.countries.filteredCountries);
  const createdActivity = useSelector(state => state.activities.newActivity);

  let [searchParams] = useSearchParams();

  const containerAlert = useRef(null);
  const containerLoading = useRef(null);
  const diffText = useRef(null);

  const inputDuration = useRef(null);
  const selectedSeason = useRef(null);
  const selectedCountries = useRef(null);
  const inputDifficulty = useRef(null);

  const [newActivity, setNewActivity] = useState({
    name: { text: '', error: false },
    difficulty: '1',
    duration: { hours: '', error: false },
    season: { name: '', error: false },
    countries: { all: [], error: false }
  });

  const [alertInfo, setAlertInfo] = useState({ title: '', text: '', textBTN: '', type: '' });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, difficulty, duration, season, countries } = newActivity;
    if (!name.text || !difficulty || !Number(duration.hours) || !season.name || !countries.all.length) {
      if (!name.text) {
        setNewActivity(state => { return { ...state, name: { text: state.name.text, error: true } } });
      }
      if (!Number(duration.hours)) {
        setNewActivity(state => { return { ...state, duration: { hours: state.duration.hours, error: true } } });
      }
      if (!season.name) {
        setNewActivity(state => { return { ...state, season: { name: state.season.name, error: true } } });
      }
      if (!countries.all.length) {
        setNewActivity(state => { return { ...state, countries: { all: state.countries.all, error: true } } });
      }
      return showAlert('Error!', 'All inputs are required.', 'OK', 'error');
    }
    showLoading();
    const activity = {
      name: newActivity.name.text,
      difficulty: newActivity.difficulty,
      duration: newActivity.duration.hours,
      season: newActivity.season.name,
      countries: newActivity.countries.all
    }
    dispatch(createActivity(activity));
  }

  const clearForm = () => {
    setNewActivity({
      name: { text: '', error: false },
      difficulty: '1',
      duration: { hours: '', error: false },
      season: { name: '', error: false },
      countries: { all: [], error: false }
    });
    selectedSeason.current.selectedIndex = 0;
    selectedCountries.current.selectedIndex = 0;
    inputDifficulty.current.value = 1;
    changeLblDifficulty(1);
  }

  const showLoading = () => {
    containerLoading.current.classList.add(style.display);
  }

  const handleChangeName = (e) => {
    const value = e.target.value;
    if (!value) {
      setNewActivity(state => { return { ...state, name: { text: value, error: true } } });
      return;
    }
    setNewActivity(state => { return { ...state, name: { text: value, error: false } } });
  }

  const handleChangeDifficulty = (e) => {
    const difficulty = e.target.value
    setNewActivity(state => { return { ...state, difficulty } });
    changeLblDifficulty(difficulty);
  }

  const changeLblDifficulty = (difficulty) => {
    const difficulties = [
      { name: 'Very Easy', className: style.veryEasy },
      { name: 'Easy', className: style.easy },
      { name: 'Normal', className: style.normal },
      { name: 'Hard', className: style.hard },
      { name: 'Extreme', className: style.extreme }
    ];
    diffText.current.innerText = difficulties[difficulty - 1].name;
    diffText.current.className = difficulties[difficulty - 1].className;
  }

  const hanldeChangeDuration = (e) => {
    const value = e.target.value;
    if (!value) {
      return setNewActivity(state => { return { ...state, duration: { hours: value, error: true } } });
    }
    setNewActivity(state => { return { ...state, duration: { hours: value, error: false } } });
  }

  const hanldeSeasonChange = (e) => {
    const value = e.target.value;
    setNewActivity(state => { return { ...state, season: { name: value, error: false } } });
  }

  const handleCountrySelect = (e) => {
    const country = e.target.value;
    const existsCountry = newActivity.countries.all.find(c => c === country);
    if (existsCountry) return showAlert('Error!', 'You can\'t add the same country twice.', 'OK', 'error');
    setNewActivity(state => { return { ...state, countries: { all: [...newActivity.countries.all, country], error: false } } });
  }

  const handleRemoveClick = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const countries = newActivity.countries.all.filter(c => c !== id);
    setNewActivity(state => { return { ...state, countries: { all: countries, error: false } } });
  }

  const dontAllowLeters = (e) => {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  }

  const showAlert = (title, text, textBTN, type) => {
    setAlertInfo({ title, text, textBTN, type, showed: true });
  }

  useEffect(() => {
    if (newActivity.duration.hours > 24) setNewActivity(state => { return { ...state, duration: { hours: 24, error: false } } });
    if (newActivity.duration.hours < 0) setNewActivity(state => { return { ...state, duration: { hours: 0, error: false } } });
  }, [newActivity.duration.hours]);

  useEffect(() => {
    if (alertInfo.showed) {
      const alert = containerAlert.current.children[0];
      containerAlert.current.classList.add(style.showVisibility);
      alert.classList.add(`${styleAlert.openPopUp}`);
    }
  }, [alertInfo]);

  useEffect(() => {
    if (createdActivity.created) {
      containerLoading.current.classList.remove(style.display);
      showAlert('Activity Created', 'Activity has been created successfully =)', 'OK', 'success');
      clearForm();
      // dispatch(cleanActivity()); //Con esto se quita que cuando se ACTUALICE la pagina en modo de desarollo se no aparezca la alerta. 
    } else if (createdActivity.info.error) {
      containerLoading.current.classList.remove(style.display);
      showAlert('Error', createdActivity.info.error, 'OK', 'error')
    }
  }, [createdActivity]);

  useEffect(() => {
    const queryCountry = searchParams.get('country');
    if (queryCountry && countries?.length) {
      const country = countries.find(c => c.id === queryCountry);
      if (country) setNewActivity(state => { return { ...state, countries: { all: [queryCountry], error: false } } });
    }
  }, [countries]);

  useEffect(() => {
    dispatch(filterCountries({ order: 'ASC_ALPHABETICALLY' }));
    return () => {
      dispatch(cleanActivity());
    }
  }, []);

  return (
    <>
      <div ref={containerLoading} className={style.containerLoading}>
        <Loading />
      </div>
      <div className={style.container}>
        <div className={style.infoContainer}>
          <div className={style.titleContainer}>
            <h3 className={style.title}>New Activity</h3>
          </div>
          <form action="" method="post" onSubmit={handleOnSubmit}>
            <div className={newActivity.name.error ? `${style.containerInput} ${style.errorContainer}` : style.containerInput}>
              <label className={style.label} htmlFor="name">Name</label>
              <input value={newActivity.name.text} onChange={handleChangeName} type="text" placeholder='Name' id='name' />
              {newActivity.name.error && <label htmlFor="name" className={style.lblWrong}>Please, type a name for the activity</label>}
            </div>

            <div className={style.containerInput}>
              <label className={style.label} htmlFor="difficulty">Difficulty</label>
              <input ref={inputDifficulty} defaultValue={1} onChange={handleChangeDifficulty} id='difficulty' type="range" min='1' max='5' />
              <p ref={diffText} className={style.veryEasy} >Very Easy</p>
            </div>

            <div className={newActivity.duration.error ? `${style.containerInput} ${style.errorContainer}` : style.containerInput}>
              <label className={style.label} htmlFor="duration">Duration in hours (Max: 24)</label>
              <input ref={inputDuration} className={style.durationInput} value={newActivity.duration.hours} onKeyPress={dontAllowLeters} onChange={hanldeChangeDuration} min={0} max={24} type="number" placeholder='Duration' id='duration' />
              {newActivity.duration.error && <label htmlFor="duration" className={style.lblWrong}>Please, type a duration for the activity</label>}
            </div>

            <div className={newActivity.season.error ? `${style.containerInput} ${style.errorContainer}` : style.containerInput}>
              <label className={style.label} htmlFor="season">Season</label>
              <select ref={selectedSeason} className={style.select} onChange={hanldeSeasonChange} defaultValue={'None'} name="continent" id='continent'>
                <option disabled value="None">Select Season</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
              {newActivity.season.error && <label htmlFor="continent" className={style.lblWrong}>Please, choose a season for the activity</label>}
            </div>

            <div className={newActivity.countries.error ? `${style.containerInput} ${style.errorContainer}` : style.containerInput}>
              <label className={style.label} htmlFor="countries">Countries</label>
              <select ref={selectedCountries} className={style.select} onChange={handleCountrySelect} defaultValue={'None'} name="countries" id='countries'>
                <option disabled value="None">Select a Country</option>
                {countries?.map((country) => {
                  return <option key={country.id} value={country.id}>{country.name}</option>
                })}
              </select>
              {newActivity.countries.error && <label htmlFor="countries" className={style.lblWrong}>Please, choose at least one country for the activity</label>}
              <div>
                <div className={style.containerSelectedCountries}>
                  <h4>Selected Countries</h4>
                  <div className={style.selectedCountries}>
                    {newActivity.countries.all.length ?
                      <div className={style.listCountriesContainer}>
                        {newActivity.countries?.all.map(country => {
                          const actualCountry = countries?.find((c) => c.id === country)
                          if (actualCountry) {
                            return (
                              <div key={actualCountry.id} className={style.actualCountriesContainer}>
                                <a href='#' onClick={handleRemoveClick} id={actualCountry.id} className={`${style.btnX}`}>&times;</a>
                                <img src={actualCountry.flag} alt={`${actualCountry.id} flag`} />
                                <span>{actualCountry.id}</span>
                              </div>)
                          }
                          return <div className={style.actualCountriesContainer}></div>
                        })}
                      </div> : <p className={style.noneCountry}>None</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className={style.containerButton}>
              <button className={style.btn} type="submit">Create Activity</button>
            </div>
          </form>
        </div>
      </div>
      <div className={style.backgroundAlert} ref={containerAlert}>
        <Alert
          title={alertInfo.title}
          text={alertInfo.text}
          textBTN={alertInfo.textBTN}
          type={alertInfo.type}
          background={containerAlert}
        />
      </div>
    </>
  )
}

export default CreateActivity