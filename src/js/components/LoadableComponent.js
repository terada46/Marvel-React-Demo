import React from 'react';
import Loadable from 'react-loadable';
import { LoadSpinnerSmall } from '../functions';

// Dynamically importing character detail modules

const LoadableCharacterComponent = Loadable({
	loader: () => import('./CharacterMain'),
	loading: Loading,
	render(loaded, props) {
		let Component = loaded.default;
		return <Component {...props} />;
	}
});

function Loading(props) {
	if (props.error) {
		return <div>An Error occurred, please refresh the page.</div>;
	} else if (props.pastDelay) {
		return <LoadSpinnerSmall />;
	} else {
		return null;
	}
}

export default LoadableCharacterComponent;