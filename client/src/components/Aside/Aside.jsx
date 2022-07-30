/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCountries, setActivePage } from '../../redux/actions/countries';

import styleAside from './Aside.module.css';
import { getActivities } from './../../redux/actions/activities';

const Aside = () => {
    const dispatch = useDispatch();
    const [actualFilters, setActualFilters] = useState({
        name: '',
        order: '', // este hace referencia a alfabeticamente y por poblacion
        continent: '',
        activity: ''
    });
    const [searchedCountry, setSearchedCountry] = useState({ value: '' });

    const activities = useSelector(state => state.activities.activities);

    const asideContainer = useRef(null);
    const orderAlphabetically = useRef(null);
    const orderContinent = useRef(null);
    const orderPopulation = useRef(null);
    const orderActivity = useRef(null);

    const clearFilters = () => {
        dispatch(setActivePage(1));
        asideContainer.current.classList.toggle(styleAside.showContainer);
    }

    const handleShowFilters = (e) => {
        e.preventDefault();
        asideContainer.current.classList.toggle(styleAside.showContainer);
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

    useEffect(() => {
        if (!activities.loaded) dispatch(getActivities());
    }, [activities]);


    return (
        <>
            <div className={styleAside.btnMenuFilters}>
                <a onClick={handleShowFilters} href="#"><i className={`fa-solid fa-filter ${styleAside.icon}`}></i>Filters</a>
            </div>
            <aside ref={asideContainer} className={styleAside.container}>
                <p>Filters</p>

                <div className={styleAside.btnClearContainer}>
                    <button onClick={handleClearFilters} className={styleAside.btnClear}>Clear Filters</button>
                </div>

                <div className={styleAside.searchContainer}>
                    <div className={styleAside.labelSearch}>
                        <label htmlFor="filter">By Name</label>
                    </div>
                    <div className={styleAside.inputSearchContainer}>
                        <form onSubmit={handleOnSubmit} >
                            <input onChange={handleInputChange} value={searchedCountry.value} type="text" placeholder='Country name' id='filter' />
                            <a onClick={handleOnSubmit} href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
                        </form>
                    </div>
                </div>

                <div className={styleAside.filterContainer}>
                    <label htmlFor='continent'>Order by Continent</label>
                    <select onChange={handleContinentSelect} ref={orderContinent} defaultValue={'All'} className={styleAside.select} id="continent">
                        {Array.from(['All', 'Africa', 'Antarctica', 'Asia', 'Europe', 'South America', 'North America', 'Oceania']).map((continent) => {
                            return <option key={continent} value={continent}>{continent}</option>
                        })
                        }
                    </select>
                </div>

                <div className={styleAside.filterContainer}>
                    <label htmlFor='orderAlphabetically'>Order Alphabetically</label>
                    <select onChange={handleAlphabeticallySelect} ref={orderAlphabetically} defaultValue={'None'} className={styleAside.select} id="orderAlphabetically">
                        <option value='None'>None</option>
                        {Array.from(['A-Z', 'Z-A']).map((order) => {
                            return <option key={order} value={order}>{order}</option>
                        })
                        }
                    </select>
                </div>

                <div className={styleAside.filterContainer}>
                    <label htmlFor='orderPopulation'>Order by Population</label>
                    <select ref={orderPopulation} onChange={handlePopulationSelect} defaultValue={'None'} className={styleAside.select} id="orderPopulation">
                        <option value="None">None</option>
                        {Array.from(['Ascendent', 'Descendent']).map((order) => {
                            return <option key={order} value={order}>{order}</option>
                        })
                        }
                    </select>
                </div>

                <div className={styleAside.filterContainer}>
                    <label htmlFor='activities'>Order by Activity</label>
                    <select onChange={handleActivitySelect} ref={orderActivity} defaultValue={'All'} className={styleAside.select} id="activities">
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