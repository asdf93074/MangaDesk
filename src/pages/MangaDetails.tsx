import React, { Component, SyntheticEvent } from 'react';
import axios from 'axios';
import './MangaDetails.sass';
import Manga from '../models/Manga.model';
import { connect } from 'react-redux';
import env from '../constants/environment';
import Chapter from '../models/Chapter.model';
import { History } from 'history';
import { setCurrentChapter, setCurrentManga } from '../app/actions/index';
import { match } from 'react-router';

const mapStateToProps = (store: any) => {
  return {
    manga: store.currentManga
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    setCurrentChapter: (chapter: Chapter): any => dispatch(setCurrentChapter(chapter)),
    addManga: (manga: Manga): any => dispatch(setCurrentManga(manga))
  };
}

interface State {
  manga: Manga;
  setCurrentChapter?(chapter: Chapter): any;
  history?: History<{}>;
  match?: any;
  addManga?(manga: Manga): any
}

class MangaDetails extends Component<State, State> {
  constructor(props: State) {
    super(props);

    this.state = {
      manga: this.props.manga
    }
  }

  componentDidMount() {
    this.init(this.convertMangaNameToMangaFoxUrl(this.props.match.params.name));
  }

  init(url: string) {
    axios.post<Manga>(env.API + `/mangafox/manga/getOne`, { url }).then(res => {
      this.setState({
        manga: res.data
      });

      this.props.addManga(res.data);
      this.props.history.push('/mangafox/manga/' + res.data.name.replace(" ", "_"));
    }).catch(err => {
      console.log(err);
    });
  }

  convertMangaNameToMangaFoxUrl(name: string): string {
    return '/manga/' + name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/[^a-z0-9]+/g, '_') + '/';
  }

  readChapter(chapter: Chapter, event: SyntheticEvent) {
    this.props.setCurrentChapter(chapter);

    this.props.history.push(`/mangafox/read/${this.props.manga.name}/${chapter.title}/1`);
  }

  render() {
    return (
      this.state.manga ?
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
              return <div onClick={this.readChapter.bind(this, ch)} className="chapter-list-item" key={ch.title}><p>{ch.title}</p> <p>{ch.date}</p></div>
            })}
          </div>
        </div>
        <div className="manga-chapters">

        </div>
      </div>
      : null
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MangaDetails);