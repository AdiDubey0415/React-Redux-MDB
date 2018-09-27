import React, { Component } from 'react';

export default class MovieDetail extends Component {

	componentWillMount = () => {
		console.log(this.props);
	}

	showVideo = (id) => {
		this.props.showVideo(id);
	}

	renderVideoPlayer = () => {
		console.log(this.props.searchedVideos);
		if(this.props.searchedVideos !== null && this.props.searchedVideos !== undefined) {

			if(this.props.searchedVideos.length < 1) {
				return (
					<span>
						Finding...
					</span>
				);
			}
			else {
				for(let i = 0; i < this.props.searchedVideos.length; i++) {

				}
				return this.props.searchedVideos.map((val) => {
					return (
						<div key={val.id} style={{'minWidth' : '25%', 'margin' : '1rem'}} onClick={() => this.showVideo(val.id)}>
		                	<img alt="" src={val.thumbnails.medium.url} style={{'width' : '100%'}} />
		                	<span>
		                		{val.title}
		                	</span>	
						</div>
					);
				});
			}
		}
	}

	renderFunction = () => {
		if(this.props.currentDetailsPage !== null && this.props.currentDetailsPage.length > 0) {
			return (
				<div id="main">
					<div className="inner">
						<h1>{this.props.currentDetailsPage[0].title !== undefined ? this.props.currentDetailsPage[0].title : this.props.currentDetailsPage[0].original_name}</h1>
						<span className="image main">
							<img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${this.props.currentDetailsPage[0].poster_path}`} alt="" />
							<span className="movie-detail">
								<span>Popularity: {this.props.currentDetailsPage[0].popularity}</span>
								<span>Release Date: {this.props.currentDetailsPage[0].release_date !== undefined ? this.props.currentDetailsPage[0].release_date : this.props.currentDetailsPage[0].first_air_date}</span>
								<span>Vote Average: {this.props.currentDetailsPage[0].vote_average}</span>
								<span>Vote Count: {this.props.currentDetailsPage[0].vote_count}</span>
							</span>
						</span>
						<p>{this.props.currentDetailsPage[0].overview}</p>
						<button onClick={() => this.props.searchItemYoutube(this.props.currentDetailsPage[0].title !== undefined ? this.props.currentDetailsPage[0].title : this.props.currentDetailsPage[0].original_name)}>
							Search Trailer on Youtube
						</button>
						<div className="yt-searched-videos">
							{this.renderVideoPlayer()}
						</div>
						{ this.props.isShowVideo !== null && this.props.showVideoId !== undefined && this.props.isShowVideo !== false ? (<div className="youtube-iframe-div">
							<iframe title="" className="youtube-iframe"
		                		src={`https://www.youtube.com/embed/${this.props.showVideoId}`}>
		                	</iframe>
						</div>) : ''}
					</div>
				</div>
			);
		}

	}

	render() {
		return (
			this.renderFunction()
		);
	}
}