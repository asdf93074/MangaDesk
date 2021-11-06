import React, {Component, ChangeEvent, SyntheticEvent} from 'react';
import axios from 'axios';
import env from '../../constants/environment';
import './Home.sass';
import MangaCard from '../../components/MangaCard';
import {MdSearch, MdClose} from 'react-icons/md';
import MangaInfo from '../../models/MangaInfo.model';
import Manga from '../../models/Manga.model';
import {History} from 'history';
import {connect, RootStateOrAny} from 'react-redux';
import {setCurrentManga} from '../../app/actions/index';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state: RootStateOrAny) => {
  return {currentManga: state.currentManga};
};

function mapDispatchToProps(dispatch: any) {
  return {
    addManga: (manga: Manga): any => dispatch(setCurrentManga(manga)),
  };
}

type State = {
  currentManga?: Manga,
  items?: MangaInfo[],
  filteredItems?: MangaInfo[],
  search?: string,
  searchPage?: number,
  searchBadge?: string,
  fetchedManga?: boolean,
  pageNumber?: number,
  history?: History,
  addManga?(manga: Manga): any
}

class HomePage extends Component<State, State> {
  constructor(props: State) {
    super(props);

    this.state = {
      currentManga: null,
      items: [],
      filteredItems: [],
      search: '',
      searchPage: 1,
      searchBadge: null,
      fetchedManga: false,
      pageNumber: 1,
    };
  }

  componentDidMount() {
    axios.get<MangaInfo[]>(env.API + `/mangafox/all/${this.state.pageNumber}`).then((res) => {
      this.setState({
        items: [...this.state.items, ...res.data],
        filteredItems: [...this.state.items, ...res.data],
        fetchedManga: true,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  onFilter(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      search: event.target.value,
    });

    this.filterManga(event.target.value);
  }

  filterManga(name: string) {
    this.setState({
      filteredItems: this.state.items.filter((manga) => {
        return manga.title.toLowerCase().includes(name.toLowerCase());
      }),
    });
  }

  searchManga(name: string) {
    const searchTerm = this.state.search;

    axios.get<MangaInfo[]>(env.API + `/mangafox/manga/search/${searchTerm}/${this.state.searchPage}`).then((res) => {
      this.setState({
        filteredItems: [...res.data],
        searchBadge: searchTerm,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  stopSearch(event: SyntheticEvent<HTMLElement>) {
    this.setState({
      searchBadge: null,
      search: '',
      filteredItems: [...this.state.items],
    });
  }

  getOneManga(url: string, event: SyntheticEvent<HTMLElement>) {
    axios.post<Manga>(env.API + `/mangafox/manga/getOne`, {url}).then((res) => {
      this.setState({
        currentManga: res.data,
      });

      this.props.addManga(res.data);
      this.props.history.push('/mangafox/manga/' + res.data.name.replace(' ', '_'));
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="app-body-content">
        <div className="page-title">
          <p>Manga</p>
          {this.state.searchBadge ?
            <div className="search-badge">
              {this.state.searchBadge}
              <span className="search-badge-close" onClick={this.stopSearch.bind(this)}><MdClose size="1.4em" /></span>
            </div> : null}
          <div className="search-manga">
            <input type="text" className="manga-filter" id="manga-filter" name="manga-filter" value={this.state.search} onChange={this.onFilter.bind(this)} />
            <span className="search-icon" onClick={this.searchManga.bind(this)}><MdSearch size="1.5em" /></span>
          </div>
        </div>
        <div>{this.state.fetchedManga}</div>
        <div className="manga-holder">
          {this.state.fetchedManga ? null : <div className="spinner">Loading...</div>}
          {this.state.filteredItems.map((item) => <MangaCard onClick={this.getOneManga.bind(this, item.url)} key={item.title} title={item.title} cover={item.coverImageUrl} />)}
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(HomePage);
