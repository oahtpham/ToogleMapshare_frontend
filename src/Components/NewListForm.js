import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux'
import { Redirect, Link } from "react-router-dom"

class NewListForm extends React.Component {

  state = {
    title: '',
    location: '',
    latitude: null,
    longitude: null,
    redirect: false
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // this.setState(STATERESET)
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
        this.props.listDetails(obj)
        this.props.toggleForm()
      })
      .then(() => {
        this.setState({
          redirect: true
        })
      })
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/listdisplay' />
    }
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.toggleForm}
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
            <Button onClick={this.props.toggleForm} color="primary">
              Close
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
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
    open: state.openNewListForm,
    details: state.currentList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleForm: () => {
      dispatch({type: "OPEN_NEW_LIST_FORM"})
    },
    listDetails: (payload) => {
      dispatch({type: "CURRENT_LIST", payload: payload})
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewListForm)
