import React from 'react';

function MangaCard(props: { coverUrl: string; }) {
	return (
		<div className="manga-card">
			<img src={props.coverUrl} />
		</div>
	);
}

export default MangaCard;
