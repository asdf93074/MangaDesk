import React, { Component } from 'react';
import axios from 'axios';
import Manga from '../models/Manga.model';
import { connect, RootStateOrAny } from 'react-redux';
import env from '../constants/environment';
import Chapter from '../models/Chapter.model';
import { setCurrentChapter } from '../app/actions/index';
import './Reader.sass';
import { Reading } from '../models/Reading.model';

const mapStateToProps = (store: any) => {
  return { currentManga: store.currentManga, currentChapter: store.currentChapter };
};

interface State {
  currentManga?: Manga;
  currentChapter?: Chapter;
  reading: Reading;
  currentPage: number;
}

class Reader extends Component<State, State> {
  constructor(props: State) {
    super(props);

    this.state = {
      reading: null,
      currentPage: 0
    }
  }

  componentDidMount() {
    this.getChapterReading(this.props.currentChapter);
  }

  getChapterReading(chapter: Chapter) {
    axios.post<Reading>(env.API + `/mangafox/manga/readChapter`, { chapter }).then(res => {
      this.setState({
        reading: res.data,
        currentPage: 1
      })
    }).catch(err => {
      console.log(err);
    });
  }

  previousPage() {
    this.setState((prevState) => {
      return {
        currentPage: (prevState.currentPage > 1) ? prevState.currentPage - 1 : prevState.currentPage
      };
    });
  }

  nextPage() {
    if (this.state.currentPage < this.state.reading.pagesUrl.length) {
      this.setState((prevState) => {
        return {
          currentPage: prevState.currentPage + 1
        };
      });
    }
  }

  render() {
    return (
      <div className="app-body-content">
        <p onClick={this.previousPage.bind(this)} className="prev">Previous</p>
        <p onClick={this.nextPage.bind(this)} className="next">Next</p>
        <div className="reader">
          <div className="page">
            <img src={this.state?.reading?.pagesUrl[this.state.currentPage]} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Reader);