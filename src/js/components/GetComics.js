import React, { Fragment, Component } from 'react';
import ComicRenderer from './ComicRenderer';
import { comicsAPI, apikey, ts, hash } from '../constants';
import { ComicListLoader } from './ImageLoader';
import axios from 'axios';

//Get comics' data related to
//the selected character from MARVEL

export default class GetComics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            comicsList: []
        }
    }

    componentDidMount() {
        this.getComics(this.props.id)
    }

    componentDidUpdate(preProps) {
        if (this.props.id !== preProps.id) {
            this.getComics(this.props.id)
        }
    }

    getComics = async (id) => {
        if (!this.state.loading) {
            this.setState({loading: true})
        }
        let comics;
        try {
            const response = await axios.get(comicsAPI, {
                params: {
                    ts: ts,
                    apikey: apikey,
                    characters: id,
                    limit: 16,
                    hash: hash,
                    orderBy: '-focDate'
                }
            });
            comics = [...response.data.data.results];
            if (!this.state.hasError) {
                this.setState({hasError: false})
            }
        } catch (error) {
            this.setState({hasError: true})
        }
        this.setState({
            comicsList: [...comics],
            loading: false
        });
    }

    render() {
        if (this.state.hasError) {
            return <h2 className="error">Fetching Comics Failed. Please refresh page.</h2>
        }
        return (
            <Fragment>
                <h2>RELATED COMICS</h2>
                <div id="comics_list">
                    { this.state.loading ? <ComicListLoader /> : 
                        <ComicRenderer comics={this.state.comicsList} />
                    }
                </div>
            </Fragment>
        )
    }
}
