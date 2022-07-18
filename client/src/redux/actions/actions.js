import { GET_ALL_COUNTRIES, GET_ALL_COUNTRIES_BY_ALPHABETICALLY, GET_ALL_COUNTRIES_BY_CONTINENT, GET_ALL_COUNTRIES_BY_NAME } from "./ActionTypes";
import axios from 'axios';

export function getCountries() {
    return async function (dispatch) {
        const response = await axios.get('http://127.0.0.1:3001/api/countries/');
        dispatch({ type: GET_ALL_COUNTRIES, payload: response.data });
    }
}

export function getCountriesByName(name) {
    return function (dispatch) { 
        return axios.get(`http://127.0.0.1:3001/api/countries?name=${name}`)
        .then((response) => {
            dispatch({type: GET_ALL_COUNTRIES_BY_NAME, payload: response.data});
        }).catch(err => console.log(err))
    }
}

export function getCountriesAlphabetically(order) {
    order ? order = `?order=${order}` : order = '';
    console.log(order);
    return function (dispatch) { 
        return axios.get(`http://127.0.0.1:3001/api/countries${order}`)
        .then((response) => {
            console.log(response.data)
            dispatch({type: GET_ALL_COUNTRIES_BY_ALPHABETICALLY, payload: response.data});
        }).catch(err => console.log(err))
    }
}


export function getCountriesByContinent(name) {
    return function (dispatch) {
        return axios.get(`http://127.0.0.1:3001/api/countries/continent/${name}`)
        .then((response) => {

            dispatch({type: GET_ALL_COUNTRIES_BY_CONTINENT, payload: response.data})
        })
    }
}