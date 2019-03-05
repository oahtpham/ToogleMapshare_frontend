import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import InfoIcon from '@material-ui/icons/Info';
import SearchResultsCard from '../Components/SearchResultsCard'
import PinDetailsCard from '../Components/PinDetailsCard'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import { connect } from 'react-redux'

const yelpLogo = 'https://www.logolynx.com/images/logolynx/87/8724b62c2a14845bafd396ce6620d534.png'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: 4,
  },
  gridList: {
    display: 'flex',
    width: 400,
    height: 550,
    textAlign:'left',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  avatar: {
    width: 40,
    height: 40
  },
  chip: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
    textColor: 'black',
  },
  subheader: {
    textAlign: 'center'
  }
});

class PinsContainer extends React.Component{

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper
          zdepth={3}
          elevation={1}
          square={true}>
          <div className={classes.root} >
            <GridList
              cellHeight={180}
              className={classes.gridList}>
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
                {this.props.currentMarker ? <PinDetailsCard /> : <SearchResultsCard />}
            </GridList>
          </div>
        </Paper>
      </div>
    );
    }
}

PinsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    currentMarker: state.currentMarker
  }
}

export default withStyles(styles)(connect(mapStateToProps)(PinsContainer));
