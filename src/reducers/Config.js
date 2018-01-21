import innerConfig from "../innerConfig";
export const initialState = {
    input:"",
    //all data loaded
    allData:{},
    //current data displayed
    currentData:{
        vegetables:[],
        fruits:[],
        mushrooms:[],
        cereals:[]
    },
    config:innerConfig,
    source:""
};