import React from 'react'
import { connect } from 'react-redux'
import PinDetailsContainer from '../Containers/PinDetailsContainer'

//Material UI style imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const searchUrl = ' https://tooglemapshare-app-api.herokuapp.com/api/v1/yelp'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 375,
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

  //hits Yelp API for search results
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
      this.props.addSearchCard(null)
    })
  }

  handleKeyDown =  (event) => {
    if (event.key === "Enter") {
      this.props.setMarker(null)
      this.fetchResults()
      this.props.setMapLocation({mapLocation: [this.props.currentList.latitude, this.props.currentList.longitude], mapZoom: 12})
    }
  }

  handleClick = () => {
    this.props.setMarker(null)
    this.fetchResults()
    this.props.setMapLocation({mapLocation: [this.props.currentList.latitude, this.props.currentList.longitude], mapZoom: 12})
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
        {this.props.searchResults.length === 0 || this.props.searchTerm  === "" ? null : <PinDetailsContainer/>}
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
    searchTerm: state.searchTerm,
    mapLocation: state.mapLocation,
    currentMarker: state.currentMarker
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
    setMarker: (payload) => {
      dispatch({type:"CURRENT_MARKER", payload: payload})
    },
    addSearchCard: (payload) => {
      dispatch({type: "ADD_SEARCH_CARD", payload: payload})
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Search))
