/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useFetchCountries } from '../../hooks/useFetchCountries';
import { Link } from 'react-router-dom';

import Card from '../Card/Card';
import Loading from '../Loading/Loading';

import style from './Countries.module.css';

const Countries = () => {
    const [limit, setLimit] = useState({ min: 0, max: 8 });
    const { filteredCountries, loaded } = useFetchCountries();

    const getAllButtonsPages = () => {
        const totalPages = ((filteredCountries.length + 1) / 10);
        const buttonsPage = [];
        for (let i = 0; i < totalPages; i++) {
            buttonsPage.push(<a key={i} onClick={handleOnClickPage} className={i === 0 ? `${style.active} ${style.btnPage}` : style.btnPage} href="#">{i + 1}</a>)
        }
        return buttonsPage;
    }

    const handleOnClickPage = (e) => {
        e.preventDefault();
        const pag = Number(e.target.innerText);
        selectedPage(pag, e.target);
    }

    const pageActive = (btn) => {
        const lastActive = document.querySelector(`.${style.active}`);
        if (lastActive) lastActive.classList.remove(style.active);
        if (!btn) btn = document.querySelector(`.${style.btnPage}`);
        if (!btn) return;
        btn.classList.add(style.active);
    }

    const selectedPage = (pag, btn) => {
        let min, max;
        if (pag === 1) {
            min = 0;
            max = 8;
        } else {
            min = ((pag - 1) * 10) - 1;
            max = ((pag - 1) * 10) + 8;
        }
        setLimit({ min, max });
        pageActive(btn);
    }

    useEffect(() => {
        selectedPage(1, null);
    }, [filteredCountries]);

    return (
        <main className={style.container}>
            <div className={style.titleContainer}>
                <h3>Countries</h3>
            </div>
            {loaded && filteredCountries?.length ?
                <div className={filteredCountries[0].error ? style.errorContainer : style.cardsContainer}>
                    <> {filteredCountries[0]?.error ?
                        // cuando no se encontró el país
                        <div>
                            <h3 className={style.countryDontFoundTitle}>There is no country with those filters =(<p>Try something else!</p></h3>
                        </div>
                        // cuando si existe el pais
                        :
                        filteredCountries.map((c, index) => {
                            if (index <= limit.max && index >= limit.min) {
                                return (
                                    <div key={c.id} className={style.cardCointaner}>
                                        <Link to={`/details/${c.id}`}>
                                            <Card
                                                name={c.name}
                                                continent={c.continent}
                                                subregion={c.subregion}
                                                flag={c.flag}
                                            />
                                        </Link>
                                    </div>)
                            }
                            return '';
                        })
                    }
                    </>
                </div>
                :
                <div className={style.cardsContainer}>
                    <Loading />
                </div>
            }
            <div className={style.containerPages}>
                <div className={style.pages}>
                    {loaded ? getAllButtonsPages() : 1}
                </div>
            </div>
        </main>
    )
}

export default Countries