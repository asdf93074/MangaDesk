import React, { Component } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import Home from '../pages/Home';
import './App.sass';
import TopNavigationBar from './TopNavigationBar';
import IsUserOnElectron from './isUserOnElectron';
import MangaDetails from '../pages/MangaDetails';
import '../app/index';

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
                        <p>MangaDesktop</p>
                    </div>
                </IsUserOnElectron>
                <div className="app-container">
                    <TopNavigationBar />
                    <div className="app-body">
                        <Switch>
                            <Route path="/mangafox/:name" component={MangaDetails} exact />
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
