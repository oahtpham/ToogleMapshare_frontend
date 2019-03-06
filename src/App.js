import React, { Component } from 'react';
import Navigation from './Navigation'
import Search from './Components/Search'
import MapDisplay from './Components/MapDisplay'
import BottomNavigation from './BottomNavigation'
import AlertBox from './AlertBox'
import './App.css'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navigation/>
        {this.props.currentList ? <Search/> : <AlertBox/>}
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
