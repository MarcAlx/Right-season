import React from 'react';
import {render} from 'react-dom';
import App from './components/App/App';
import "./index.less"
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import './i18n/i18n';

const store = configureStore();
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);