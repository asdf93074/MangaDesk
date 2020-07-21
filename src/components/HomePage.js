import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import env from '../constants/environment';
import './HomePage.sass';
import MangaCard from './MangaCard';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            fetchedManga: false
        };
    }

    componentDidMount() {
        axios.get(env.API + "/mangafox/manga").then(res => {
            console.log(res);
            this.setState({
                items: [...this.state.items, ...res.data],
                fetchedManga: true
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="app-body-content">
                <div className="page-title">All Manga</div>
                <div>{this.state.fetchedManga}</div>
                <div className="manga-holder">
                    {this.state.fetchedManga ? null : <div className="spinner">Loading...</div>}
                    {this.state.items.map(item => <MangaCard key={item[1]} title={item[1]} description={item[2]} cover={item[0]} />)}
                </div>
            </div>
        )
    }
}

export default HomePage;