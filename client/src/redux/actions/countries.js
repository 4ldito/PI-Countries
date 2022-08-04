import {
    CLEAN,
    GET_ALL_COUNTRIES,
    GET_COUNTRY_BY_ID,
    CLEAN_COUNTRY_ID,
    FILTER_COUNTRIES
} from "./ActionTypes";

import axios from 'axios';

export function getCountries() {
    return async function (dispatch) {
        try {
            const response = await axios.get('api/countries/');
            dispatch({ type: GET_ALL_COUNTRIES, payload: response.data });
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterCountries(filters) {
    if (!filters.name) filters.name = '';
    return function (dispatch) {
        return axios.get(`api/countries?name=${filters.name}`)
            .then((response) => {
                dispatch({ type: FILTER_COUNTRIES, payload: { filterByName: response.data, ...filters } });
            }).catch(err => console.log(err))
    }

}

export function getCountryById(id) {
    return function (dispatch) {
        return axios.get(`api/countries/${id}`)
            .then((response) => {
                dispatch({ type: GET_COUNTRY_BY_ID, payload: response.data });
            }).catch(err => {
                dispatch({ type: GET_COUNTRY_BY_ID, payload: { error: err.response.data } });
            })
    }
}

export function cleanCountryId() {
    return {
        type: CLEAN_COUNTRY_ID
    }
}

export function clean() {
    return {
        type: CLEAN
    }
}