import { combineReducers } from "redux";
import countries from './Countries';
import activities from './Activities'

const rootReducer = combineReducers({countries, activities});

export default rootReducer;