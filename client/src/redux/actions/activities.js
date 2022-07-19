import axios from "axios";
import { CREATE_NEW_ACTIVITY } from "./ActionTypes";

export function createActivity(activity) {
    console.log(activity);
    return async function (dispatch) {
        const response = await axios.post('http://127.0.0.1:3001/api/activities/', activity);

        dispatch({ type: CREATE_NEW_ACTIVITY, payload: response.data });
    }
}
