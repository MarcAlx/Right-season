import * as actionType from '../actions/ActionType.js';
import * as config from "./Config.js";
//import data from "../assets/data.json";

export default function AppReducer(state=config.initialState, action) {
    switch (action.type) {
        case actionType.SEARCH:
            return Object.assign({}, state, {
                input:action.input
            });    
        case actionType.SET_CONFIG:
            return Object.assign({}, state, {
                config:action.config
            });
        case actionType.SET_DATA:
            return Object.assign({}, state, {
                allData:action.allData,
            });
        case actionType.SET_SOURCE:
            return Object.assign({}, state, {
                source:action.source,
                currentData:{
                    mushrooms:state.allData[action.source].mushrooms,
                    cereals:state.allData[action.source].cereals,
                    fruits:state.allData[action.source].fruits,
                    vegetables:state.allData[action.source].vegetables
                }
            });
        default:
            return state;
    }
}