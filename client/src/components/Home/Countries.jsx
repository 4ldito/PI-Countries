/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from './../../redux/actions/actions';
import Card from './Card';

import style from './Countries.module.css';

const Countries = () => {
    const dispatch = useDispatch();

    const { countries } = useSelector(state => state.countries);
    const loaded = useSelector(state => state.countries.loaded);
    let buttons = [];

    const [limit, setLimit] = useState({ min: 0, max: 8 });
    const [filteredCountries, setFilteredCountries] = useState([]);

    const pageActive = (btn) => {
        const lastActive = document.querySelector(`.${style.active}`);
        if (lastActive) lastActive.classList.remove(style.active);
        btn.classList.add(style.active);
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        const pag = Number(e.target.innerText);
        let min, max;
        if (pag === 1) {
            min = 0;
            max = pag * 10 - 2
        } else {
            min = ((pag - 1) * 10) - 1;
            max = ((pag - 1) * 10) + 8;
        }
        setLimit({ min, max });
        pageActive(e.target)
    }

    const getAllPages = () => {
        const totalPages = ((filteredCountries.length) / 10) + 1;
        buttons = [];
        for (let i = 0; i < totalPages; i++) {
            buttons.push(<a key={i} onClick={handleOnClick} className={i === 0 ? `${style.active} ${style.btnPage}` : style.btnPage} href="#">{i + 1}</a>)
        }
        return buttons;
    }

    useEffect(() => {
        if (!loaded) {
            dispatch(getCountries());
        } else {
            setFilteredCountries(countries);
        }

    }, [loaded]);

    return (
        <main className={style.container}>
            <div className={style.titleContainer}>
                <h3>Countries</h3>
            </div>
            <div className={style.cardsContainer}>
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
            <div className={style.containerPages}>
                <div className={style.pages}>
                    {loaded ? getAllPages() : ''}
                </div>
            </div>
        </main>
    )
}

export default Countries