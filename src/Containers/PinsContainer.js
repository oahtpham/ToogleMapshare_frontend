// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import GridList from '@material-ui/core/Grid';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import Typography from '@material-ui/core/Typography';
// import DetailsCard from '../Components/DetailsCard'
//
// const styles = {
//   div:{
//     display: 'flex',
//     flexDirection: 'row wrap',
//     paddingTop: 2
//   },
//   paperLeft:{
//     flex: 5,
//     height: 550,
//     width: 400,
//     textAlign: 'center',
//     padding: 10,
//   },
//   gridList: {
//     width: 500,
//     height: 450,
//   },
// };
//
// class PinsContainer extends React.Component {
//
//   render() {
//     const { classes } = this.props
//     return (
//       <div className="pinsContainer">
//         <div style={styles.div}>
//           <GridList className={classes.gridList} item xs={12} sm={6}>
//             <Paper zdepth={3} style={styles.paperLeft}>
//               <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
//                 <ListSubheader component="div">December</ListSubheader>
//               </GridListTile>
//             </Paper>
//           </GridList>
//         </div>
//       </div>
//     )
//   }
// }
//
// PinsContainer.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
//
// export default withStyles(styles)(PinsContainer);
