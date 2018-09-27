import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import './assets/css/main.css';
import './assets/css/noscript.css';
import {  getDataFirstTime, 
          showItemDetails, 
          findItemBySearch, 
          searchByGenre,
          searchItemYoutube,
          showVideo } from './ActionCreators/actions';

// Component imports
import MovieList from './Components/MovieList';
import MovieDetail from './Components/MovieDetail';
import Header from './Components/Header';
import Footer from './Components/Footer';

// Connect to Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

let type = 'movie';
let category = 'top_rated';
let pageNumber = 1;

class App extends Component {

  componentWillMount = () => {
    this.props.getDataFirstTime();
  }

  showItemDetails = (id) => {
    this.props.showItemDetails(id);
  }

  getDataFirstTime = (type1, category1, pageNumber1) => {
    type = type1;
    category = category1;
    pageNumber = Number(pageNumber1);
    console.log(type, typeof(type), category, typeof(category), pageNumber, typeof(pageNumber));
    this.props.getDataFirstTime(type1, category1, pageNumber1);
  }

  handleItemSearch = (event, value) => {
    event.preventDefault();
    // <Redirect to="/movies" />
    console.log(type, category);
    this.props.findItemBySearch(value, type);
  }

  searchMore = () => {
    console.log(type, category, pageNumber);
    pageNumber++;
    this.props.getDataFirstTime(type, category, pageNumber);
  }

  render() {
    return (
      <div id="wrapper">

          <BrowserRouter>
            <span>
              <Route path="/" 
              render={(props) => 
                      <Header {...props} 
                      appState={this.props.appState}
                      handleItemSearch={(event, value) => this.handleItemSearch(event, value)}
                      searchByGenre={(id) => this.props.searchByGenre(id)}
                      getDataMovieTV={(type, category, pageNumber) => this.getDataFirstTime(type, category, pageNumber)}
                      />} />
              <div id="main">
                <div className="inner">
                      <Switch>
                        <Route path="/" 
                        render={(props) => 
                                <MovieList {...props} 
                                appState={this.props.appState} 
                                showItemDetails={(id) => this.showItemDetails(id)} />} exact />
                        <Route path="/movies" 
                        render={(props) => 
                                <MovieList {...props} 
                                appState={this.props.appState} 
                                showItemDetails={(id) => this.showItemDetails(id)} /> }/>
                        <Route path="/detail" 
                        render={(props) => 
                                <MovieDetail {...props} 
                                currentDetailsPage={this.props.appState ? this.props.appState.currentDetailsPage : ''} 
                                searchItemYoutube={(term) => this.props.searchItemYoutube(term)} 
                                searchedVideos={this.props.appState ? this.props.appState.searchedVideos : ''} 
                                showVideo={(id) => this.props.showVideo(id)}
                                isShowVideo={this.props.appState ? this.props.appState.showVideo: ''} 
                                showVideoId={this.props.appState ? this.props.appState.showVideoId: ''}/>}/>
                        <Route 
                        render={(props) => 
                                <MovieList {...props} 
                                appState={this.props.appState} 
                                showItemDetails={(id) => this.showItemDetails(id)} />} />
                      </Switch>
                </div>
                <div style={{'padding' : '3.5rem'}}>
                  <button onClick={() => this.searchMore()}>
                    Load More...
                  </button>
                </div>
              </div>
              <Route path="/" component={Footer} />
            </span>
          </BrowserRouter>

      </div>
    );
  }
}

// Here we connect the state that was made in 'Reducers/index.js' and sent through 'src/index.js', through <Provider> to the state of this component(App component) from where it trickles down other components.
const mapStateToProps = (state) => {
  return {
    appState: state.appState
  }
}

// Here we bind the actions(events triggered from the view by the user) to the corresponding action creators which then get dispatched and are sent to all the reducers.
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDataFirstTime, 
                              showItemDetails, 
                              findItemBySearch, 
                              searchByGenre, 
                              searchItemYoutube,
                              showVideo }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



/* App Essentials:

Components:

1. List Component.
  a. Single Item Component.

2. Details Component.

The two components above will be routed with different routes. The router will be applied on the app component.

3. Search bar component.

4. Main app component(containing the header and the footer).

*/