import React, { Component } from 'react';

import './MangaCard.sass'

class MangaCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="manga-card">
                <div className="manga-card-cover">
                    <img src={this.props.cover} />
                </div>
                <div className="manga-card-title">
                    <p>{this.props.title}</p>
                </div>
                {/* <div className="manga-card-body">
                    {this.props.description}
                </div> */}
            </div>
        );
    }
}

export default MangaCard;