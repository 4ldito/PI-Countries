import axios from "axios";
import { CREATE_NEW_ACTIVITY, CLEAN } from "./ActionTypes";

export function createActivity(activity) {
    return async function (dispatch) {
        try {
            const response = await axios.post('http://127.0.0.1:3001/api/activities/', activity);
            dispatch({ type: CREATE_NEW_ACTIVITY, payload: response.data });
        } catch (error) {
            dispatch({ type: CREATE_NEW_ACTIVITY, payload: { error: error.response.data } });
        }
    }
}


export function clean() {
    return {
        type: CLEAN
    }
}