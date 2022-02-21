import React from 'react';

function FeatureHeader(props: { title: string }) {
	return (
		<div className="feature-header" data-testid='feature-header'>
			<h3>{props.title}</h3>
		</div>
	);
}

export default FeatureHeader;
