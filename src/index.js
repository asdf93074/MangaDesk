import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

const wrapper = document.getElementById("app");

wrapper ? ReactDOM.render(
            <BrowserRouter>
                <App />
            </BrowserRouter>,
            wrapper) : false;