import React, { Component } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import HomePage from './HomePage';
import './App.sass';
import TopNavigationBar from './TopNavigationBar';
import IsUserOnElectron from './isUserOnElectron';

export default class App extends Component {
    constructor(props) {
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
                            <Route path="/" component={HomePage} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}
