import React, { Component } from 'react';

// Component imports
import MovieListItem from '../Components/MovieListItem';

export default class MovieListComponent extends Component {
	render() {
		return (
			<div>
				<section className="tiles">
					<MovieListItem appState={this.props.appState} showItemDetails={(id) => this.props.showItemDetails(id)}/>
				</section>
			</div>
		);
	}
}

/* <header>
	<h1>This is Phantom, a free, fully responsive site<br />
	template designed by <a href="http://html5up.net">HTML5 UP</a>.</h1>
	<p>Etiam quis viverra lorem, in semper lorem. Sed nisl arcu euismod sit amet nisi euismod sed cursus arcu elementum ipsum arcu vivamus quis venenatis orci lorem ipsum et magna feugiat veroeros aliquam. Lorem ipsum dolor sit amet nullam dolore.</p>
</header> */