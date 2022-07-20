import { CREATE_NEW_ACTIVITY, CLEAN, GET_ALL_ACTIVITIES } from "../actions/ActionTypes";
const initialState = {
    activities: { all: [], loaded: false },
    newActivity: { created: false, info: '', error: '' },
    newActivityloading: false
}

export default function activities(state = initialState, { type, payload }) {

    switch (type) {
        case GET_ALL_ACTIVITIES:
            return { ...state, activities: { all: payload, loaded: true } }
        case CREATE_NEW_ACTIVITY:
            return payload.error ? { ...state, newActivity: { created: false, info: payload } } :
                { ...state, newActivity: { created: true, info: payload } }
        case CLEAN:
            return { activities: { all: [], loaded: false }, newActivity: { created: false, info: '', error: '' } }
        default:
            return state;
    }
}