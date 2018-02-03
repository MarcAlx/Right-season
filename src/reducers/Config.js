import innerConfig from "../innerConfig";
export const initialState = {
    infoDrawerOpen:false,
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