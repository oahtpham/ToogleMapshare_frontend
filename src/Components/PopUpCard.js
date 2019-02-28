import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import { connect } from 'react-redux'

const placesURL = 'http://localhost:3000/api/v1/places'
const pinsURL ='http://localhost:3000/api/v1/pinned_locations'

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class PopUpCard extends React.Component {

  function handlePinClick() {
    fetch(placesURL, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
          yelp_id: props.currentMarker.id,
          name: props.currentMarker.name,
          address: props.currentMarker.location.display_address.join(' '),
          latitude: props.currentMarker.coordinates.latitude,
          longitude: props.currentMarker.coordinates.longitude,
          img_url: props.currentMarker.image_url,
          yelp_url:props.currentMarker.url,
          yelp_rating: props.currentMarker.rating,
          price: props.currentMarker.price
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
          list_id: props.currentList.id,
          yelp_id: props.currentMarker.id
        })
      })
    })
  }

  function handleReviewClick() {
    props.toggleReviewForm()
  }

  render() {
    const { classes } = this.props;
    return (
    // <Card className={classes.card}>
    //   <CardActionArea>
    //     <CardMedia
    //       className={classes.media}
    //       image={props.currentMarker.place.img_url}
    //       title={props.currentMarker.place.name}
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="h2">
    //         {props.currentMarker.place.name}
    //       </Typography>
    //       <Typography component="p">
    //         {props.currentMarker.place.price}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button onClick={handlePinClick} variant="contained" color='primary' size="small" aria-label="Add">
    //       <AddIcon />
    //         Pin
    //       </Button>
    //     <Button onClick={handleReviewClick} variant="contained" color="secondary" size="small" aria-label="Edit">
    //       <Icon>edit_icon</Icon>
    //        Review
    //     </Button>
    //   </CardActions>
    // </Card>
    );
  }

} //end of PopUpCard Component

PopUpCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentMarker: state.currentMarker
  }
}

export default withStyles(styles)(connect(mapStateToProps)(PopUpCard));
