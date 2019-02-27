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

import { connect } from 'react-redux'

const searchUrl = 'http://localhost:3000/api/v1/yelp'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
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

  state = {
    searchTerm: ""
  }

  handleOnChange = (event) => {
    this.setState({
      searchTerm: event.target.value
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
        searchLocation: this.props.currentList.location_area
      })
    })
    .then(response => response.json())
    .then(obj => {
      this.props.setResults(obj)
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className="search">
      <Paper className={classes.root} elevation={1}>
      <InputBase onChange={this.handleOnChange}
      className={classes.input} placeholder="Add places to your list" />
      <IconButton className={classes.iconButton} aria-label="Search">
      <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} />
      <IconButton onClick={this.handleOnSubmit} color="primary" className={classes.iconButton} aria-label="Directions">
      <DirectionsIcon/>
      </IconButton>
      </Paper>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    currentList: state.currentList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setResults: (payload) => { dispatch({type: 'CURRENT_SEARCH_RESULTS', payload: payload})
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Search))
