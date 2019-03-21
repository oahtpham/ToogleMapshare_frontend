import React from 'react';
import { connect } from 'react-redux'

//material UI style imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider'
import StarRatings from 'react-star-ratings'

//backend API links
const placesURL = 'https://tooglemapshare-app-api.herokuapp.com/api/v1/places'
const reviewsURL = 'https://tooglemapshare-app-api.herokuapp.com/api/v1/reviews'

class NewReviewForm extends React.Component {

  // local state needed to handle form inputs
  state = {
    note: '',
    rating: 0
  }

  handleOnChange = (e) => {
    this.setState({
      note: e.target.value
    })
  }

  changeRating = (newRating) => {
    this.setState({
      rating: newRating
    });
  }

  //reviews a place from search results
  //initial fetch persists restaurant details to backend
  //second fetch persists the new review details to backend
  handleSearchSubmit = (searchPin) => {
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
        this.props.toggleReviewForm()
        this.props.addNewReview(obj);
      })
    })
  }

  //reviews a place that is already pinned
  handleSubmit = (pin) => {
    fetch(reviewsURL, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: 1,
        yelp_id: pin.place.yelp_id,
        notes: this.state.note,
        rating: this.state.rating
      })
    })
    .then(resp => resp.json())
    .then(obj => {
      this.props.toggleReviewForm()
      this.props.addNewReview(obj);
    })
  }

  locationDetails = () => {
    if (this.props.currentList) {
      return (
        <div>
          <h4>{this.props.searchPin.name}</h4>
          <img alt="location" className="locationImage" src={this.props.searchPin.image_url}/><br/><br/>
          {this.props.searchPin.location.address1}<br/>
          {this.props.searchPin.location.city}, {this.props.searchPin.location.state}<br/> {this.props.searchPin.location.zip_code}
        </div>
      )
    } else {
      return (
        <div>
          <h4>{this.props.pin.place.name}</h4>
          <img alt="location" className="locationImage" src={this.props.pin.place.img_url}/><br/><br/>
          {this.props.pin.place.address}<br/>
          {this.props.pin.place.city}, {this.props.pin.place.state}<br/> {this.props.pin.place.zip_code}
        </div>
      )
    }
  }


  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.toggleReviewForm}
        >
          <DialogTitle disableTypography>
          {this.locationDetails()}
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
            <Button onClick={this.props.toggleReviewForm} color="primary">
              Close
            </Button>
            <Button
            onClick={this.props.currentList ? () => this.handleSearchSubmit(this.props.searchPin) : () => this.handleSubmit(this.props.pin) } //pin props come from parent component and not stored in reducer
            color="primary">
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
    currentList: state.currentList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleReviewForm: () => {
      dispatch({type: "OPEN_NEW_REVIEW_FORM"})
    },
    addNewReview: (payload) => {
      dispatch({type: "ADD_NEW_REVIEW", payload: payload})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReviewForm)
