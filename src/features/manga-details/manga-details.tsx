import FeatureHeader from 'components/feature-header/feature-header';
import { Manga } from 'models/manga';
import React from 'react';

function MangaDetails(props: { manga: Manga }) {
	return (
		<div className="manga-details" data-testid="manga-details">
			<FeatureHeader title={'Details'}></FeatureHeader>
		</div>
	);
}

export default MangaDetails;
