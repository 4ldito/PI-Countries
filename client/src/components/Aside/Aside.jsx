/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { filterCountries } from '../../redux/actions/countries';

import style from './Aside.module.css';
import { useFetchActivities } from './../../hooks/useFetchActivities';

const Aside = () => {
    const dispatch = useDispatch();
    const [actualFilters, setActualFilters] = useState({
        name: '',
        order: '', // este hace referencia a alfabeticamente y por poblacion
        continent: '',
        activity: ''
    });
    const [searchedCountry, setSearchedCountry] = useState({ value: '' });

    // const activities = useSelector(state => state.activities.activities);
    const { activities } = useFetchActivities();

    const asideContainer = useRef(null);
    const orderAlphabetically = useRef(null);
    const orderContinent = useRef(null);
    const orderPopulation = useRef(null);
    const orderActivity = useRef(null);

    const clearFilters = () => {
        asideContainer.current.classList.toggle(style.showContainer);
    }

    const handleShowFilters = (e) => {
        e.preventDefault();
        asideContainer.current.classList.toggle(style.showContainer);
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
        else if (e.target.value === 'A-Z') order = 'ASC_ALPHABETICALLY';
        orderPopulation.current.selectedIndex = 0;
        setActualFilters(state => { return { ...state, order } });
    }

    const handlePopulationSelect = (e) => {
        clearFilters();
        let order = 'None';
        if (e.target.value === 'Descendent') order = 'DES_POPULATION';
        else if (e.target.value === 'Ascendent') order = 'ASC_POPULATION';
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

    return (
        <>
            <div className={style.btnMenuFilters}>
                <a onClick={handleShowFilters} href="#"><i className={`fa-solid fa-filter ${style.icon}`}></i>Filters</a>
            </div>
            <aside ref={asideContainer} className={style.container}>
                <p>Filters</p>

                <div className={style.btnClearContainer}>
                    <button onClick={handleClearFilters} className={style.btnClear}>Clear Filters</button>
                </div>

                <div className={style.searchContainer}>
                    <div className={style.labelSearch}>
                        <label htmlFor="filter">By Name</label>
                    </div>
                    <div className={style.inputSearchContainer}>
                        <form onSubmit={handleOnSubmit} >
                            <input onChange={handleInputChange} value={searchedCountry.value} type="text" placeholder='Country name' id='filter' />
                            <a onClick={handleOnSubmit} href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
                        </form>
                    </div>
                </div>

                <div className={style.filterContainer}>
                    <label htmlFor='continent'>Order by Continent</label>
                    <select onChange={handleContinentSelect} ref={orderContinent} defaultValue={'All'} className={style.select} id="continent">
                        {Array.from(['All', 'Africa', 'Antarctica', 'Asia', 'Europe', 'South America', 'North America', 'Oceania']).map((continent) => {
                            return <option key={continent} value={continent}>{continent}</option>
                        })
                        }
                    </select>
                </div>

                <div className={style.filterContainer}>
                    <label htmlFor='orderAlphabetically'>Order Alphabetically</label>
                    <select onChange={handleAlphabeticallySelect} ref={orderAlphabetically} defaultValue={'None'} className={style.select} id="orderAlphabetically">
                        <option value='None'>None</option>
                        {Array.from(['A-Z', 'Z-A']).map((order) => {
                            return <option key={order} value={order}>{order}</option>
                        })
                        }
                    </select>
                </div>

                <div className={style.filterContainer}>
                    <label htmlFor='orderPopulation'>Order by Population</label>
                    <select ref={orderPopulation} onChange={handlePopulationSelect} defaultValue={'None'} className={style.select} id="orderPopulation">
                        <option value="None">None</option>
                        {Array.from(['Ascendent', 'Descendent']).map((order) => {
                            return <option key={order} value={order}>{order}</option>
                        })
                        }
                    </select>
                </div>

                <div className={style.filterContainer}>
                    <label htmlFor='activities'>Order by Activity</label>
                    <select onChange={handleActivitySelect} ref={orderActivity} defaultValue={'All'} className={style.select} id="activities">
                        <option value="All">All</option>
                        {activities.all.map((activity) => {
                            return <option key={activity.id} value={activity.name}>{activity.name}</option>
                        })
                        }
                    </select>
                </div>
            </aside>
        </>
    )
}

export default Aside