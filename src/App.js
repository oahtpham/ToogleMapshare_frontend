import React, { Component } from 'react';
import Search from './Components/Search'
import { connect } from 'react-redux'

class App extends Component {

  renderResults = () => {
    return this.props.searchResults.map(restaurant =>
        <div>
        <a href={restaurant.url}> {restaurant.name}</a>
        <img src={restaurant.image_url} />
        <p>{restaurant.price}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <Search />
        {this.renderResults()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults
  }
}

export default connect(mapStateToProps)(App);
