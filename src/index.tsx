import { store } from './app/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './app/App';
import { createTheme, ThemeProvider } from '@mui/material';

const wrapper = document.getElementById('app');

const theme = createTheme({
  palette: {
		mode: 'dark',
	},
});

wrapper ? ReactDOM.render(
    <HashRouter>
			<Provider store={store}>
				<ThemeProvider theme={theme} >
					<App />
				</ThemeProvider>
			</Provider>
    </HashRouter>,
    wrapper) : false;
