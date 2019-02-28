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
});

class PinsContainer2 extends React.Component{

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper zdepth={3} elevation={1} square={true}>
          <div className={classes.root} >
            <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto'}}>
                <ListSubheader component="div"><b>Search Results</b></ListSubheader>
              </GridListTile >
                <SearchResultsCard />
            </GridList>
          </div>
        </Paper>
      </div>
    );
    }
}

PinsContainer2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PinsContainer2);
