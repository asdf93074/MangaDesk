import { store } from './app/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import App from './app/App';
import { createTheme, ThemeProvider } from '@mui/material';
import ChapterReaderContainer from 'features/chapter-reader/chapter-reader.container';

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
					<Switch>
						<Route path="/chapter/:id/read/:pageNumber" component={ChapterReaderContainer} exact />
						<Route path="/" component={App} />
					</Switch>
				</ThemeProvider>
			</Provider>
    </HashRouter>,
    wrapper) : false;
