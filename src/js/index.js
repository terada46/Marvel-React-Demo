import React, { Fragment, Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import CharactersList from './components/CharactersList';
import LoadableCharacterComponent from './components/LoadableComponent';
import { charactersAPI, apikey, characters, ts, hash } from './constants';
import '../style.css';

//The main app component

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected_id: null,
			charaArray:[],
            hasError: false
		}
    }
    
	componentDidMount() {
		return Promise.all(
			characters.map(id => {
				return axios.get( charactersAPI, {
					params: {
						ts: ts,
						apikey: apikey,
						id: id,
						hash: hash
					}
				})
				.then(response => {
					if (response.status === 200) {
						return response.data.data.results[0];			
					}
				})
			})
		)
		.then(response => {
				if (response.length !== 0) {
					this.setState(prevState => ({
						charaArray: [...prevState.charaArray].concat(response)
					}))
				}
			}
		)
		.catch(() => {
			this.setState(() => ({hasError: true}))
		})
		
	}

    onCharacterClick = id => {
        this.setState({
			selected_id: id
		});
    }

	render() {
        if (this.state.hasError) {
        	return <h2 className="error">App Connection Failed. Please refresh the page.</h2>
    	}
		return (
            <Fragment>
                <p className="guide">Click and View More about the Character.</p>
                <CharactersList
                    id={this.state.selected_id} 
                    characters={this.state.charaArray} 
                    handleCharacterClick={this.onCharacterClick} 
				/>
				{ this.state.selected_id !== null 
					? <LoadableCharacterComponent id={this.state.selected_id} /> 
					: null }
            </Fragment>
        )
	}
}

const wrapper = document.getElementById('content');
wrapper ? render(<App />, wrapper) : false;