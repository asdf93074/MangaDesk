import { Chip } from '@mui/material';
import { Manga } from 'models/manga';
import React from 'react';
import { Link } from 'react-router-dom';

function MangaCard(props: Manga) {
	return (
		<div className="manga-card">
			<div className="cover-image">
				<Link to={`/manga/${props.id}`}>
					<img src={props.coverUrl} />
				</Link>
			</div>
			<div className="details">
				<div className="title">
					<h2>{props.name}</h2>
				</div>
				<div className="desc">
					<span>{props.description}</span>
				</div>
				<div className="tags">
					{
						props.tags.map((tag) => <Chip key={tag} label={tag}></Chip>)
					}
				</div>
			</div>
		</div>
	);
}

export default MangaCard;
