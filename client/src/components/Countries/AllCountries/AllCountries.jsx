import { Link } from 'react-router-dom';

import Card from '../../Card/Card';

import style from './AllCountries.module.css';

const AllCountries = ({ filteredCountries, limit }) => {

    const countries = [];

    for (let i = limit.min; i <= limit.max; i++) {
        const country = filteredCountries[i];
        if (!country) break;
        countries.push(country);
    }

    return (
        <div className={filteredCountries[0].error ? style.errorContainer : style.cardsContainer}>
            <> {filteredCountries[0]?.error ?
                // cuando no se encontró el país
                <div>
                    <h3 className={style.countryDontFoundTitle}>There is no country with those filters =(<p>Try something else!</p></h3>
                </div>
                // cuando si existe el pais
                :
                countries.map((country) => {
                    return (
                        <div key={country.id} className={style.cardCointaner}>
                            <Link to={`/details/${country.id}`}>
                                <Card
                                    name={country.name}
                                    continent={country.continent}
                                    flag={country.flag}
                                />
                            </Link>
                        </div>
                    )
                }
                )
            }
            </>
        </div>
    )
}

export default AllCountries