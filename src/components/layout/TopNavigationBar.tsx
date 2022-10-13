import React, { Component } from 'react';

import './TopNavigationBar.sass';

class TopNavigationBar extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="app-navigation">
        <div className="navigation-drawer">

        </div>
        <div className="navigation-menu">
          <ul>
            <li>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TopNavigationBar;
