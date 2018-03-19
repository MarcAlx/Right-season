import innerConfig from "../innerConfig";
export const initialState = {
    infoDrawerOpen:false,
    filter:[new Date().getMonth()+1],
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