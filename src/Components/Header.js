import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import Search from './Search';

export default class Header extends Component {
	
	handleItemSearch = (event, value) => {
		this.props.history.push('/movies');
		this.props.handleItemSearch(event, value);
	}

	componentDidMount = () => {
	}

	handleClick = (event) => {
		this.props.history.push('/movies');
		this.props.searchByGenre(event.target.value);
	}

	renderDropdownList = (val) => {
		return (this.props.appState !== null && this.props.appState.genresList !== null) ? (
			<select onChange={(event) => this.handleClick(event)}>
			{this.props.appState.genresList.map((item) => {
			return (
				<option key={item.id} value={item.id} className="genres_option">{item.name}</option>
			);
			})}
			</select>) : (
			<option>
				Loading...
			</option>
		);

	}

	getData = (val) => {
		let type, category, pageNumber;
		if(val === 1) {
			type = 'movie';
			category = 'top_rated';
			pageNumber = 1;
			document.getElementById('movie-tab').classList.add('activeTab');
			document.getElementById('tv-shows-tab').classList.remove('activeTab');
		}
		else if(val === 2) {
			type = 'tv';
			category = 'top_rated';
			pageNumber = 1;
			document.getElementById('tv-shows-tab').classList.add('activeTab');
			document.getElementById('movie-tab').classList.remove('activeTab');
		}
		this.props.history.push('/movies');
		this.props.getDataMovieTV(type, category, pageNumber);
	}

	render() {
		return (
			<span>
				<header id="header">
					<div className="inner">

					    <NavLink to="/movies">
							<span className="logo">
								<span className="symbol">
								  <img src={ require("../assets/images/logo.svg") } alt="" />
								</span>
								<span className="title">Phantom</span>
							</span>
					    </NavLink>
					    
					    <Search handleItemSearch={(event, value) => this.handleItemSearch(event, value)}/>

					</div>
				</header>

				<nav id="menu">
					<h2>Menu</h2>
					<ul>
					  	<li><a>Home</a></li>
					  	<li><a>Ipsum veroeros</a></li>
					  	<li><a>Tempus etiam</a></li>
					  	<li><a>Consequat dolor</a></li>
					  	<li><a>Elements</a></li>
					</ul>
				</nav>

				<div style={{'paddingLeft' : '3.5rem'}}>
					<button className="activeTab" id="movie-tab" style={{'marginRight' : '1rem'}} onClick={() => this.getData(1)}>Movie</button>
					<button id="tv-shows-tab" onClick={() => this.getData(2)}>TV Shows</button>
				</div>

				<section className="inner" style={{'display': 'flex', 'alignItems': 'center', 'marginBottom': '2rem'}}>
					<label>
						Genres:
					</label>
						{this.renderDropdownList('genres')}
				</section>

          	</span>
		);
	}
}