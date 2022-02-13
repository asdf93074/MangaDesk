import { store } from './app/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './app/App';

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(
    <HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
    </HashRouter>,
    wrapper) : false;
