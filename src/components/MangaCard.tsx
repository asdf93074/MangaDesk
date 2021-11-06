import React, {Component, SyntheticEvent} from 'react';

import './MangaCard.sass';

interface State {
    title: string;
    cover: string;
    onClick(): SyntheticEvent<HTMLElement>,
}

class MangaCard extends Component {
  props: State;

  constructor(props: State) {
    super(props);
  }

  render() {
    return (
      <div className="manga-card" onClick={this.props.onClick}>
        <div className="manga-card-cover">
          <img src={this.props.cover} />
        </div>
        <div className="manga-card-title">
          <p>{this.props.title}</p>
        </div>
      </div>
    );
  }
}

export default MangaCard;
