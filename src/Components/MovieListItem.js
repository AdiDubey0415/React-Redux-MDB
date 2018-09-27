import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class MovieListItem extends Component {
	
	handleClick = () => {
		alert('Clicked!!!');
	}

	renderItemGenre = (item) => {
		return item.genre_ids.map((val, index) => {
			return (<li key={val} style={{'fontWeight' : 'bold'}}>{item.genres_list[index]}</li>)
		});
	}

	renderList = () => {
		return (this.props.appState != null && this.props.appState.mainPageList != null) ? this.props.appState.mainPageList.map((item) => {
			return (
				<article className="style1" key={item.id} onClick={(event, id) => this.props.showItemDetails(item.id)}>
					<span className="image">
						<img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`} alt="" />
					</span>
					<NavLink to="/detail">
						<span style={{'marginTop': 'auto'}}>
							<h2>{item.title !== undefined ? item.title : item.original_name}</h2>
							<div className="content">
								<p style={{'fontWeight' : 'bold'}}>{item.original_language}</p>
							</div>
						</span>
						<div style={{'marginTop': 'auto', 'width': '100%', 'textAlign': 'left'}}>
							<ul className="genres-ul">
							{this.renderItemGenre(item)}
							</ul>
						</div>
					</NavLink>
				</article>
			);
		}) : (
			<div style={{'paddingLeft' : '3.5rem', 'marginTop' : '3rem'}}>
				Loading...
			</div>
		);
	}

	render() {
		return (
			this.renderList()
		);
	}
}