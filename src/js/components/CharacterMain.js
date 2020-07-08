import React from 'react';
import CharacterProfile from './CharacterProfile';
import GetComics from './GetComics';

//Component containing profile infomation and 
//related comics about the character

const CharacterMain = ({id}) => {
	return (
		<div id="main">
			<CharacterProfile id={id} />
			<GetComics id={id} />
		</div>
	)
}

export default CharacterMain;