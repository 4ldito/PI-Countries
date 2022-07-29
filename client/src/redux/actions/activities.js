import axios from "axios";
import { CREATE_NEW_ACTIVITY, CLEAN, GET_ALL_ACTIVITIES, LOADING_NEW_ACTIVITY } from "./ActionTypes";


export function getActivities() {
    return async function (dispatch) {
        const response = await axios.get('api/activities/');
        dispatch({ type: GET_ALL_ACTIVITIES, payload: response.data });
    }
}

export function createActivity(activity) {
    return async function (dispatch) {
        try {
            dispatch({ type: LOADING_NEW_ACTIVITY, payload: true });
            const response = await axios.post('api/activities/', activity);
            dispatch({ type: LOADING_NEW_ACTIVITY, payload: false });
            dispatch({ type: CREATE_NEW_ACTIVITY, payload: response.data });
        } catch (error) {
            dispatch({ type: LOADING_NEW_ACTIVITY, payload: false });
            dispatch({ type: CREATE_NEW_ACTIVITY, payload: { error: error.response.data } });
        }
    }
}

export function cleanActivity() {
    return {
        type: CLEAN
    }
}