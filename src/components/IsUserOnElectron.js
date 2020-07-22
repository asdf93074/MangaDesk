import React, { Component } from 'react';

class IsUserOnElectron extends Component {
    constructor(props) {
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