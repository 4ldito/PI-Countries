/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import style from './Aside.module.css';

const Aside = (props) => {
    console.log(props);
    return (
        <aside className={style.container}>
            <div className={style.searchContainer}>

                <div className={style.labelSearch}>
                    <label htmlFor="filter">Search</label>
                </div>
                <div className={style.inputSearchContainer}>
                    <input type="text" placeholder='Country name' id='filter' /><a href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
                </div>
            </div>

            <div className={style.filterContinentsContainer}>
                <select defaultValue={'ola'} className={style.select} name="continent" id="">
                {/* <option disabled selected>Select a continent</option> */}
                    <option value="item 1">Item 1</option>
                    <option value="item 2">Item 2</option>
                    <option value="item 3">Item 3</option>
                </select>
            </div>

        </aside>
    )
}

export default Aside