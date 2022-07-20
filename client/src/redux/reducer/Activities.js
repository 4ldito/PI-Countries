import { CREATE_NEW_ACTIVITY,CLEAN } from "../actions/ActionTypes";
const initialState = {
    activities: [],
    newActivity: { created: false, info: '', error: '' }
}

export default function activities(state = initialState, { type, payload }) {

    switch (type) {
        case CREATE_NEW_ACTIVITY:
            return payload.error ? { ...state, newActivity: { created: false, info: payload } } :
                { ...state, newActivity: { created: true, info: payload } }
        case CLEAN:
            return {...state, newActivity: { created: false, info: '', error: '' }}
        default:
            return state;
    }
}