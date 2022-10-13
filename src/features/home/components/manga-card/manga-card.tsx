import { Chip } from '@material-ui/core';
import { Manga } from 'models/manga';
import React from 'react';
import { Link } from 'react-router-dom';

import './Manga-card.sass';

function MangaCard(props: { manga: Manga }) {
  return (
    <div className="manga-card" data-testid="manga-card">
      <div className="cover-image">
        <Link to={`/manga/${props.manga.id}`}>
          <img src={props.manga.coverUrl} />
        </Link>
      </div>
      <div className="details">
        <div className="title">
          <h2>{props.manga.name}</h2>
        </div>
        <div className="desc">
          <span>{props.manga.description}</span>
        </div>
        <div className="tags">
          {
            props.manga.tags.map((tag) => <Chip key={tag} label={tag}></Chip>)
          }
        </div>
      </div>
    </div>
  );
}

export default MangaCard;
