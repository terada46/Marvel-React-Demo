import React, { Fragment, Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import CharactersList from './components/CharactersList';
import CharacterMain from './components/CharacterMain'
import { CharacterListLoader } from './components/ImageLoader';
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
    
	async componentDidMount() {
		try {
			const response = await Promise.all(
				characters.map(async id => {
					const res = await axios.get(charactersAPI, {
						params: {
							ts: ts,
							apikey: apikey,
							id: id,
							hash: hash
						}
					});
					if (res.status === 200) {
						return res.data.data.results[0];
					}
				})
			);
			if (response.length !== 0) {
				this.setState({
					charaArray: [...response]
				});
			}
		}
		catch (error) {
			this.setState({ hasError: true });
		}
		
	}

    onCharacterClick = (id) => {
        this.setState({
			selected_id: id,
		});
    }

	render() {
        if (this.state.hasError) {
        	return <h2 className="error">App Connection Failed. Please refresh the page.</h2>
    	}
		return (
            <Fragment>
                <p className="guide">Click and View More about the Character.</p>
				{this.state.charaArray.length === 0 ? <CharacterListLoader /> : null}
                <CharactersList
                    id={this.state.selected_id} 
                    characters={this.state.charaArray}
                    handleCharacterClick={this.onCharacterClick} 
				/>
				{this.state.selected_id !== null 
					? <CharacterMain 
						id={this.state.selected_id} 
					  /> 
					: null }
            </Fragment>
        )
	}
}

const wrapper = document.getElementById('content');
wrapper ? render(<App />, wrapper) : false;