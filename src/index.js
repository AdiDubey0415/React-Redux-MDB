import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// To connect redux with react

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducers } from './Reducers';
import thunk from 'redux-thunk';

export const store = createStore(rootReducers, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root')
);

registerServiceWorker();
