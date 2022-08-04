import { useEffect, useState } from 'react';
import { useFetchCountries } from '../../hooks/useFetchCountries';

import Loading from '../Loading/Loading';
import Pagination from './Pagination/Pagination';
import AllCountries from './AllCountries/AllCountries';

import style from './Countries.module.css';

const Countries = () => {
    const [limit, setLimit] = useState({ min: 0, max: 8 });
    const [pageNumber, setPageNumber] = useState(1);
    const { filteredCountries, loaded } = useFetchCountries();

    useEffect(() => {
        setLimit({ min: 0, max: 8 });
        setPageNumber(1);
    }, [filteredCountries]);

    return (
        <main className={style.container}>
            <div className={style.titleContainer}>
                <h3>Countries</h3>
            </div>
            {loaded && filteredCountries.length ?
                <AllCountries
                    filteredCountries={filteredCountries}
                    limit={limit}
                />
                :
                <div className={style.cardsContainer}>
                    <Loading />
                </div>
            }
            {loaded ?
                <Pagination
                    countries={filteredCountries}
                    setLimit={setLimit}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                /> : <></>}
        </main>
    )
}

export default Countries;