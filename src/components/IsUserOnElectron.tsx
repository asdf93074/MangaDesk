import React, { Component } from 'react';

interface State {}

class IsUserOnElectron extends Component {
    state: State;

    constructor(props: State) {
        super(props);
    }

    render() {
        if (navigator.userAgent.indexOf(' Electron/') > -1) {
            return this.props.children;
        }
        return null;
    }
}

export default IsUserOnElectron;