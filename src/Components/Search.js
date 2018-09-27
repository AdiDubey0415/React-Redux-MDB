import React, { Component } from 'react';

export default class Search extends Component {
	render() {
		return (
			<form onSubmit={(event) => { 
				event.preventDefault();
				return (this.props.handleItemSearch(event, document.getElementById('searchBar').value))
			}}>
				<input type="text" placeholder="Search for a movie/show/person" id="searchBar"/>
			</form>
		);
	}
}