import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.sass';
import isUserOnElectron from 'components/misc/IsUserOnElectron';
import TopNavigationBar from 'components/layout/TopNavigationBar';
import HomeContainer from 'features/home/home.container';
import MangaDetailsContainer from 'features/manga-details/manga-details.container';

function App() {
  return (
    <>
      {isUserOnElectron() ? <div className="app-frame">
        <p>MangaDesk</p>
      </div> : null}
      <div className={`app-container ${isUserOnElectron() ? 'subtract-frame-height' : ''}`}>
        <TopNavigationBar />
        <div className="app-body">
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/manga/:id" element={<MangaDetailsContainer />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
