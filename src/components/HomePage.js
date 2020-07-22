import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import env from '../constants/environment';
import './HomePage.sass';
import MangaCard from './MangaCard';
import IsUserOnElectron from './isUserOnElectron';
import { MdSearch, MdClose } from 'react-icons/md';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            filteredItems: [],
            search: '',
            searchPage: 1,
            searchBadge: null,
            fetchedManga: false,
            pageNumber: 1
        };
    }

    componentDidMount() {
        axios.get(env.API + `/mangafox/manga/${this.state.pageNumber}`).then(res => {
            this.setState({
                items: [...this.state.items, ...res.data],
                filteredItems: [...this.state.items, ...res.data],
                fetchedManga: true
            });
        }).catch(err => {
            console.log(err);
        });
    }

    onFilter(event) {
        this.setState({
            search: event.target.value
        })

        this.filterManga(event.target.value);
    }

    filterManga(name) {
        console.log(name);
        this.setState({
            filteredItems: this.state.items.filter((manga) => {
                return manga[1].toLowerCase().includes(name.toLowerCase());
            })
        })
    }

    searchManga(name) {
        const searchTerm = this.state.search;

        axios.get(env.API + `/mangafox/manga/search/${searchTerm}/${this.state.searchPage}`).then(res => {
            this.setState({
                filteredItems: [...res.data],
                searchBadge: searchTerm
            });
        }).catch(err => {
            console.log(err);
        })
    }

    stopSearch(event) {
        this.setState({
            searchBadge: null,
            search: '',
            filteredItems: [...this.state.items]
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
                    {this.state.filteredItems.map(item => <MangaCard key={item[1]} title={item[1]} description={item[2]} cover={item[0]} />)}
                </div>
            </div>
        )
    }
}

export default HomePage;