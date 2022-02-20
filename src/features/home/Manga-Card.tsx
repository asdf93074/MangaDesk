import React from 'react';

function MangaCard(props: { coverUrl: string; title: string; description: string; }) {
	return (
		<div className="manga-card">
			<div className="cover-image">
				<img src={props.coverUrl} />
			</div>
			<div className="details">
				<div className="title">
					<h2>{props.title}</h2>
				</div>
				<div className="desc">
					<span>{props.description}</span>
				</div>
			</div>
		</div>
	);
}

export default MangaCard;
