import React from 'react';
import { Link } from 'react-router-dom';

function MangaCard(props: { id: string, coverUrl: string; title: string; description: string; }) {
	return (
		<div className="manga-card">
			<div className="cover-image">
				<Link to={`/manga/${props.id}`}>
					<img src={props.coverUrl} />
				</Link>
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
