/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { getCountries } from './../../redux/actions/actions';

import style from './Home.module.css';
import styleAside from './Aside.module.css';
import styleCountries from './Countries.module.css';

const Home = () => {

  const dispatch = useDispatch();

  const [searchedCountry, setSearchedCountry] = useState({value: ''});
  //Limite de paginas
  const [limit, setLimit] = useState({ min: 0, max: 8 });
  const [filteredCountries, setFilteredCountries] = useState([]);

  const { countries } = useSelector(state => state.countries);
  const loaded = useSelector(state => state.countries.loaded);


  let buttonsPage = [];

  const pageActive = (btn) => {
    const lastActive = document.querySelector(`.${styleCountries.active}`);
    if (lastActive) lastActive.classList.remove(styleCountries.active);
    btn.classList.add(styleCountries.active);
  }

  const selectedPage = (pag) => {
    let min, max;
    if (pag === 1) {
      min = 0;
      max = pag * 10 - 2
    } else {
      min = ((pag - 1) * 10) - 1;
      max = ((pag - 1) * 10) + 8;
    }
    setLimit({ min, max });
  }

  const handleOnClick = (e) => {
    e.preventDefault();
    const pag = Number(e.target.innerText);
    selectedPage(pag);
    pageActive(e.target)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // modificar para que sea con /post?query
    const newFilter = countries.filter(country => {
      const regex = new RegExp(searchedCountry.value.trim(), "gmi");
      const isCountry = regex.exec(country.name);
      if (isCountry) {
        country.index = isCountry.index
        return country;
      }
    });

    if (newFilter.length <= 0) alert('No se encontraron >c');

    newFilter.sort((a, b) => a.index - b.index);
    setFilteredCountries(newFilter);
    selectedPage(1);
  }

  const handleOnChange = (e) => {
    setSearchedCountry({value: e.target.value})
  }

  const getAllButtonsPages = () => {
    const totalPages = ((filteredCountries.length + 1) / 10);
    buttonsPage = [];
    for (let i = 0; i < totalPages; i++) {
      buttonsPage.push(<a key={i} onClick={handleOnClick} className={i === 0 ? `${styleCountries.active} ${styleCountries.btnPage}` : styleCountries.btnPage} href="#">{i + 1}</a>)
    }
    return buttonsPage;
  }

  useEffect(() => {
    if (!loaded) {
      dispatch(getCountries());
    } else {
      setFilteredCountries(countries);
    }

  }, [loaded]);


  return (
    <div className={style.container}>
      <aside className={styleAside.container}>
        <div className={styleAside.searchContainer}>
          <div className={styleAside.labelSearch}>
            <label htmlFor="filter">Search</label>
          </div>
          <div className={styleAside.inputSearchContainer}>
            <form onSubmit={handleOnSubmit} >
              <input onChange={handleOnChange} value={searchedCountry.value} type="text" placeholder='Country name' id='filter' /><a href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
            </form>
          </div>
        </div>

        <div className={styleAside.filterContinentsContainer}>
          <select defaultValue={'test'} className={styleAside.select} name="continent" id="">
            {/* <option disabled selected>Select a continent</option> */}
            <option value="item 1">Item 1</option>
            <option value="item 2">Item 2</option>
            <option value="item 3">Item 3</option>
          </select>
        </div>
      </aside>

      <main className={styleCountries.container}>
        <div className={styleCountries.titleContainer}>
          <h3>Countries</h3>
        </div>
        <div className={styleCountries.cardsContainer}>
          {loaded ?
            <>
              {filteredCountries.map((element, index) => {
                if (index <= limit.max && index >= limit.min) {
                  return <Card
                    name={element.name}
                    continent={element.continent}
                    flag={element.flag}
                    key={element.id}
                  />
                }
              })
              }
            </>
            : <p>cargando</p>}
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