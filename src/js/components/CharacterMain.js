import React, { Component } from 'react';
import CharacterProfile from './CharacterProfile';
import GetComics from './GetComics';

//Component to show some infomation about the character 

export default class CharacterMain extends Component {
	render () {
		return (
			<div id="main">
				<CharacterProfile id={this.props.id} />
				<GetComics id={this.props.id} />
			</div>
		)
	}
}