import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    width: 500,
    zIndex: 2,
    backgroundColor: 'red'
  },
  avatar: {
    width: 30,
    height: 30
  },
  chip: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
    textColor: 'gray'
  },
});

const redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [18, 30],
});

class LabelBottomNavigation extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <BottomNavigation className={classes.root}>
        <img
          className={classes.img}
          src='https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'/>
          <img
            className={classes.img}
            src='https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'/>
          <img
            className={classes.img}
            src='https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'/>
      </BottomNavigation>
    );
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LabelBottomNavigation);
