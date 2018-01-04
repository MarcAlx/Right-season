import * as actionType from '../actions/ActionType.js';
import * as config from "./Config.js";
import data from "../assets/data.json";

export default function AppReducer(state=config.initialState, action) {
    switch (action.type) {
        case actionType.SEARCH:
            console.log(data);
            //TODO perform search here in data.json and add it to state
            return Object.assign({}, state, {
                input:action.input
            });
        default:
            return state;
    }
}