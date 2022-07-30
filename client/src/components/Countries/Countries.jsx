/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../../redux/actions/countries';
import styleCountries from './Countries.module.css';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import { setActivePage } from './../../redux/actions/countries';

const Countries = () => {
    const dispatch = useDispatch();

    const [limit, setLimit] = useState({ min: 0, max: 8 });

    const filteredCountries = useSelector(state => state.countries.filteredCountries);
    const loaded = useSelector(state => state.countries.loaded);
    const activePage = useSelector(state => state.countries.activePage);

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
            max = 8;
        } else {
            min = ((pag - 1) * 10) - 1;
            max = ((pag - 1) * 10) + 8;
        }
        setLimit({ min, max });
        pageActive(btn);
    }

    const getAllButtonsPages = () => {
        const totalPages = ((filteredCountries.length + 1) / 10);
        const buttonsPage = [];
        for (let i = 0; i < totalPages; i++) {
            buttonsPage.push(<a key={i} onClick={handleOnClick} className={i === 0 ? `${styleCountries.active} ${styleCountries.btnPage}` : styleCountries.btnPage} href="#">{i + 1}</a>)
        }
        return buttonsPage;
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        const pag = Number(e.target.innerText);
        dispatch(setActivePage(pag, e.target));
    }

    useEffect(() => {
        if (loaded) selectedPage(activePage.page, activePage.btn);
    }, [loaded, activePage]);

    useEffect(() => {
        if (!loaded) dispatch(getCountries());
    }, [loaded]);

    return (
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
                                    <div key={c.id} className={styleCountries.cardCointaner}>
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
                <div className={styleCountries.cardsContainer}>
                    <Loading />
                </div>
            }
            <div className={styleCountries.containerPages}>
                <div className={styleCountries.pages}>
                    {loaded ? getAllButtonsPages() : ''}
                </div>
            </div>
        </main>
    )
}

export default Countries