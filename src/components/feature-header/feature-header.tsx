import React from 'react';
import './feature-header.sass';

function FeatureHeader(props: { title: string }) {
  return (
    <div className="feature-header" data-testid='feature-header'>
      <h1>{props.title}</h1>
    </div>
  );
}

export default FeatureHeader;
