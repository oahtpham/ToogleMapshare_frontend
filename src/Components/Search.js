import React, { Component } from 'react'
import { connect } from 'react-redux'

const searchUrl = 'http://localhost:3000/api/v1/yelp'

class Search extends React.Component {

  state = {
    searchTerm: "",
    searchLocation: ""
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnSubmit =  (event) => {
    event.preventDefault()
    fetch(searchUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        searchTerm: this.state.searchTerm,
        searchLocation: this.state.searchLocation
      })
    })
    .then(response => response.json())
    .then(obj => {
      this.props.setResults(obj)
    })
  }

  render() {
    return (
      <form id="search-form" onChange={this.handleOnChange} onSubmit={this.handleOnSubmit}>
      <label>
        Search:
      <input type="text" name="searchTerm" />
      </label>
      <label>
        Location:
      <input type="text" name="searchLocation" />
      </label>
      <input type="submit" value="Submit" />
    </form>
    )
  }
}

const mapDispatchToProps = {
  setResults: (payload) => ({type: 'CURRENT_SEARCH_RESULTS', payload: payload})
}

export default connect(null, mapDispatchToProps)(Search)
