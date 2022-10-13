import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Settings from '@material-ui/icons/Settings';

import { KEY_CODES } from 'constants/keyCodes';
import useKeyPress from 'hooks/useKeyPress';
import { useLocation, useNavigate } from 'react-router';
import { useSettings } from 'hooks/useSettings';

import './TopNavigationBar.sass';

function TopNavigationBar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const backPath = useSettings('BACK_PATH') as string;
  const escKeyPress = useKeyPress(KEY_CODES.ESC);

  const goBack = () => {
    if (!backPath) return;
    navigate(backPath);
  };

  escKeyPress(goBack);

  return (
    <div className="app-navigation">
      <div className="navigation-drawer">
        <span
          className={`drawer-icon ${location.pathname === backPath ? 'hide' : null}`}
          onClick={goBack}>
          <ArrowBack />
        </span>
        <span
          className="drawer-icon">
          <Settings />
        </span>
      </div>
    </div>
  );
}

export default TopNavigationBar;
