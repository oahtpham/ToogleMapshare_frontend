import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class WelcomeAlertBox extends React.Component {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Welcome!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              All pins on the map are pinned locations set by you (green) or your friends (pink).
              <br/>
              <br/>
              Click on pins for location details or head to the Menu on the top left to create a new list or to access any of your current lists.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close Box
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default WelcomeAlertBox;
