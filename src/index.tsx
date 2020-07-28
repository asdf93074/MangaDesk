import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './components/App';

const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(
            <HashRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </HashRouter>,
            wrapper) : false;