import React from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';
import { ComicImageLoader } from './ImageLoader';

const placeholder = (
    <ComicImageLoader />
);

//Render the comics with placeholder

const ComicRenderer = ({comics}) => {
    if (comics.length === 0) {
        return <h2 className="error">Can't get comics list.</h2>
    }
    let list = [];
    let path, extension;
    comics.map(comic => {
        if (comic.images[0] && "path" in comic.images[0]) {
            path = comic.images[0].path;
            extension = comic.images[0].extension;
        } else if (comic.thumbnail && "path" in comic.thumbnail) {
            path = comic.thumbnail.path;
            extension = comic.thumbnail.extension;
        }
        list.push(
            <div className="comic" key={comic.id}> 
                <ProgressiveImage
                    src={`${path}/portrait_fantastic.${extension}`} 
                    rootMargin="0% 0% 0%"
                    threshold={[0.3]}
                    placeholder="">
                    {(src, loading) => {
                        return loading ? placeholder : 
                            <img 
                                src={src} 
                                alt={comic.title} 
                            />
                    }}
                </ProgressiveImage>
                <span>{comic.title}</span>
            </div>
        )
    })
    return (
        <div id="center-comics-list">
            {list}
        </div>
    )
}

export default ComicRenderer;