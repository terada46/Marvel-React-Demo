import React from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';
import { CharacterSmallLoader } from './ImageLoader';

const placeholder = (
    <CharacterSmallLoader />
);

//Render the list of the characters in gallery

const CharactersList = ({id, characters, handleCharacterClick}) => {
    const handleClick = (id) => {
        handleCharacterClick(id)
    }
    const CharactersArray = () => {
        let list = [];
        characters.map(CHARACTER => {
            if (CHARACTER.thumbnail && "path" in CHARACTER.thumbnail) {
                let { path, extension } = CHARACTER.thumbnail;
                list.push(
                    <div 
                        className={"character" + (id === CHARACTER.id ? ' active' : '')} 
                        key={CHARACTER.id}
                    >
                        <ProgressiveImage
                            src={`${path}/landscape_small.${extension}`} 
                            rootMargin="0% 0% 0%"
                            threshold={[1]}
                            placeholder="">
                            {(src, loading) => {
                                return loading ? placeholder : 
                                <img 
                                    onClick={() => handleClick(CHARACTER.id)} 
                                    src={src}
                                    alt={CHARACTER.name}
                                />
                            }}
                        </ProgressiveImage>
                    </div>
                )
            }
        });
        return list;
    }

    return (
        <div id="characters_list">
            <div id="center-characters-list">
                {CharactersArray()}
            </div>
        </div>
    )
}

export default CharactersList;