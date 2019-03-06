import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DetailsIcon from '@material-ui/icons/Details';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Switch from '@material-ui/core/Switch';
import Tooltip from '@material-ui/core/Tooltip';



import { connect } from 'react-redux'


//nested_list
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import NewListForm from './Components/NewListForm'


const listsURL = 'http://localhost:3000/api/v1/lists'
const pinsURL ='http://localhost:3000/api/v1/pinned_locations'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  avatar: {
  margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 10,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class Navigation extends React.Component {
  state = {
    open: false,
    latitude: null,
    longitude: null,
    searchLocation: null,
    openNested: false,
    toggleSwitch: true,
  };

  componentDidMount() {
    fetch(listsURL)
    .then(resp => resp.json())
    .then(obj => {
      const userLists = obj.filter(list => list.user.id === this.props.currentUser)
      this.props.setAllLists(userLists)
    })
  }

  handleSwitch = () => {
    this.setState({
      toggleSwitch: !this.state.toggleSwitch
    })
    if (!this.state.toggleSwitch) {
      this.props.setShowPins(this.props.allPins)
    } else {
      this.props.setShowPins([])
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleNewListClick = () => {
    this.props.toggleForm()
    this.setState({
      open: false
    })
  }

  handleAllListsClick = () => {
    this.setState(state => ({
      openNested: !state.openNested
    }));
  };

  handleListClick = (list) => {
    this.props.setCurrentList(list)
    const listPins = list.pinned_locations.map(pin => pin.id)
    const pinDetails = this.props.allPins.filter(pin => listPins.includes(pin.id))
    this.props.setCurrentListPins(pinDetails)
    this.handleDrawerClose()
    this.props.setSearchTerm("")
    this.props.setMapLocation({mapLocation: [list.latitude, list.longitude], mapZoom: 13})
  }

  handleSearchInput = (event) => {
    this.setState({
      searchLocation: event.target.value
    })
  }

  handleSearch = (e) => {
    if (e.key === "Enter") {
      // this.setState(STATERESET)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.searchLocation}&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}`)
      .then(response => response.json())
      .then(geolocation => {
        this.setState({
          latitude: geolocation.results[0].geometry.location.lat,
          longitude: geolocation.results[0].geometry.location.lng
        })
      })
      .then(() => {
        this.props.setMapLocation({mapLocation:[this.state.latitude, this.state.longitude], mapZoom: 13 })
      })
    }
  }

  homeClick = () => {
    this.props.clearList()
    this.props.setResults([])
    this.props.setMapLocation({mapLocation: [39.047695, -95.578568], mapZoom: 5})
    this.props.setMarker(null)
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap>
              {this.props.currentList ? this.props.currentList.title : 'shareIt'}
            </Typography>
            <Tooltip title={this.state.toggleSwitch ? "Hide Friends' Pins" : "Show Friends' Pins"}>
              <Switch
                checked={this.state.toggleSwitch}
                onChange={this.handleSwitch}
              />
            </Tooltip>
            <div className={classes.grow} />
            <div className={classes.search} >
             <div className={classes.searchIcon}>
               <SearchIcon />
             </div>
             {this.props.currentList ?
              <Button
                onClick={this.homeClick}
                variant="contained"
                color="secondary"
                size='small'
                className={classes.button}>
                <HomeIcon className={classes.rightIcon} />
              </Button> :
             <InputBase
               placeholder="Search Location"
               onKeyDown={this.handleSearch}
               onChange={this.handleSearchInput}
               classes={{
                 root: classes.inputRoot,
                 input: classes.inputInput,
               }}
             />}
           </div>
            <IconButton
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar
                alt="User"
                src="https://media.licdn.com/dms/image/C4D03AQElaK3Pw6r77g/profile-displayphoto-shrink_200_200/0?e=1556755200&v=beta&t=OeJHYI4ySZDH9Hp4SSkAbCX1CjJ4jwl0DEpti3p_OYQ" className={classes.smallAvatar} />
          </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
              <ListItem
                button
                key="createList"
                onClick={this.handleNewListClick}>
                <ListItemIcon><AddBoxIcon /></ListItemIcon>
                <ListItemText primary="Create New List" />
              </ListItem>
              <NewListForm />
          </List>
          <Divider />
          <List>
            <ListItem
              button
              key='All Lists'
              onClick={this.handleAllListsClick}>
              <ListItemIcon>
                <DetailsIcon />
              </ListItemIcon>
              <ListItemText primary='All Lists' />
              {this.state.openNested ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.openNested}
              timeout="auto"
              unmountOnExit>
              <List
                component="div"
                disablePadding>
                {this.props.allLists.map(list => (
                  <ListItem
                    onClick={() => this.handleListClick(list)}
                    button
                    className={classes.nested}>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={list.title}/>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </Drawer>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
  return {
    currentList: state.currentList,
    allLists: state.allLists,
    currentUser: state.currentUser,
    allPins: state.allPins,
    currentListPins: state.currentListPins
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleForm: () => {
      dispatch({type: "OPEN_NEW_LIST_FORM"})
    },
    setMapLocation: (payload) => {
      dispatch({type: "SET_MAP_LOCATION", payload: payload})
    },
    setCurrentList: (payload) => {
      dispatch({type:"CURRENT_LIST", payload: payload})
    },
    setAllLists: (payload) => {
      dispatch({type:"SET_ALL_LISTS", payload: payload})
    },
    setShowPins: (payload) => {
      dispatch({type:"SET_SHOW_PINS", payload: payload})
    },
    setCurrentListPins: (payload) => {
      dispatch({type: "CURRENT_LIST_PINS", payload: payload})
    },
    setSearchTerm: (payload) => {
      dispatch({type: 'SET_SEARCH_TERM', payload: payload})
    },
    clearList: () => {
      dispatch({type: "CLEAR_LIST"})
    },
    setResults: (payload) => {
      dispatch({type: 'CURRENT_SEARCH_RESULTS', payload: payload})
    },
    setMarker: (payload) => {
      dispatch({type: "CURRENT_MARKER", payload: payload})
    }
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Navigation));
