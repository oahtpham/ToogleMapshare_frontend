import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import PinsContainer from '../Containers/PinsContainer'

import { connect } from 'react-redux'

const searchUrl = 'http://localhost:3000/api/v1/yelp'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 350,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};


class Search extends React.Component {

  handleOnChange = (event) => {
    this.props.setSearchTerm(event.target.value)
    if (this.props.searchTerm === "") {
      this.props.setResults([])
    }
  }

  fetchResults = () => {
    fetch(searchUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        searchTerm: this.props.searchTerm,
        searchLocation: this.props.currentList.location_area
      })
    })
    .then(response => response.json())
    .then(obj => {
      this.props.setResults(obj)
    })
  }

  handleKeyDown =  (event) => {
    if (event.key === "Enter") {
      this.fetchResults()
    }
  }

  handleClick = () => {
    this.fetchResults()
  }

  render() {
    const { classes } = this.props
    return (
      <div className="search">
        <Paper
          className={classes.root}
          elevation={1}>
        <InputBase
          onChange={this.handleOnChange}
          onKeyDown={this.handleKeyDown}
          className={classes.input}
          placeholder="Search places to add to your list" />
        <IconButton
          onClick={this.handleClick}
          className={classes.iconButton}
          aria-label="Search">
          <SearchIcon />
        </IconButton>
        </Paper>
        {this.props.searchResults.length === 0 || this.props.searchTerm === "" ? null : <PinsContainer/>}
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    currentList: state.currentList,
    searchResults: state.searchResults,
    searchTerm: state.searchTerm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setResults: (payload) => {
      dispatch({type: 'CURRENT_SEARCH_RESULTS', payload: payload})
    },
    setSearchTerm: (payload) => {
      dispatch({type: 'SET_SEARCH_TERM', payload: payload})
    },
    setMapLocation: (payload) => {
      dispatch({type: "SET_MAP_LOCATION", payload: payload})
    },
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Search))
