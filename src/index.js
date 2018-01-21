import React from 'react';
import {render} from 'react-dom';
import App from './components/App/App';
import "./index.less"
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {configureI18n} from  './i18n/i18n';
import {setConfig,initData} from './actions/AppActions';

const store = configureStore();

//1. fetch i18n
fetch("assets/i18n/translations.json").then((response)=>{
    response.json().then(function(json) {
            configureI18n(json);
            //2. fetch config
            fetch("assets/config.json").then((response)=>{
                response.json().then(function(json) {
                    //set config
                    store.dispatch(setConfig(json));
                    store.dispatch(initData(json));
                    render(
                        <Provider store={store}>
                            <App />
                        </Provider>,
                        document.getElementById('app')
                    );
                });
            },()=>{
                //TODO log error
            });
    });
},()=>{
    //TODO log error
});