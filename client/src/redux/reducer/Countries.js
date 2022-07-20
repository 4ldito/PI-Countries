import { CLEAN, GET_ALL_COUNTRIES, GET_ALL_COUNTRIES_BY_ALPHABETICALLY, GET_ALL_COUNTRIES_BY_CONTINENT, GET_ALL_COUNTRIES_BY_NAME, GET_ALL_COUNTRIES_BY_POPULATION } from "../actions/ActionTypes";

const initialState = {
    countries: [],
    countriesByName: [],
    countriesByContinent: [],
    countriesByPopulation: [],
    countriesByActivity: [],
    loaded: false
}

export default function countries(state = initialState, { type, payload }) {

    switch (type) {
        case GET_ALL_COUNTRIES:
            return { ...state, countries: payload, loaded: true }
        case GET_ALL_COUNTRIES_BY_NAME:
            return { ...state, countriesByName: payload }
        case GET_ALL_COUNTRIES_BY_CONTINENT:
            return { ...state, countriesByContinent: payload }
        case GET_ALL_COUNTRIES_BY_ALPHABETICALLY:
            return { ...state, countries: payload, loaded: true }
        case GET_ALL_COUNTRIES_BY_POPULATION:
            return { ...state, countriesByPopulation: payload }
        case CLEAN:
            return { countries: [], countriesByName: [], countriesByContinent: [], countriesByPopulation: [], loaded: false }
        default:
            return state;
    }
}