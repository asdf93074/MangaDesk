import React, {Component} from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Home from '../pages/Home/Home';
import TopNavigationBar from './layout/TopNavigationBar';
import IsUserOnElectron from './isUserOnElectron';
import MangaDetails from '../pages/MangaDetails';
import Reader from '../pages/Reader';

import '../app/index';

import './App.sass';

interface State {

}

export default class App extends Component {
  state: State;

  constructor(props: State) {
    super(props);
  }

  render() {
    return (
      <>
        <IsUserOnElectron>
          <div className="app-frame">
            <p>MangaDesk</p>
          </div>
        </IsUserOnElectron>
        <div className="app-container">
          <TopNavigationBar />
          <div className="app-body">
            <Switch>
              <Route path="/mangafox/manga/:name" component={MangaDetails} exact />
            </Switch>
            <Switch>
              <Route path="/mangafox/read/:mangaName/:chapter/:page" component={Reader} exact />
            </Switch>
            <Switch>
              <Route path="/" component={Home} exact />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}
