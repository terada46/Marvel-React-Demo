import React, { Fragment, Component } from 'react';
import { isImagesLoaded, LoadSpinner } from '../functions';
import { charactersAPI, apikey, ts, hash } from '../constants';
import axios from 'axios';

//Get data about the selected character from MARVEL

class CharacterProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            loading: true,
            name: '',
            description: '',
            image: '',
            wiki_url: ''
        }
    }
    
    handleImageChange = () => {
        this.setState(() => ({
            loading: !isImagesLoaded(this.profileElement)
        }));
    }

    renderSpinner = () => {
        if (!this.state.loading) {
            return null;
        }
        return <LoadSpinner />
    }

    getCharacter = id => {
        axios.get( charactersAPI, {
            params: {
                ts: ts,
                apikey: apikey,
                id: id, 
                hash: hash
            }
        })
        .then((response) => {
            if (response.status === 200) {
                const { name, description, thumbnail, urls } = response.data.data.results[0];
                const image = thumbnail.path + '/portrait_fantastic.' + thumbnail.extension;
                const wiki_url = urls[1].url;
                this.setState(() =>({
                    name: name,
                    description: description,
                    image: image,
                    wiki_url: wiki_url
                }));
                if (!this.state.hasError) {
                    this.setState(() => ({hasError: false}))
                }
            }
        })
        .catch(() => {
            this.setState(() => ({hasError: true}))
        })
    }

    componentDidMount() {
        this.getCharacter(this.props.id)
    } 

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.getCharacter(this.props.id)
        }
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <h2 className="error">
                    Character Connection Failed. Please refresh page later.
                </h2>
            )
        }
        return (
            <Fragment>
                <h2>CHARACTER PFOFILE</h2>
                <div id="character_prof" ref={element => {this.profileElement = element}}>
                    <div id="center-profile-content">
                        {this.renderSpinner()}
                        <div className="profile-img-container">
                            <img src={this.state.image} 
                                onLoad={this.handleImageChange}
                                onError={this.handleImageChange} 
                            />
                        </div>
                        <div id="profile">
                            <h1>{this.state.name}</h1>
                            <p>{this.state.description}</p>
                            <p>Read More about {this.state.name} on&nbsp;
                                <a target="_blank" 
                                    href={this.state.wiki_url}>
                                    Marvel Universe Wiki
                                </a>.
                            </p>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default CharacterProfile;