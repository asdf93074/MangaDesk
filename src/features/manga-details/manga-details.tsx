import FeatureHeader from 'components/feature-header/feature-header';
import { Chapter } from 'models/chapter';
import { Manga } from 'models/manga';
import React from 'react';
import { Link } from 'react-router-dom';

import './manga-details.sass';

function MangaDetails(props: { manga: Manga, chapters: Chapter[]}) {
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
					{
						props.chapters?.map((ch: Chapter) =>
							<div key={ch.id} className="chapter-link">
								<Link to={`../chapter/${ch.id}/read/0`}>Chapter {ch.chapterNumber}</Link>
							</div>)
					}
				</div>
			</div>
		</div>
	);
}

export default MangaDetails;
