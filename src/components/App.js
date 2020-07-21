import React, { Component } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import HomePage from './HomePage';
import './App.sass';
import TopNavigationBar from './TopNavigationBar';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-container">
                <TopNavigationBar />
                <div className="app-body">
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route path="/a">
                            asdf
                        </Route>
                        <Route path="/">
                            asdfsds
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}
