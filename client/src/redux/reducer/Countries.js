import {
    CLEAN,
    CLEAN_COUNTRY_ID,
    FILTER_COUNTRIES,
    GET_ALL_COUNTRIES,
    GET_COUNTRY_BY_ID
} from "../actions/ActionTypes";

const initialState = {
    countries: [],
    filteredCountries: [],
    countryById: {},
    activePage: { page: 1, btn: null },
    loaded: false
}

export default function countries(state = initialState, { type, payload }) {

    switch (type) {
        case GET_ALL_COUNTRIES:
            return { ...state, countries: payload, filteredCountries: payload, loaded: true }
        case FILTER_COUNTRIES:
            let { filterByName, activity, order, continent } = payload;
            if (continent && continent !== 'All') filterByName = filterByName.filter((c) => c.continent === continent);

            if (activity && activity !== 'All') filterByName = filterByName.filter((c) => {
                const activities = c.Activities.filter(acc => {
                    return acc.name === activity;
                });
                return activities.length ? activities : false;
            });

            if (order) {
                switch (order) {
                    case 'ASC_ALPHABETICALLY':
                        filterByName = filterByName.sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    case 'DES_ALPHABETICALLY':
                        filterByName = filterByName.sort((a, b) => b.name.localeCompare(a.name));
                        break;
                    case 'ASC_POPULATION':
                        filterByName = filterByName.sort((a, b) => a.population - b.population);
                        break;
                    case 'DES_POPULATION':
                        filterByName = filterByName.sort((a, b) => b.population - a.population);
                        break;
                    default:
                        break;
                }
            }
            if (filterByName.length === 0) filterByName.push({ error: 'No se encontraron paises' });
            return { ...state, filteredCountries: filterByName }
        case GET_COUNTRY_BY_ID:
            return { ...state, countryById: { data: payload, loaded: true } }
        case CLEAN_COUNTRY_ID:
            return { ...state, countryById: {} }
        case CLEAN:
            return {
                countries: [],
                countriesByName: [],
                countriesByContinent: [],
                countriesByPopulation: [],
                countriesByActivity: [],    
                countryById: {},
                loaded: false
            }
        default:
            return state;
    }
}