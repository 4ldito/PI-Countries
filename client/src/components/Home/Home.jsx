/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from './Card';
import Loading from '../Loading/Loading';

import { getCountries, filterCountries } from './../../redux/actions/countries';
import { cleanActivity, getActivities } from './../../redux/actions/activities';

import style from './Home.module.css';
import styleAside from './Aside.module.css';
import styleCountries from './Countries.module.css';

const Home = () => {
  const dispatch = useDispatch();

  const [searchedCountry, setSearchedCountry] = useState({ value: '' });

  const [limit, setLimit] = useState({ min: 0, max: 8 });
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [actualFilters, setActualFilters] = useState({
    name: '',
    order: '', // este hace referencia a alfabeticamente y por poblacion
    continent: '',
    activity: ''
  });

  const filteredCountriesReal = useSelector(state => state.countries.filteredCountries);
  const loaded = useSelector(state => state.countries.loaded);

  const activities = useSelector(state => state.activities.activities);

  const orderAlphabetically = useRef(null);
  const orderContinent = useRef(null);
  const orderPopulation = useRef(null);
  const orderActivity = useRef(null);

  let buttonsPage = [];

  const pageActive = (btn) => {
    const lastActive = document.querySelector(`.${styleCountries.active}`);
    if (lastActive) lastActive.classList.remove(styleCountries.active);
    if (!btn) btn = document.querySelector(`.${styleCountries.btnPage}`);
    btn.classList.add(styleCountries.active);
  }

  const selectedPage = (pag, btn) => {
    let min, max;
    if (pag === 1) {
      min = 0;
      max = pag * 10 - 2
    } else {
      min = ((pag - 1) * 10) - 1;
      max = ((pag - 1) * 10) + 8;
    }
    setLimit({ min, max });
    pageActive(btn);
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    const pag = Number(e.target.innerText);
    selectedPage(pag, e.target);
  }

  const getAllButtonsPages = () => {
    const totalPages = ((filteredCountries.length + 1) / 10);
    buttonsPage = [];
    for (let i = 0; i < totalPages; i++) {
      buttonsPage.push(<a key={i} onClick={handleOnClick} className={i === 0 ? `${styleCountries.active} ${styleCountries.btnPage}` : styleCountries.btnPage} href="#">{i + 1}</a>)
    }
    return buttonsPage;
  }
  

  const clearFilters = () => {
    selectedPage(1);
  }

  const handleClearFilters = () => {
    setSearchedCountry({ value: '' });
    orderContinent.current.selectedIndex = 0;
    orderAlphabetically.current.selectedIndex = 0;
    orderPopulation.current.selectedIndex = 0;
    orderActivity.current.selectedIndex = 0;
    setActualFilters({ name: '', order: '', continent: '', activity: '' })
    clearFilters();
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    clearFilters();
    setActualFilters(state => { return { ...state, name: searchedCountry.value.trim() } })
  }

  const handleInputChange = (e) => {
    setSearchedCountry({ value: e.target.value })
  }

  const handleContinentSelect = (e) => {
    clearFilters();
    setActualFilters(state => { return { ...state, continent: e.target.value } });
  }

  const handleAlphabeticallySelect = (e) => {
    clearFilters();
    let order = 'None';
    if (e.target.value === 'Z-A') order = 'DES_ALPHABETICALLY';
    if (e.target.value === 'A-Z') order = 'ASC_ALPHABETICALLY';
    orderPopulation.current.selectedIndex = 0;
    setActualFilters(state => { return { ...state, order } });
  }

  const handlePopulationSelect = (e) => {
    clearFilters();
    let order = 'None';
    if (e.target.value === 'Descendent') order = 'DES_POPULATION';
    if (e.target.value === 'Ascendent') order = 'ASC_POPULATION';
    orderAlphabetically.current.selectedIndex = 0;
    setActualFilters(state => { return { ...state, order } });
  }

  const handleActivitySelect = (e) => {
    clearFilters();
    setActualFilters(state => { return { ...state, activity: e.target.value } });
  }

  useEffect(() => {
    dispatch(filterCountries(actualFilters));
  }, [actualFilters]);

  useEffect(() => {
    setFilteredCountries(filteredCountriesReal);
  }, [filteredCountriesReal]);

  useEffect(() => {
    if (!activities.loaded) dispatch(getActivities());
  }, [activities]);

  useEffect(() => {
    return () => { cleanActivity() }
  }, []);

  useEffect(() => {
    if (!loaded) {
      dispatch(getCountries());
    }
  }, [loaded]);

  return (
    <div className={style.container}>
      <aside className={styleAside.container}>
        <p htmlFor="">Filters</p>

        <div className={styleAside.btnClearContainer}>
          <button onClick={handleClearFilters} className={styleAside.btnClear}>Clear Filters</button>
        </div>

        <div className={styleAside.searchContainer}>
          <div className={styleAside.labelSearch}>
            <label htmlFor="filter">By Name</label>
          </div>
          <div className={styleAside.inputSearchContainer}>
            <form onSubmit={handleOnSubmit} >
              <input onChange={handleInputChange} value={searchedCountry.value} type="text" placeholder='Country name' id='filter' /><a onClick={handleOnSubmit} href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
            </form>
          </div>
        </div>

        <div className={styleAside.filterContainer}>
          <label>Order by Continent</label>
          <select ref={orderContinent} defaultValue={'All'} className={styleAside.select} name="continent">
            {Array.from(['All', 'Africa', 'Antarctica', 'Asia', 'Europe', 'South America', 'North America', 'Oceania']).map((continent) => {
              return <option onClick={handleContinentSelect} key={continent} value={continent}>{continent}</option>
            })
            }
          </select>
        </div>

        <div className={styleAside.filterContainer}>
          <label>Order Alphabetically</label>
          <select onChange={handleAlphabeticallySelect} ref={orderAlphabetically} defaultValue={'None'} className={styleAside.select} name="continent">
            <option value='None'>None</option>
            {Array.from(['A-Z', 'Z-A']).map((continent) => {
              return <option key={continent} value={continent}>{continent}</option>
            })
            }
          </select>
        </div>

        <div className={styleAside.filterContainer}>
          <label>Order by Population</label>
          <select ref={orderPopulation} onChange={handlePopulationSelect} defaultValue={'None'} className={styleAside.select} name="continent">
            <option value="None">None</option>
            {Array.from(['Ascendent', 'Descendent']).map((continent) => {
              return <option key={continent} value={continent}>{continent}</option>
            })
            }
          </select>
        </div>

        <div className={styleAside.filterContainer}>
          <label>Order by Activity</label>
          <select ref={orderActivity} defaultValue={'All'} className={styleAside.select} name="continent">
            <option onClick={handleActivitySelect} value="All">All</option>
            {activities.all.map((activity) => {
              return <option onClick={handleActivitySelect} key={activity.id} value={activity.name}>{activity.name}</option>
            })
            }
          </select>
        </div>
      </aside>

      <main className={styleCountries.container}>
        <div className={styleCountries.titleContainer}>
          <h3>Countries</h3>
        </div>
        {loaded && filteredCountries?.length ?
          <div className={filteredCountries[0].error ? styleCountries.errorContainer : styleCountries.cardsContainer}>
            <> {filteredCountries[0]?.error ?
              // cuando no se encontró el país
              <div>
                <h3 className={styleCountries.countryDontFoundTitle}>There is no country with those filters =(<p>Try something else!</p></h3>
              </div>
              // cuando si existe el pais
              :
              filteredCountries.map((c, index) => {
                if (index <= limit.max && index >= limit.min) {
                  return (
                    <Link key={c.id} to={`/details/${c.id}`}>
                      <Card
                        name={c.name}
                        continent={c.continent}
                        subregion={c.subregion}
                        flag={c.flag}
                      />
                    </Link>)
                }
              })
            }
            </>
          </div>
          : <div className={styleCountries.cardsContainer}><Loading /></div>
        }
        <div className={styleCountries.containerPages}>
          <div className={styleCountries.pages}>
            {loaded ? getAllButtonsPages() : ''}
          </div>
        </div>
      </main>

    </div>
  )
}

export default Home;