/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanActivity, createActivity } from '../../redux/actions/activities';
import { getCountries } from './../../redux/actions/countries';
import Alert from './../Alert/Alert';

import style from './CreateActivity.module.css';
import styleAlert from '../Alert/Alert.module.css'
import Loading from '../Loading/Loading';

/**
 * modificar input range
 */

const CreateActivity = () => {

  const dispatch = useDispatch();

  const allCountries = useSelector(state => state.countries.countries);
  const createdActivity = useSelector(state => state.activities.newActivity);

  const containerAlert = useRef(null);
  const containerLoading = useRef(null);
  const diffText = useRef(null);

  const lblName = useRef(null);
  const lblDuration = useRef(null);
  const lblSeason = useRef(null);
  const lblCountries = useRef(null);

  const [newActivity, setNewActivity] = useState({
    name: '',
    difficulty: '1',
    duration: '',
    season: '',
    countries: []
  });

  const [alertInfo, setAlertInfo] = useState({ title: '', text: '', textBTN: '', type: '' });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, difficulty, duration, season, countries } = newActivity;
    if (!name || !difficulty || !Number(duration) || !season || !countries.length) {
      if (!name) {
        lblName.current.classList.add(style.display);
        lblName.current.parentElement.classList.add(style.errorContainer);
      }
      if (!Number(duration)) {
        lblDuration.current.classList.add(style.display);
        lblDuration.current.parentElement.classList.add(style.errorContainer);
      }
      if (!season) {
        lblSeason.current.classList.add(style.display);
        lblSeason.current.parentElement.classList.add(style.errorContainer);
      }
      if (!countries.length) {
        lblCountries.current.classList.add(style.display);
        lblCountries.current.parentElement.classList.add(style.errorContainer);
      }
      return showAlert('Error!', 'All inputs are required.', 'OK', 'error')
    }
    showLoading();
    dispatch(createActivity(newActivity));
  }

  const showLoading = () => {
    containerLoading.current.classList.add(style.display);
  }

  const handleChangeName = (e) => {
    const value = e.target.value;
    if (!value) {
      lblName.current.classList.add(style.display);
      lblName.current.parentElement.classList.add(style.errorContainer);
      setNewActivity(state => { return { ...state, name: value } });
      return;
    }
    lblName.current.classList.remove(style.display);
    lblName.current.parentElement.classList.remove(style.errorContainer);
    setNewActivity(state => { return { ...state, name: value } });
  }

  const handleChangeDifficulty = (e) => {
    const difficulty = e.target.value
    setNewActivity(state => { return { ...state, difficulty } });
    // const difficulties = ['Very Easy', 'Easy', 'Normal', 'Hard', 'Extreme'];
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
      lblDuration.current.classList.add(style.display);
      lblDuration.current.parentElement.classList.add(style.errorContainer);
      setNewActivity(state => { return { ...state, duration: value } });
      return;
    }
    lblDuration.current.classList.remove(style.display);
    lblDuration.current.parentElement.classList.remove(style.errorContainer);
    setNewActivity(state => { return { ...state, duration: value } })
  }

  const hanldeSeasonChange = (e) => {
    const value = e.target.value;
    lblSeason.current.classList.remove(style.display);
    lblSeason.current.parentElement.classList.remove(style.errorContainer);
    setNewActivity(state => { return { ...state, season: value } })
  }

  const handleCountrySelect = (e) => {
    const country = e.target.value;
    const existsCountry = newActivity.countries.find(c => c === country);
    if (existsCountry) return showAlert('Error!', 'You can\'t add the same country twice.', 'OK', 'error');
    lblCountries.current.classList.remove(style.display);
    lblCountries.current.parentElement.classList.remove(style.errorContainer);
    setNewActivity(state => { return { ...state, countries: [...newActivity.countries, country] } })
  }

  const handleRemoveClick = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const countries = newActivity.countries.filter(c => c !== id);
    setNewActivity(state => { return { ...state, countries } });
  }

  const dontAllowLeters = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }

  const showAlert = (title, text, textBTN, type) => {
    setAlertInfo({ title, text, textBTN, type, showed: true });
  }

  useEffect(() => {
    if (newActivity.duration > 24) setNewActivity(state => { return { ...state, duration: 24 } });
  }, [newActivity.duration]);

  useEffect(() => {
    if (!allCountries.length) dispatch(getCountries());
  }, []);

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
      showAlert('Activity Created', 'Activity has been created successfully =)', 'OK', 'success')
    } else if (createdActivity.info.error) {
      containerLoading.current.classList.remove(style.display);
      showAlert('Error', createdActivity.info.error, 'OK', 'error')
    }
  }, [createdActivity]);

  useEffect(() => {
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
            <div className={style.containerInput}>
              <label className={style.label} htmlFor="name">Nombre</label>
              <input value={newActivity.name} onChange={handleChangeName} type="text" placeholder='Nombre' id='name' />
              <label ref={lblName} htmlFor="name" className={style.lblWrong}>Please, type a name for the activity</label>
            </div>

            <div className={style.containerInput}>
              <label className={style.label} htmlFor="difficulty">Difficulty</label>
              <input defaultValue={1} onChange={handleChangeDifficulty} id='difficulty' type="range" min='1' max='5' />
              <p ref={diffText} className={style.veryEasy} >Very Easy</p>
            </div>

            <div className={style.containerInput}>
              <label className={style.label} htmlFor="duration">Duration in hours (Max: 24)</label>
              <input className={style.durationInput} value={newActivity.duration} onKeyPress={dontAllowLeters} onChange={hanldeChangeDuration} min={0} max={24} type="number" placeholder='Duration' id='duration' />
              <label ref={lblDuration} htmlFor="duration" className={style.lblWrong}>Please, type a duration for the activity</label>
            </div>

            <div className={style.containerInput}>
              <label className={style.label} htmlFor="season">Season</label>
              <select className={style.select} onChange={hanldeSeasonChange} defaultValue={'None'} name="continent" id='continent'>
                <option disabled value="None">Select Season</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
              <label ref={lblSeason} htmlFor="continent" className={style.lblWrong}>Please, choose a season for the activity</label>
            </div>

            <div className={style.containerInput}>
              <label className={style.label} htmlFor="season">Countries</label>
              <select className={style.select} onChange={handleCountrySelect} defaultValue={'None'} name="countries" id='countries'>
                <option disabled value="None">Select a Country</option>
                {allCountries?.map((country) => {
                  return <option key={country.id} value={country.id}>{country.name}</option>
                })}
              </select>
              <label ref={lblCountries} htmlFor="countries" className={style.lblWrong}>Please, choose at least one country for the activity</label>
              <div>
                <div className={style.containerSelectedCountries}>
                  <h4>Selected Countries</h4>
                  <div className={style.selectedCountries}>
                    {newActivity.countries.length ?
                      <div className={style.listCountriesContainer}>
                        {newActivity.countries.map(country => {
                          const actualCountry = allCountries.find((c) => c.id === country)
                          return (
                            <div key={actualCountry.id} className={style.actualCountriesContainer}>
                              <a href='#' onClick={handleRemoveClick} id={actualCountry.id} className={`${style.btnX}`}>&times;</a>
                              <img src={actualCountry.flag} alt={`${actualCountry.id} flag`} />
                              <span>{actualCountry.id}</span>
                            </div>)
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