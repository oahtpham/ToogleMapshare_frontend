import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'
import { Redirect, Link } from "react-router-dom"
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import SuccessfulPinAlert from '../SuccessfulPinAlert'

const pinsURL ='http://localhost:3000/api/v1/pinned_locations'

class NewPinForm extends React.Component {

  state = {
    listSelection: null
  }

  handleOnChange = (e) => {
    this.setState({
      listSelection: e.target.value
    })
  }

  mapLists = () => {
    return this.props.allLists.map(list => {
      return <option value={list.id}>{list.title}</option>
    })
  }

  handleSubmit = () => {
    fetch(pinsURL, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: 1,
        list_id: parseInt(this.state.listSelection),
        yelp_id: this.props.currentMarker.place.yelp_id
      })
    })
    .then(resp => resp.json())
    .then(() => {
      this.props.toggleForm()
      this.props.toggleAlertForm()
    })
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.toggleForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle disableTypography>
            {this.props.currentMarker ?
              <h3>{this.props.currentMarker.place.name}</h3>
              : null}
            {this.props.currentMarker ? <img className="locationImage" src={this.props.currentMarker.place.img_url}/> : null}<br/><br/>
            {this.props.currentMarker.place.address}<br/>
            {this.props.currentMarker.place.city}, {this.props.currentMarker.place.state}<br/> {this.props.currentMarker.place.zip_code}
          </DialogTitle>
          <Divider style={{width: '500px'}}/>
          <DialogContent >
            <h4>Please select the list to add the following pin to:</h4>
            <FormControl variant="filled" >
            <InputLabel htmlFor="filled-age-native-simple">List</InputLabel>
            <Select
              native
              value={this.state.age}
              onChange={this.handleOnChange}
              input={<FilledInput name="age" id="filled-age-native-simple" />}
            >
              <option value="" />
            {this.mapLists()}
            </Select>
          </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
            onClick={this.props.toggleForm}
            color="primary">
              Close
            </Button>
            <Button
              onClick={this.handleSubmit}
              color="primary">
              Pin to List
            </Button>
          </DialogActions>
        </Dialog>
        <SuccessfulPinAlert/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.openNewPinForm,
    currentMarker: state.currentMarker,
    allLists: state.allLists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleForm: () => {
      dispatch({type: "OPEN_NEW_PIN_FORM"})
    },
    toggleAlertForm: () => {
      dispatch({type: "OPEN_SUCCESSFUL_PIN_ALERT"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPinForm)
