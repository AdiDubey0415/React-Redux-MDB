
export default function appState(state = null, action) {

	let newState;

	switch(action.type) {
		
		case 'LOADING':
		newState = {...state};
		newState.mainPageList = null;
		newState.genresList = null;
		return newState;

		case 'FIRST_DATA_SET':
		newState = {...state};
		newState.mainPageList = action.payload;
		for(let i = 0; i < newState.mainPageList.length; i++) {
			newState.mainPageList[i].genres_list = newState.mainPageList[i].genre_ids.map((val) => {
				for(let j = 0; j < newState.genresList.length; j++) {
					if(newState.genresList[j].id == val) {
						return newState.genresList[j].name;
					}
				}
			});
		}
		newState.mainList = newState.mainPageList;
		console.log(newState);
		return newState;

		case 'FIRST_DATA_SET_FAILED':
		return state;

		case 'SET_DETAILS_PAGE':
		let newState = {...state};
		delete newState.searchedVideos;
		delete newState.showVideo;
		delete newState.showVideoId;
		newState.currentDetailsPage = action.payload;
		console.log(newState);
		return newState;


		// Searching Actions

		case 'SEARCHING_ITEM':
		return state;
		
		case 'SEARCHING_ITEM_FAILED':
		return state;

		case 'SEARCHING_ITEM_FOUND':
		newState = {...state};
		newState.mainPageList = action.payload;
		for(let i = 0; i < newState.mainPageList.length; i++) {
			newState.mainPageList[i].genres_list = newState.mainPageList[i].genre_ids.map((val) => {
				for(let j = 0; j < newState.genresList.length; j++) {
					if(newState.genresList[j].id == val) {
						return newState.genresList[j].name;
					}
				}
			});
		}
		newState.mainList = newState.mainPageList;
		return newState;

		case 'SET_GENRES_LIST':
		newState = {...state};
		newState.genresList = action.payload;
		return newState;

		case 'SEARCH_BY_GENRE':
		newState = {...state};
		newState.mainPageList = newState.mainList.filter((item) => {
			return item.genre_ids.indexOf(parseInt(action.payload)) > -1;
		})
		return newState;

		case 'SEARCHING_VIDEO':
		newState = {...state};
		newState.searchedVideos = [];
		return newState;

		case 'SEARCHING_VIDEO_COMPLETED':
		newState = {...state};
		console.log(action.payload);
		newState.searchedVideos = action.payload;
		return newState;

		case 'SHOW_VIDEO':
		newState = {...state};
		newState.showVideo = true;
		newState.showVideoId = action.payload;
		console.log(newState);
		return newState;

		default:
		return state;
	}

}