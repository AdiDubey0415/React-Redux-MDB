import axios from 'axios';

// let pageNumber = 1;
// let category = 'top_rated';
// let type = 'movie';
let api_key = '7251d113868a9c14da475de55cd01340';
let responseList;
// let responseGenresList;
const YT_API_KEY = "AIzaSyDsUro2mrHwyIEP5SneV8x2ZC5JgXsR5Dg";

export const getDataFirstTime = (type = 'movie', category = 'top_rated', pageNumber = 1) => {
	
	console.log(type, category, pageNumber);

	const requestGenres = () => axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=7251d113868a9c14da475de55cd01340&language=en-US`);

	const request = () => axios.get(`https://api.themoviedb.org/3/${type}/${category}?api_key=${api_key}&language=en-US&page=${pageNumber}`);

	return dispatch => {
		dispatch({
			type: "LOADING"
		});

		requestGenres()
		.then(res => {
			console.log(res);
			dispatch({
				type: 'SET_GENRES_LIST',
				payload: res.data.genres
			});
		})
		.catch();

		request()
		.then(res => {
			console.log(res);
			responseList = res.data.results;
			const list = res.data.results.map((item) => item);

			dispatch({
				type: 'FIRST_DATA_SET',
				payload: list,
				searchType: type
			});
		})
		.catch((error) => {
			dispatch({
				type: 'FIRST_DATA_SET_FAILED'
			});
		});

	};

}

export const showItemDetails = (id) => {
	// console.log('HITTTT!!!', responseList.filter((item) => item.id === id));
	return {
		type: 'SET_DETAILS_PAGE',
		payload: responseList.filter((item) => item.id === id)
	}
}

export const findItemBySearch = (value, type) => {
	const request = () => axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=7251d113868a9c14da475de55cd01340&language=en-US&query=${value}&page=1&include_adult=false`)

	return dispatch => {
		dispatch({
			type: 'SEARCHING_ITEM'
		});

		request()
		.then(res => {
			// console.log('Searched Movies', res);
			responseList = res.data.results;
			const list = res.data.results;

			dispatch({
				type: 'SEARCHING_ITEM_FOUND',
				payload: list
			});
		})
		.catch(error => {
			dispatch({
				type: 'SEARCHING_ITEM_FAILED'
			});
		});
	}

}

export const searchByGenre = (id) => {
	return ({
		type: 'SEARCH_BY_GENRE',
		payload: id
	});
}

export const searchItemYoutube = (term) => {
	// console.log(term);
	const videoRequest = () => axios.get(`https://www.googleapis.com/youtube/v3/search?q=${term}+''+trailer&type=video&maxResults=25&part=snippet&key=${YT_API_KEY}`);

	return dispatch => {
		dispatch({
			type: 'SEARCHING_VIDEO'
		});
		videoRequest()
		.then(res => {
			console.log(res);
			const itemsArray = res.data.items.map(video => {
	          return {
	            id: video.id.videoId,
	            title: video.snippet.title,
	            description: video.snippet.description,
	            thumbnails: video.snippet.thumbnails
	          };
	        });
			dispatch({
				type: 'SEARCHING_VIDEO_COMPLETED',
				payload: itemsArray
			});
		})
		.catch(error => {
			dispatch({
				type: 'SEARCHING_VIDEO_FAILED'
			});
		});
	}
}

export const showVideo = (id) => {
	return ({
		type: 'SHOW_VIDEO',
		payload: id
	});
}