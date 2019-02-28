import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class SuccessfulPinAlert extends React.Component {


  handleClick = () => {
    this.props.toggleForm()
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClick}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Successfully pinned into your list!
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.successfulPinAlert,
    currentMarker: state.currentMarker
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleForm: () => {
      dispatch({type: "OPEN_SUCCESSFUL_PIN_ALERT"})
    }
  }
}

export default SuccessfulPinAlert;
