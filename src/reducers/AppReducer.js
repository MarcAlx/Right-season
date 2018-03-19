import * as actionType from '../actions/ActionType.js';
import * as config from "./Config.js";
//import data from "../assets/data.json";

export default function AppReducer(state=config.initialState, action) {
    switch (action.type) {
        case actionType.SEARCH:
            return Object.assign({}, state, {
                input:action.input,
                currentData:{
                    mushrooms:action.mushrooms,
                    cereals:action.cereals,
                    fruits:action.fruits,
                    vegetables:action.vegetables
                }
            });
        case actionType.FILTER:
            return Object.assign({}, state, {
                filter:action.filter
            });
        case actionType.SET_INFODRAWER_STATE:
            return Object.assign({}, state, {
                infoDrawerOpen:action.infoDrawerOpen
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