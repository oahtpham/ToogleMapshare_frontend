import React from 'react';
import { connect } from 'react-redux'
import NewReviewForm from './NewReviewForm'

//material UI style imports
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import StarRatings from 'react-star-ratings'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

//backend API links
const pinsURL ='https://tooglemapshare-app-api.herokuapp.com/api/v1//pinned_locations'

const styles = theme => ({
  card: {
    maxWidth: 375,
  },
  media: {
    height: 270,
  },
  avatar: {
    width: 30,
    height: 30
  },
  button: {
    width: 342,
    textAlign: 'center'
  },
  pinnedUser: {
    marginLeft: 8,
  },
  chip: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
    textColor: 'gray'
  },
  subheader: {
    textAlign: 'center'
  }
});



class PinDetailsCard extends React.Component {

  state = {
    pinDetails: null
  }

  filterPinnedLocations = (marker) => {
    return this.props.allPins.filter(pin => pin.place.yelp_id === marker.place.yelp_id)
  }

  handleDeletePin = (marker) => {
    const deletePin = this.props.currentListPins.find(pin => pin.place.yelp_id === marker.place.yelp_id)
    fetch(`${pinsURL}/${deletePin.id}`, { method: "DELETE" })
    .then(resp => {
      if (resp.ok) {
        const newAllPins = this.props.allPins.filter(pin => pin.id !== deletePin.id)
        const newCurrentListPins = this.props.currentListPins.filter(pin => pin.id !== deletePin.id)
        this.props.setAllPins(newAllPins)
        this.props.setCurrentListPins(newCurrentListPins)
      }
    })
  }

  handleReviewClick = (pin) => {
    this.props.toggleReviewForm()
    this.setState({
      pinDetails: pin
    })
  }

  pinnedUsers = (marker, classes) => {
    const notUserPins = this.filterPinnedLocations(marker).filter(pin => pin.user.id !== this.props.currentUser)
    if (this.filterPinnedLocations(marker).length >= 1 && notUserPins.length !== 0) {
      const pinLabel1 = `${notUserPins[0].user.username} pinned this`
      const pinLabel2 = `${notUserPins[0].user.username} and ${notUserPins.length-1} other(s) pinned this`
      return (
        <div>
          <Chip
            avatar={
              <Avatar
                alt={notUserPins[0].user.first_name}
                src={notUserPins[0].user.img_url}
                className={classes.avatar}/>}
              label={notUserPins.length === 1 ? pinLabel1 : pinLabel2}
              className={classes.chip}
           />

         </div>
      )
    }
  }

  handleShowReviewsClick = () => {
    this.setState({
      showReviews: !this.state.showReviews
    })
  }

  reviewsMap = (marker, classes) => {
    const restaurantReviews = this.props.allReviews.filter(review => review.place.yelp_id === marker.place.yelp_id)
    return restaurantReviews.map(review => {
      const label = `${review.user.first_name} ${review.user.last_name}`
      return (
        <div>
          <Chip
            avatar={
              <Avatar
                alt={review.user.first_name}
                src={review.user.img_url}
                className={classes.avatar}/>}
              label={label}
              className={classes.chip}
           />
           <Typography>
             <StarRatings
              rating={review.rating}
              starRatedColor="orange"
              numberOfStars={5}
              starDimension="11px"
              starSpacing="1px"
              name='rating'
            />
          </Typography>
          <Typography variant='p'>
            {review.notes}
          </Typography>
          <br/>
        </div>
      )
    })
  }

  render() {
    const { classes } = this.props;
    const totalReviews = `${this.props.allReviews.filter(review => review.place.yelp_id === this.props.currentMarker.place.yelp_id).length} Friend Reviews`
    return (
      <div>
        <GridListTile
        key="Subheader"
        cols={2}
        style={{ height: 'auto'}}>
          <ListSubheader
            className={classes.subheader}
            component="div">
            Restaurant Details
          </ListSubheader>
        </GridListTile>
        <GridListTile
          key={this.props.currentMarker.place.id}
          cols={3} >
          <Card className={classes.card} >
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Pinned Location"
                className={classes.media}
                height="180"
                width="100"
                image={this.props.currentMarker.place.img_url}
                title={this.props.currentMarker.place.name}
              />
              <CardContent>
                <Typography
                  gutterBottom="true"
                  variant="h6"
                  component="h5">
                  <a href={this.props.currentMarker.place.yelp_url} target="_blank">{this.props.currentMarker.place.name}</a>
                </Typography>
                  <font size='3'>{this.props.currentMarker.place.price ? this.props.currentMarker.place.price : null}</font><br/><br/>
                  <StarRatings
                   rating={this.props.currentMarker.place.yelp_rating}
                   starRatedColor="orange"
                   numberOfStars={5}
                   starDimension="16px"
                   starSpacing="1px"
                   name='rating'
                 /><br/><br/>
                 <Typography
                  gutterbottom="true"
                  variant='body1'>
                  {this.props.currentMarker.place.address}<br/>
                  {this.props.currentMarker.place.city}, {this.props.currentMarker.place.state}<br/>
                  {this.props.currentMarker.place.zip_code}
                 </Typography>
                {this.pinnedUsers(this.props.currentMarker, classes)}<br/>
                {totalReviews === '0 Friend Reviews' ?
                  <Button
                    variant="outlined"
                    disabled
                    size="large"
                    className={classes.button}>
                    No Friend Reviews
                  </Button> :
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    className={classes.button}>
                    All Reviews
                  </Button>}
                  {this.reviewsMap(this.props.currentMarker, classes)}
                <CardActions>
                  <Button
                    onClick={() => this.handleReviewClick(this.props.currentMarker)}
                    variant="contained"
                    color="secondary"
                    size="small"
                    aria-label="Edit">
                    <Icon>edit_icon</Icon>
                    Review
                  </Button>
                  <Divider/>
                </CardActions>
              </CardContent>
            </CardActionArea>
          </Card>
        </GridListTile>
        {this.props.openNewReviewForm ? <NewReviewForm pin={this.state.pinDetails}/> : null}
      </div>
    );
  }

} //end of PinDetailsCard Component

PinDetailsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentMarker: state.currentMarker,
    currentUser: state.currentUser,
    searchResults: state.searchResults,
    currentList: state.currentList,
    allPins: state.allPins,
    allReviews: state.allReviews,
    currentListPins: state.currentListPins,
    openNewReviewForm: state.openNewReviewForm
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleReviewForm: () => {
      dispatch({type:"OPEN_NEW_REVIEW_FORM"})
    },
    addNewPin: (payload) => {
      dispatch({type: "ADD_NEW_PIN", payload: payload})
    },
    setCurrentListPins: (payload) => {
      dispatch({type: "CURRENT_LIST_PINS", payload: payload})
    },
    setAllPins: (payload) => {
      dispatch({type:"SET_ALL_PINS", payload: payload})
    },
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PinDetailsCard));
