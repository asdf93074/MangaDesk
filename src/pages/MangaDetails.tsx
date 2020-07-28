import React, { Component } from 'react';
import axios from 'axios';
import './MangaDetails.sass';
import Manga from '../models/Manga.model';
import { connect } from 'react-redux';
import env from '../constants/environment';
import Chapter from '../models/Chapter.model';
import { setCurrentChapter } from '../app/actions/index';

const mapStateToProps = (store: any) => {
    return {
        manga: store.currentManga
    }
}
function mapDispatchToProps(dispatch: any) {
    return {
      setCurrentChapter: (chapter: Chapter): any => dispatch(setCurrentChapter(chapter))
    };
}

interface State {
    manga: Manga;
    setCurrentChapter?(chapter: Chapter): any;
}

class MangaDetails extends Component<State, State> {
    constructor(props: State) {
        super(props);

        this.state = {
            manga: this.props.manga
        }
    }

    readChapter(chapter: Chapter) {
        this.props.setCurrentChapter(chapter);
    }

    render() {
        return (
            <div className="app-body-content">
                <div className="page-title">
                    <p>{this.state.manga.name}</p>
                </div>
                <div className="manga-detail">
                    <div className="manga-cover">
                        <img src={this.state.manga.imageUrl} />
                    </div>
                    <div className="manga-title-and-description">
                        <div className="manga-title">
                            <h3>{this.state.manga.name}</h3>
                        </div>
                        <div className="manga-description">
                            <p>{this.state.manga.description}</p>
                        </div>
                    </div>
                </div>
                <div className="manga-detail-2">
                    <div className="chapter-title">
                        <h3>Chapters</h3>
                    </div>
                    <div className="chapter-list">
                        {this.state.manga.chapters.map((ch, i) => {
                            return <div className="chapter-list-item" key={ch.title}><p>{ch.title}</p> <p>{ch.date}</p></div>
                        })}
                    </div>
                </div>
                <div className="manga-chapters">
                    
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MangaDetails);