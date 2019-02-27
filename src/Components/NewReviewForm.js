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

class NewReviewForm extends React.Component {

  state = {
    note: '',
  }

  handleOnChange = (event) => {
    this.setState({
      note: event.target.value
    })
  }

  // handleSubmit = (e) => {
  //     fetch(`http://localhost:3000/api/v1/lists`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": 'application/json',
  //         "Accept": 'application/json'
  //       },
  //       body: JSON.stringify({
  //         user_id: 1,
  //         title: this.state.title,
  //         latitude: this.state.latitude,
  //         longitude: this.state.longitude,
  //         location_area: this.state.location
  //       })
  //     })
  //     .then(response => response.json())
  //     .then(obj => {
  //       this.props.listDetails(obj)
  //       this.props.toggleForm()
  //     })
  //     .then(() => {
  //       this.setState({
  //         redirect: true
  //       })
  //     })
  //   })
  // }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/listdisplay' />
    }
  }

  render() {
    console.log(this.props.open)
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.toggleForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle >
            {this.props.currentMarker ? <h1>Review for {this.props.currentMarker.name} </h1> : null}
            {this.props.currentMarker ? <img className="locationImage" src={this.props.currentMarker.image_url}/> : null}
          </DialogTitle>
          <DialogContent onChange={this.handleOnChange}>
            <TextField
              autoFocus
              margin="dense"
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
    open: state.openNewReviewForm,
    currentMarker: state.currentMarker
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleForm: () => {
      dispatch({type: "OPEN_NEW_REVIEW_FORM"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReviewForm)
