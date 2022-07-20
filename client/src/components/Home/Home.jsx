/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { getCountriesByName, getCountriesByContinent, getCountriesAlphabetically, getCountriesByPopulation, getCountriesByActivity } from './../../redux/actions/countries';

import style from './Home.module.css';
import styleAside from './Aside.module.css';
import styleCountries from './Countries.module.css';
import { cleanActivity, getActivities } from './../../redux/actions/activities';
import Loading from '../Loading/Loading';

const Home = () => {
  const dispatch = useDispatch();

  const [searchedCountry, setSearchedCountry] = useState({ value: '' });

  const [limit, setLimit] = useState({ min: 0, max: 8 });
  const [filteredCountries, setFilteredCountries] = useState([]);

  const countries = useSelector(state => state.countries.countries);
  const loaded = useSelector(state => state.countries.loaded);
  const countriesByName = useSelector(state => state.countries.countriesByName);
  const countriesByContinent = useSelector(state => state.countries.countriesByContinent);
  const countriesByPopulation = useSelector(state => state.countries.countriesByPopulation);

  const activities = useSelector(state => state.activities.activities);

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
    pageActive(btn)
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
    // setSearchedCountry({value: ''});
    // console.log(selectRef.current);
    selectedPage(1);
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    const pag = Number(e.target.innerText);
    selectedPage(pag, e.target);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    clearFilters();
    dispatch(getCountriesByName(searchedCountry.value.trim()));
  }

  const handleInputChange = (e) => {
    setSearchedCountry({ value: e.target.value })
  }

  const handleContinentSelect = (e) => {
    clearFilters();
    dispatch(getCountriesByContinent(e.target.value));
  }

  const handleAlphabeticallySelect = (e) => {
    clearFilters();
    if (e.target.value === 'Z-A') dispatch(getCountriesAlphabetically('DES'))
    else dispatch(getCountriesAlphabetically());
  }

  const handlePopulationSelect = (e) => {
    clearFilters();
    // console.log(countriesByPopulation)
    if (e.target.value === 'Descendent') dispatch(getCountriesByPopulation('DES'))
    else dispatch(getCountriesByPopulation());
  }

  const handleActivitySelect = (e) => {
    clearFilters();
    dispatch(getCountriesByActivity(e.target.value));
  }

  useEffect(() => {
    setFilteredCountries(countriesByPopulation);
  }, [countriesByPopulation]);

  useEffect(() => {
    if (countriesByContinent.length) setFilteredCountries(countriesByContinent);
  }, [countriesByContinent]);

  useEffect(() => {
    // console.log(countries);
    setFilteredCountries(countries);
  }, [countries]);

  useEffect(() => {
    if (!activities.loaded) dispatch(getActivities());
  }, [activities]);

  useEffect(() => {

    return () => { cleanActivity() }
  }, []);

  useEffect(() => {
    if (!loaded) {
      dispatch(getCountriesAlphabetically());
    } else {
      if (countriesByName.length) {
        setFilteredCountries(countriesByName);
      }
    }
  }, [loaded, countriesByName]);

  return (
    <div className={style.container}>
      <aside className={styleAside.container}>
        <p htmlFor="">Filters</p>
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
          <label>Order Alphabetically</label>
          <select defaultValue={'A-Z'} className={styleAside.select} name="continent">
            {Array.from(['A-Z', 'Z-A']).map((continent) => {
              return <option onClick={handleAlphabeticallySelect} key={continent} value={continent}>{continent}</option>
            })
            }
          </select>
        </div>

        <div className={styleAside.filterContainer}>
          <label>Order by Continent</label>
          <select defaultValue={'All'} className={styleAside.select} name="continent">
            {Array.from(['All', 'Africa', 'Antarctica', 'Asia', 'Europe', 'South America', 'North America', 'Oceania']).map((continent) => {
              return <option onClick={handleContinentSelect} key={continent} value={continent}>{continent}</option>
            })
            }
          </select>
        </div>

        <div className={styleAside.filterContainer}>
          <label>Order by Population</label>
          <select defaultValue={'None'} className={styleAside.select} name="continent">
            <option disabled value="None">None</option>
            {Array.from(['Ascendent', 'Descendent']).map((continent) => {
              return <option onClick={handlePopulationSelect} key={continent} value={continent}>{continent}</option>
            })
            }
          </select>
        </div>

        <div className={styleAside.filterContainer}>
          <label>Order by Activity</label>
          <select defaultValue={'All'} className={styleAside.select} name="continent">
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
        <div className={styleCountries.cardsContainer}>
          {loaded ?
            <> {filteredCountries[0]?.error ? 'no se encontraron' :

              filteredCountries.map((element, index) => {
                if (index <= limit.max && index >= limit.min) {
                  return <Card
                    name={element.name}
                    continent={element.continent}
                    subregion={element.subregion}
                    flag={element.flag}
                    key={element.id}
                  />
                }
              })
            }
            </>
            : <Loading />}
        </div>
        <div className={styleCountries.containerPages}>
          <div className={styleCountries.pages}>
            {loaded ? getAllButtonsPages() : ''}
          </div>
        </div>
      </main>

    </div>
  )
}

export default Home