import * as actionType from './ActionType';
import i18n from 'i18next';

/**
 * @param {*} input 
 */
export function search(input) {
    return (dispatch, getState) => {
        let source = getState().source;
        let filter = getState().filter;
        let data = getState().allData[source];

        let res={
            "mushrooms":[],
            "cereals":[],
            "fruits":[],
            "vegetables":[]
        };

        let done = [];

        for(let key in res){
            for(let i = 0;i<filter.length;i++){
                let tmp = filter[i];
                for(let i = 0;i<data[key].length;i++){
                    let item = data[key][i];
                    if(done.indexOf(item.name)===-1
                    && item.availability.indexOf(tmp)!=-1
                    && (input==="" || i18n.t("names."+item.name).toLowerCase().indexOf(input.toLowerCase())!==-1)){
                        res[key].push(item);
                        done.push(item.name);
                    }
                }
            }
        }
        
        return dispatch({
            type: actionType.SEARCH,
            input:input,
            mushrooms:res.mushrooms,
            cereals:res.cereals,
            fruits:res.fruits,
            vegetables:res.vegetables
        });
    }
}

/**
 * TODO
 * @param {*} input 
 */
export function filter(f) {
    return (dispatch, getState) => {
        dispatch({
            type: actionType.FILTER,
            filter:f
        });
        //update res via search
        return dispatch(search(getState().input));
    }
}

/**
 * Set infor drawer state
 * @param {*} isOpen 
 */
export function setInfoDrawerState(isOpen) {
    return {
        type: actionType.SET_INFODRAWER_STATE,
        infoDrawerOpen:isOpen,
    };
}

/**
 * Set source of data to pick
 * @param {*} data 
 */
export function setSource(sourceName){
    return {
        type: actionType.SET_SOURCE,
        source:sourceName
    };
}

/**
 * Init app config from values readed from config file
 * @param {*} config 
 */
export function setConfig(config) {
    return {
        type: actionType.SET_CONFIG,
        config:config
    };
}

/**
 * Set data from files listed in config
 * @param {*} data 
 */
export function setData(data){
    return {
        type: actionType.SET_DATA,
        allData:data
    };
}

/**
 * Fetch data async from all files listed in config file
 * @param {*} config 
 */
export function fetchData(config){
    return dispatch => {
        Promise.all(Object.keys(config.data).map(key =>
            fetch(config.data[key]).then(
                resp => resp.json()
            )
        )).then(tmp => {
            let res = {};
            for(let i = 0; i<tmp.length;i++){
                res[tmp[i].source]=tmp[i]
            }
            dispatch(setData(res));
            //set source once data are retrieved
            return dispatch(setSource(config.defaultSource));
        })
    };
}

/**
 * Init data by fetching async
 * @param {*} config 
 */
export function initData(config) {
    return (dispatch) => {
        return dispatch(fetchData(config));
    }
}