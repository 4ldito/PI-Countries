import { CREATE_NEW_ACTIVITY } from "../actions/ActionTypes";

const initialState = {
    activities: [],
    newActivity: {created: false, info: ''}
}

export default function activities(state = initialState, { type, payload }) {

    switch (type) {
        case CREATE_NEW_ACTIVITY:
            return { ...state, newActivity: {created: true, info: payload} }
        default:
            return state;
    }
}