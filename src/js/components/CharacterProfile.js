import React, { Fragment, Component } from 'react';
import { charactersAPI, apikey, ts, hash } from '../constants';
import ProgressiveImage from 'react-progressive-graceful-image';
import { ProfileImageLoader, ProfileTextLoader } from './ImageLoader';
import axios from 'axios';
   
const placeholder = (
    <ProfileImageLoader />
);

//Get profile the selected character

class CharacterProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            loading: true,
            name: '',
            imageUrl: '',
            description: '',
            wikiUrl: ''
        }
    }

    getCharacter = async (id) => {
        this.setState({loading: true});
        try {
            const response = await axios.get( charactersAPI, {
                params: {
                    ts: ts,
                    apikey: apikey,
                    id: id, 
                    hash: hash
                }
            });
            if (response.status === 200) {
                let { name, description, thumbnail, urls } = response.data.data.results[0];
                let imageUrl = `${thumbnail.path}/portrait_fantastic.${thumbnail.extension}`;
                let wikiUrl = urls[1].url;
                this.setState({
                    description: description,
                    name: name,
                    imageUrl: imageUrl,
                    wikiUrl: wikiUrl,
                    loading: false
                });
            }
            if (this.state.hasError) {
                this.setState({hasError: false})
            }
        } catch(error) {
            this.setState({hasError: true})
        }
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
                    <div id="center-profile-content">
                        <div id="profile-content-container">
                            <div id="placeholder-container">
                            {this.state.loading ? <ProfileImageLoader /> :
                                <ProgressiveImage 
                                    src={this.state.imageUrl} 
                                    rootMargin="0% 0% 0%"
                                    threshold={[1]}
                                    placeholder="">
                                    {(src, loading) => {
                                        return loading ? placeholder : 
                                        <img id="profile-img" src={src} alt="profile" />;
                                    }}
                                </ProgressiveImage>
                            }
                            </div>
                            {this.state.loading ? <ProfileTextLoader /> :
                                <div id="profile">
                                    <h1>{this.state.name}</h1>
                                    <p>{this.state.description}</p>
                                    <p>Read More about {this.state.name} on&nbsp;
                                        <a target="_blank" 
                                            href={this.state.wikiUrl}>
                                            Marvel Universe Wiki
                                        </a>
                                    </p>
                                </div>
                            } 
                        </div>
                    </div>
            </Fragment>
        )
    }
}

export default CharacterProfile;