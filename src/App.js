import React, { Component } from 'react';
import Navigation from './Containers/Navigation'
import Search from './Components/Search'
import MapDisplay from './Containers/MapDisplay'
import WelcomeAlertBox from './WelcomeAlertBox'
import './App.css'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navigation/>
        {this.props.currentList ? <Search/> : <WelcomeAlertBox/>}
        <MapDisplay/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentList: state.currentList
  }
}

export default connect(mapStateToProps)(App);
