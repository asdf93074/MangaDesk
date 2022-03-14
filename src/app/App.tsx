import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import '../index';

import './App.sass';
import isUserOnElectron from '../components/misc/IsUserOnElectron';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import HomeContainer from '../features/home/Home.container';
import MangaDetailsContainer from 'features/manga-details/manga-details.container';
import ChapterReaderContainer from 'features/chapter-reader/chapter-reader.container';

function App() {
	return (
		<>
			{isUserOnElectron() ? <div className="app-frame">
				<p>MangaDesk</p>
			</div> : null}
			<div className={`app-container ${isUserOnElectron() ? 'subtract-frame-height': ''}`}>
				<TopNavigationBar />
				<div className="app-body">
					<Switch>
						<Route path="/" component={HomeContainer} exact />
						<Route path="/manga/:id" component={MangaDetailsContainer} exact />
						<Route path="/chapter/:id/read" component={ChapterReaderContainer} exact />
					</Switch>
				</div>
			</div>
		</>
	);
}

export default App;
