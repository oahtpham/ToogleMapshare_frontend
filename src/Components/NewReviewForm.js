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
import Divider from '@material-ui/core/Divider'
import StarRatings from 'react-star-ratings'

const placesURL = 'http://localhost:3000/api/v1/places'
const reviewsURL = 'http://localhost:3000/api/v1/reviews'

class NewReviewForm extends React.Component {

  state = {
    note: '',
    rating: 0
  }

  handleOnChange = (event) => {
    this.setState({
      note: event.target.value
    })
  }

  changeRating = (newRating) => {
    this.setState({
      rating: newRating
    });
  }

  handleSubmit = (searchPin) => {
    fetch(placesURL, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        yelp_id: searchPin.id,
        name: searchPin.name,
        address: searchPin.location.address1,
        city: searchPin.location.city,
        state: searchPin.location.state,
        zip_code: searchPin.location.zip_code,
        latitude: searchPin.coordinates.latitude,
        longitude: searchPin.coordinates.longitude,
        img_url: searchPin.image_url,
        yelp_url: searchPin.url,
        yelp_rating: searchPin.rating,
        price: searchPin.price
      })
    })
    .then(resp => resp.json())
    .then(() => {
      fetch(reviewsURL, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: 1,
          yelp_id: searchPin.id,
          notes: this.state.note,
          rating: this.state.rating
        })
      })
      .then(resp => resp.json())
      .then(obj => {
        this.props.toggleForm()
        this.props.addNewReview(obj);
      })
    })
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.toggleForm}
        >
          <DialogTitle disableTypography>
            <h4>{this.props.searchPin.name}</h4>
            <img className="locationImage" src={this.props.searchPin.image_url}/><br/><br/>
            {this.props.searchPin.location.address1}<br/>
            {this.props.searchPin.location.city}, {this.props.searchPin.location.state}<br/> {this.props.searchPin.location.zip_code}
          </DialogTitle>
          <Divider style={{width: '500px'}}/>
          <DialogContent onChange={this.handleOnChange}>
            <h4> Review </h4>
            <StarRatings
             rating={this.state.rating}
             changeRating={this.changeRating}
             starRatedColor="orange"
             numberOfStars={5}
             starDimension="20px"
             starSpacing="1px"
             name='rating'
           /><br/>
            <TextField
              name="note"
              label="Notes/Review"
              multiline
              rows="5"
              margin="normal"
              variant="outlined"
              color="secondary"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <br/>
            <br/>
            <Button onClick={this.props.toggleForm} color="primary">
              Close
            </Button>
            <Button onClick={() => this.handleSubmit(this.props.searchPin)} color="primary">
              Add Review
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
    },
    addNewReview: (payload) => {
      dispatch({type: "ADD_NEW_REVIEW", payload: payload})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReviewForm)
