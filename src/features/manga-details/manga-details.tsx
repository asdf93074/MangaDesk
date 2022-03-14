import FeatureHeader from 'components/feature-header/feature-header';
import { Chapter } from 'models/chapter';
import { Manga } from 'models/manga';
import React from 'react';

function MangaDetails(props: { manga: Manga, chapters: Chapter}) {
	return (
		<div className="manga-details" data-testid="manga-details">
			<FeatureHeader title={props.manga?.name || 'Loading...'}></FeatureHeader>
			<div className="manga">
				<div className="cover">
					<img src={props.manga?.coverUrl} alt="" />
				</div>
				<div className="description">
					{props.manga?.description}
				</div>
				<div className="chapters">

				</div>
			</div>
		</div>
	);
}

export default MangaDetails;
