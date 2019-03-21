import React from 'react';
import { connect } from 'react-redux'
import NewReviewForm from './NewReviewForm'

// material UI style imports
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
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Icon from '@material-ui/core/Icon';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTile from '@material-ui/core/GridListTile';
import StarRatings from 'react-star-ratings'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const yelpLogo = 'https://www.logolynx.com/images/logolynx/87/8724b62c2a14845bafd396ce6620d534.png'
const placesURL = 'https://tooglemapshare-app-api.herokuapp.com/api/v1/places'
const pinsURL ='https://tooglemapshare-app-api.herokuapp.com/api/v1/pinned_locations'
const listsURL = 'https://tooglemapshare-app-api.herokuapp.com/api/v1/lists'

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


class SearchResultsCard extends React.Component {

  state = {
    showReviews: false,
    searchPinDetails: null
  }

  filterPinnedLocations = (location) => {
    return this.props.allPins.filter(pin => pin.place.yelp_id === location.id)
  }

  currentMarker = (location) => {
    this.props.setMarker(location)
  }

  highlightMarker = (location) => {
    this.props.setMarker(location)
  }

  handlePinClick = (location) => {
    fetch(placesURL, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        yelp_id: location.id,
        name: location.name,
        address: location.location.address1,
        city: location.location.city,
        state: location.location.state,
        zip_code: location.location.zip_code,
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
        img_url: location.image_url,
        yelp_url: location.url,
        yelp_rating: location.rating,
        price: location.price
      })
    })
    .then(resp => resp.json())
    .then(() => {
      fetch(pinsURL, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: 1,
          list_id: this.props.currentList.id,
          yelp_id: location.id
        })
      })
      .then(resp => resp.json())
      .then(obj => {
        this.props.addNewPin(obj)
        fetch(listsURL)
        .then(resp => resp.json())
        .then(lists => {
          const userLists = lists.filter(list => list.user.id === this.props.currentUser)
          this.props.setAllLists(userLists)
        })
      })
    })
  }

  handleDeletePin = (location) => {
    const deletePin = this.props.currentListPins.find(pin => pin.place.yelp_id === location.id)
    fetch(`${pinsURL}/${deletePin.id}`, { method: "DELETE" })
    .then(resp => {
      if (resp.ok) {
        const newAllPins = this.props.allPins.filter(pin => pin.id !== deletePin.id)
        this.props.setAllPins(newAllPins)
        const newCurrentListPins = this.props.currentListPins.filter(pin => pin.id !== deletePin.id)
        this.props.setCurrentListPins(newCurrentListPins)
      }
    })
  }

  handleReviewClick = (location) => {
    this.props.toggleReviewForm()
    this.setState({
      searchPinDetails: location
    })
  }


  pinnedUsers = (location, classes) => {
    const notUserPins = this.filterPinnedLocations(location).filter(pin => pin.user.id !== this.props.currentList.user.id)
    if (this.filterPinnedLocations(location).length >= 1 && notUserPins.length !== 0) {
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

  handleClickCardMapZoom = (location) => {
    this.props.setMapLocation({mapLocation: [location.coordinates.latitude, location.coordinates.longitude], mapZoom: 15})
    this.props.addSearchCard(location)
  }

  reviewsMap = (location, classes) => {
    if (this.state.showReviews) {
      const restaurantReviews = this.props.allReviews.filter(review => review.place.yelp_id === location.id)
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
  }

  displayItem = () => {
    if (this.props.currentMarker) {
      return this.props.searchResults.filter(result => result.id === this.props.currentMarker.place.yelp_id)
    } else {
    return this.props.searchResults
    }
  }

  searchCards = () => {
    const { classes } = this.props;
      return this.displayItem().map(location => {
        const totalReviews = `${this.props.allReviews.filter(review => review.place.yelp_id === location.id).length} Review(s)`
        return (
          <GridListTile
            key={location.id}
            cols={3}>
            <Card
              className={classes.card}
              onClick={() => this.handleClickCardMapZoom(location)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Pinned Location"
                  className={classes.media}
                  height="180"
                  width="100"
                  image={location.image_url}
                  title={location.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom="true"
                    variant="h6"
                    component="h5">
                    <a href={location.url} target="_blank">{location.name}</a>
                  </Typography>
                    <font size='3'>{location.price ? location.price : null}</font><br/><br/>
                    <StarRatings
                     rating={location.rating}
                     starRatedColor="orange"
                     numberOfStars={5}
                     starDimension="16px"
                     starSpacing="1px"
                     name='rating'
                   /><br/><br/>
                   <Typography
                    gutterbottom="true"
                    variant='body1'>
                    {location.location.address1 ? location.location.address1 : null}<br/>
                    {location.location.city}, {location.location.state}<br/>
                    {location.location.zip_code ? location.location.zip_code : null}<br/>
                   </Typography>
                  {this.pinnedUsers(location, classes)}<br/>
                  {totalReviews === '0 Review(s)' ?
                    <Button
                      variant="outlined"
                      disabled
                      size="large"
                      className={classes.button}>
                      No Reviews
                    </Button> :
                    <Button
                      onClick={this.handleShowReviewsClick}
                      variant="outlined"
                      color="secondary"
                      size="large"
                      className={classes.button}>
                      {this.state.showReviews ? 'Hide reviews' : totalReviews}
                    </Button>
                  }
                  {this.reviewsMap(location, classes)}
                  <CardActions>
                    {this.props.currentListPins.filter(pin => pin.place.yelp_id === location.id).length !== 0 ?
                    <Button
                      color="gray"
                      variant="contained"
                      size="small"
                      onClick={() => this.handleDeletePin(location)}>
                      <RemoveIcon/>
                      Unpin
                    </Button>
                       :
                    <Button
                      variant="contained"
                      color="primary" size="small"
                      aria-label="Add"
                      onClick={() => this.handlePinClick(location)}>
                      <AddIcon/>
                      Pin
                    </Button>
                    }
                    <Button
                      onClick={() => this.handleReviewClick(location)}
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
        )
      })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridListTile
        key="Subheader"
        cols={2}
        style={{ height: 'auto'}}>
        <ListSubheader
          className={classes.subheader}
          component="div">
        <Chip
          avatar={
            <Avatar
              alt='yelpLogo'
              src={yelpLogo}
              className={classes.avatar}/>}
            label='Results'
            className={classes.chip}
         />
        </ListSubheader>
        </GridListTile >
        <GridListTile>
          {this.props.currentList ? this.searchCards() : null}
        </GridListTile>
        {this.props.openNewReviewForm ? <NewReviewForm searchPin={this.state.searchPinDetails}/> : null}
      </div>
    );
  }

} //end of searchResultsCard Component

SearchResultsCard.propTypes = {
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
    openNewReviewForm: state.openNewReviewForm,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleReviewForm: () => {
      dispatch({type:"OPEN_NEW_REVIEW_FORM"})
    },
    togglePinForm: () => {
      dispatch({type: "OPEN_NEW_PIN_FORM"})
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
    setAllLists: (payload) => {
      dispatch({type:"SET_ALL_LISTS", payload: payload})
    },
    setMarker: (payload) => {
      dispatch({type:"CURRENT_MARKER", payload: payload})
    },
    setMapLocation: (payload) => {
      dispatch({type: "SET_MAP_LOCATION", payload: payload})
    },
    addSearchCard: (payload) => {
      dispatch({type: "ADD_SEARCH_CARD", payload: payload})
    },
    setCurrentList: (payload) => {
      dispatch({type:"CURRENT_LIST", payload: payload})
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SearchResultsCard));
