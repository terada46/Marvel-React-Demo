import React, { Fragment, Component } from 'react';
import { isImagesLoaded, LoadSpinner } from '../functions';

//Render the comics data in gallery

export default class ComicRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    handleImageChange = () => {       
        this.setState(() => ({
            loading: !isImagesLoaded(this.comicsElement)
        }));       
    }

    renderSpinner = () => {
        if (!this.state.loading) {
            return null;
        }
        return <LoadSpinner />
    }  

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.setState({
                loading: true
            })
        }
    }

    render() {
        if (this.props.comics.length == 0) {
            return null
        }
        let row = [];
        if (this.props.comics.length > 0) {
            let comics = this.props.comics;
            comics.map(comic => {
                if (comic.images.length>0) {
                    let thumbnail = 
                        comic.images[0].path + '/portrait_fantastic.' + comic.images[0].extension;
                    row.push(
                        <div className="comic" key={comic.id}>                 
                            <img 
                                src={thumbnail} 
                                onLoad={this.handleImageChange}
                                onError={this.handleImageChange} 
                            />
                            <span>{comic.title}</span>
                        </div>
                    );
                }
            })
        }
        return (
            <Fragment>
                <h2>RELATED COMICS</h2>
                <div id="comics_list" ref={element => {this.comicsElement = element}}>
                    {this.renderSpinner()}
                    <div id="center-comics-list">
                        {row}
                    </div>
                </div>
            </Fragment>
        )
    }
}