import React from 'react';
import { connect } from 'react-redux'

//material UI style imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class NewListForm extends React.Component {

  // local state needed to handle form inputs
  state = {
    title: '',
    location: '',
    latitude: null,
    longitude: null,
    redirect: false
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //initial fetch accesses Google Maps API to find lat and long of text location input
  //second fetch will then create a new list and persist to database
  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.location}&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`)
    .then(response => response.json())
    .then(geolocation =>
      this.setState({
        latitude: geolocation.results[0].geometry.location.lat,
        longitude: geolocation.results[0].geometry.location.lng
      })
    )
    .then(() => {
      fetch(`http://localhost:3000/api/v1/lists`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        },
        body: JSON.stringify({
          user_id: 1,
          title: this.state.title,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          location_area: this.state.location
        })
      })
      .then(response => response.json())
      .then(obj => {
        this.props.currentList(obj) //sets map to currentList
        this.props.addNewList(obj) //adds to dropdown lists in menu bar
        this.props.toggleListForm() //closes list dialog box
        this.props.setMapLocation({mapLocation: [obj.latitude, obj.longitude], mapZoom: 12}) //zooms map into location
      })
    })
  }


  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.toggleListForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Start a New List</DialogTitle>
          <DialogContent onChange={this.handleOnChange}>
            <TextField
              autoFocus
              margin="dense"
              id="list-title"
              name="title"
              label="Title"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="location"
              name="location"
              label="Location (City, State/Country)"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.props.toggleListForm}
              color="primary">
              Close
            </Button>
            <Button
              onClick={this.handleSubmit}
              color="primary">
              Create New List
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.openNewListForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleListForm: () => {
      dispatch({type: "OPEN_NEW_LIST_FORM"})
    },
    currentList: (payload) => {
      dispatch({type: "CURRENT_LIST", payload: payload})
    },
    addNewList: (payload) => {
      dispatch({type: "ADD_NEW_LIST", payload: payload})
    },
    setMapLocation: (payload) => {
      dispatch({type: "SET_MAP_LOCATION", payload: payload})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewListForm)
