import React from 'react';
import {
  Route,
} from 'react-router-dom';

import '../index';

import './App.sass';
import isUserOnElectron from '../components/misc/IsUserOnElectron';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import HomeContainer from '../features/home/home.container';
import MangaDetailsContainer from 'features/manga-details/manga-details.container';

function App() {
	return (
		<>
			{isUserOnElectron() ? <div className="app-frame">
				<p>MangaDesk</p>
			</div> : null}
			<div className={`app-container ${isUserOnElectron() ? 'subtract-frame-height': ''}`}>
				<TopNavigationBar />
				<div className="app-body">
					<Route path="/" component={HomeContainer} exact />
					<Route path="/manga/:id" component={MangaDetailsContainer} exact />
				</div>
			</div>
		</>
	);
}

export default App;
