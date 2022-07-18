import { GET_ALL_COUNTRIES, GET_ALL_COUNTRIES_BY_ALPHABETICALLY, GET_ALL_COUNTRIES_BY_CONTINENT, GET_ALL_COUNTRIES_BY_NAME } from "../actions/ActionTypes";

const initialState = {
    countries: [],
    countriesByName: [],
    countriesByContinent: [],
    loaded: false
}

export default function countries(state = initialState, { type, payload }) {

    switch (type) {
        case GET_ALL_COUNTRIES:
            return { ...state, countries: payload, loaded: true }
        case GET_ALL_COUNTRIES_BY_NAME:
            return { ...state, countriesByName: payload }
        case GET_ALL_COUNTRIES_BY_CONTINENT:
            return {...state, countriesByContinent: payload}
        case GET_ALL_COUNTRIES_BY_ALPHABETICALLY:
            console.log('payload:', payload);
            return {...state, countries: payload, loaded: true}

        default:
            return state;
    }
}