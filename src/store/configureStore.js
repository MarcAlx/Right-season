import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AppReducer from '../reducers/AppReducer';

export default function configureStore(initialState) {
    return createStore(
        AppReducer,
        initialState,
        applyMiddleware(thunkMiddleware)
    );
}