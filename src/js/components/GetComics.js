import React, { Fragment, Component } from 'react';
import ComicRenderer from './ComicRenderer';
import { comicsAPI, apikey, ts, hash } from '../constants';
import { LoadSpinnerSmall } from '../functions';
import axios from 'axios';

//Get comics' data related to
//the selected character from MARVEL

export default class GetComics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            comics:[]
        }
    }

    getComics = id => {
        axios.get( comicsAPI, {
                params: {
                    ts: ts,
                    apikey: apikey,
                    characters: id,
                    limit: 12,
                    hash: hash
                }
            })
            .then( response => {
                let comics = response.data.data.results;
                this.setState(() => ({
                    comics:[].concat(comics)
                }))
                if (!this.state.hasError) {
                    this.setState(() => ({hasError: false}))
                }
            })
            .catch( err => {
                this.setState(() => ({hasError: true}))
            }
        );
    }

    componentDidMount() {
        this.getComics(this.props.id)
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.getComics(this.props.id)
        }
    }

    render() {
        if (this.state.hasError) {
            return <h2 className="error">Comics Connection Failed. Please refresh page later.</h2>
        }
        return (
            <Fragment>
                { this.state.comics.length > 0 ?
                    <ComicRenderer comics={this.state.comics} id={this.props.id} />
                    : <LoadSpinnerSmall />
                }
            </Fragment>
        )
    }
}
