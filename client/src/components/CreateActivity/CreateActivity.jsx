/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import style from './CreateActivity.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createActivity } from '../../redux/actions/activities';
import { getCountries } from './../../redux/actions/countries';

const CreateActivity = () => {

  const dispatch = useDispatch();

  const allCountries = useSelector(state => state.countries.countries);
  const createdActivity = useSelector(state => state.activities.newActivity);

  const diffText = useRef(null);

  const [newActivity, setNewActivity] = useState({
    name: '',
    difficulty: '1',
    duration: '',
    season: '',
    countries: []
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, difficulty, duration, season, countries } = newActivity;
    if (!name || !difficulty || !Number(duration) || !season || !countries.length) return alert('Errorr');
    dispatch(createActivity(newActivity));
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

  const dontAllowLeters = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (newActivity.duration > 24) setNewActivity(state => { return { ...state, duration: 24 } });
  }, [newActivity.duration]);

  useEffect(() => {
    if (!allCountries.length) dispatch(getCountries());
  }, []);

  useEffect(() => {
    console.log(createdActivity);
  }, [createdActivity]);


  return (
    <div className={style.container}>
      <div className={style.infoContainer}>
        <div className={style.titleContainer}>
          <h3 className={style.title}>New Activity</h3>
        </div>
        <form action="" method="post" onSubmit={handleOnSubmit}>
          <div className={style.containerInput}>
            <label className={style.label} htmlFor="name">Nombre</label>
            <input value={newActivity.name} onChange={(e) => setNewActivity(state => { return { ...state, name: e.target.value } })} type="text" placeholder='Nombre' id='name' />
          </div>

          <div className={style.containerInput}>
            <label className={style.label} htmlFor="difficulty">Difficulty</label>
            <input defaultValue={1} onChange={handleChangeDifficulty} id='difficulty' type="range" min='1' max='5' />
            <p ref={diffText} className={style.veryEasy} >Very Easy</p>
          </div>

          <div className={style.containerInput}>
            <label className={style.label} htmlFor="duration">Duration in hours (Max: 24)</label>
            <input className={style.durationInput} value={newActivity.duration} onKeyPress={dontAllowLeters} onChange={(e) => setNewActivity(state => { return { ...state, duration: e.target.value } })} min={0} max={24} type="number" placeholder='Duration' id='duration' />
          </div>

          <div className={style.containerInput}>
            <label className={style.label} htmlFor="season">Season</label>
            <select className={style.select} onChange={(e) => setNewActivity(state => { return { ...state, season: e.target.value } })} defaultValue={'None'} name="continent">
              <option disabled value="None">Select Season</option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
            </select>
          </div>

          <div className={style.containerInput}>
            <label className={style.label} htmlFor="season">Countries</label>
            <select className={style.select} onChange={(e) => setNewActivity(state => { return { ...state, countries: [...newActivity.countries, e.target.value] } })} defaultValue={'None'} name="continent">
              <option disabled value="None">Select a Country</option>
              {allCountries?.map((country) => {
                return <option key={country.id} value={country.id}>{country.name}</option>
              })}
            </select>
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
                            <span>{actualCountry.id}</span>
                            <img src={actualCountry.flag} alt={`${actualCountry.id} flag`} />
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
  )
}

export default CreateActivity