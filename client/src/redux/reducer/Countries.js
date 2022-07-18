import { GET_ALL_COUNTRIES } from "../actions/ActionTypes";

const initialState = {
    countries: [],
    loaded: false
}

export default function countries(state = initialState, { type, payload }) {

    switch (type) {
        case GET_ALL_COUNTRIES:
            return {...state, countries: payload, loaded: true}

        default:
            return state;
    }
}