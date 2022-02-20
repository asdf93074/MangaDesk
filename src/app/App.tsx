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
					</Switch>
				</div>
			</div>
		</>
	);
}

export default App;