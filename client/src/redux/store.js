import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer/index';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)),
);

