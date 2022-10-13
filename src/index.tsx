import { store } from './app/store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import App from './app/App';
import { createTheme, ThemeProvider } from '@material-ui/core';
import ChapterReaderContainer from 'features/chapter-reader/chapter-reader.container';

const wrapper = document.getElementById('app');

const theme = createTheme({
  palette: {
  },
});

wrapper ? ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme} >
      <HashRouter>
        <Routes>
          <Route path="/chapter/:id/read/:pageNumber*" element={<ChapterReaderContainer />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </Provider>,
  wrapper) : false;
