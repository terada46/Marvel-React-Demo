import React, { Component } from 'react';
import { isImagesLoaded, LoadSpinner } from '../functions';

//Render the list of the characters in gallery

export default class CharactersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true
        }
    }

    handleClick = id => {
        this.props.handleCharacterClick(id)
    }

    handleImageChange = () => {
        this.setState(() => ({
            loading: !isImagesLoaded(this.galleryElement)
        }));
    }

    renderSpinner = () => {
        if (!this.state.loading) {
            return null;
        }
        return <LoadSpinner />
    }
    
    render() {
        let CHARACTERS = this.props.characters;
        let row = [];
        if (CHARACTERS.length !== 0) {
            CHARACTERS.map(CHARACTER => {
                row.push(
                    <div 
                        className={"character" + (this.props.id === CHARACTER.id ? ' active' : '')} 
                        key={CHARACTER.id}>
                        <img 
                            onClick={() => this.handleClick(CHARACTER.id)} 
                            src={CHARACTER.thumbnail.path + 
                                    '/landscape_small.' + 
                                    CHARACTER.thumbnail.extension}
                            onLoad={this.handleImageChange}
                            onError={this.handleImageChange}
                        />
                    </div>
                )
            })
        }
        return (
            <div id="characters_list" ref={element => {this.galleryElement = element}}>
                {this.renderSpinner()}
                <div id="center-characters-list">
                    {row}
                </div>
            </div>
        )
    }
}