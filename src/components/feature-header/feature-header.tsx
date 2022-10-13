import { KEY_CODES } from 'constants/keyCodes';
import useKeyPress from 'hooks/useKeyPress';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './feature-header.sass';

function FeatureHeader(props: { title: string, enableBackBtn: boolean }) {
  const navigate = useNavigate();
  const escKeyPress = useKeyPress(KEY_CODES.ESC);

  const goBack = () => {
    if (!props.enableBackBtn) return;
    navigate(-1);
  };

  escKeyPress(goBack);

  return (
    <div className="feature-header" data-testid='feature-header'>
      <h1>{props.enableBackBtn ?
        <span onClick={goBack}>&lt;</span> :
        null} {props.title}</h1>
    </div>
  );
}

export default FeatureHeader;
