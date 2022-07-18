import { GET_ALL_COUNTRIES, GET_ALL_COUNTRIES_BY_NAME } from "./ActionTypes";
import axios from 'axios';

export function getCountries() {
    return async function (dispatch) {
        const response = await axios.get('http://127.0.0.1:3001/api/countries/');
        dispatch({ type: GET_ALL_COUNTRIES, payload: response.data });
    }
}

export function getCountriesByName(name) {
    return function (dispatch) { 
        return axios.get(`http://127.0.0.1:3001/api/countries/${name}`)
        .then((response) => {
            dispatch({type: GET_ALL_COUNTRIES_BY_NAME, payload: response.data});
        })
    }
}