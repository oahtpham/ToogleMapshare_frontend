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
import GridListTile from '@material-ui/core/GridListTile';

import { connect } from 'react-redux'

const placesURL = 'http://localhost:3000/api/v1/places'
const pinsURL ='http://localhost:3000/api/v1/pinned_locations'

const styles = {
  card: {
    maxWidth: 400,
  },
  media: {
    height: 270,
  },
};

class SearchResultsCard extends React.Component {

  mapPinnedLocations = (location) => {
    return this.props.allPins.filter(pin => pin.place.yelp_id === location.id)
  }

  pinnedDetails = () => {
    console.log(this.props.searchResults);
    console.log(this.props.allPins)
    console.log(this.props.currentList)
    console.log(this.mapPinnedLocations(this.props.searchResults[0]))
    const { classes } = this.props;
      return this.props.searchResults.map(location => {
        return (
          <GridListTile key={location.id} cols={3} >
            <Card className={classes.card} >
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
                  <Typography gutterBottom variant="h5" component="h2">
                    <a href={location.url} target="_blank">{location.name}</a>
                  </Typography>
                  <Typography component="p">
                    {location.price}
                    {location.rating}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {this.mapPinnedLocations(location).filter(pin => pin.place.yelp_id === location.id && pin.user.id === this.props.currentList.user.id).length !== 0 ?
                <Button disabled className={classes.button}>
                  Already Pinned!
                </Button>
                   :
                <Button variant="contained" color="primary" size="small" aria-label="Add">
                  <AddIcon/>
                  Pin
                </Button>
                }
                <Button variant="contained" color="secondary" size="small" aria-label="Edit">
                  <Icon>edit_icon</Icon>
                  Review
                </Button>
              </CardActions>
            </Card>
          </GridListTile>
        )
      })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.currentList ? this.pinnedDetails() : null }
      </div>
    );
  }

} //end of PopUpCard Component

SearchResultsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentMarker: state.currentMarker,
    searchResults: state.searchResults,
    currentList: state.currentList,
    allPins: state.allPins
  }
}

export default withStyles(styles)(connect(mapStateToProps)(SearchResultsCard));
