import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './TopNavigationBar.sass';

class TopNavigationBar extends Component {
    constructor(props) {
        super(props);

        this.navigationMenu = [
            {title: "Library"},
            {title: "Recently Read"},
            {title: "Downloads"},
            {title: "Settings"}
        ]
    }

    render() {
        return (
            <div className="app-navigation">
                <div className="navigation-drawer">
                    
                </div>
                <div className="navigation-menu">
                    <ul>
                        {this.navigationMenu.map(item => {
                            <li key={item.title}>{item.title}</li>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(TopNavigationBar);