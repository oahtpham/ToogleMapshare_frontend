// import React from 'react';
// import PropTypes from 'prop-types';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import withStyles from '@material-ui/core/styles/withStyles';
// import { connect } from 'react-redux'
//
// const styles = theme => ({
//   main: {
//     width: 'auto',
//     display: 'block', // Fix IE 11 issue.
//     marginLeft: theme.spacing.unit * 2,
//     marginRight: theme.spacing.unit * 2,
//     [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//       width: 400,
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     },
//   },
//   paper: {
//     marginTop: theme.spacing.unit * 8,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
//   },
//   avatar: {
//     margin: theme.spacing.unit,
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing.unit,
//   },
//   submit: {
//     marginTop: theme.spacing.unit * 3,
//   },
// });
//
// const classes = {
//   main: "SignUp-main-184",
//   paper: "SignUp-paper-185",
//   avatar: "SignUp-avatar-186",
//   form: "SignUp-form-187",
//   submit: "SignUp-submit-188"}
//
// class SignUp extends React.Component {
//
//   state = {
//     username: '',
//     firstname: '',
//     lastname: '',
//     email: '',
//     password: '',
//     confirmation: '',
//     profilePhoto: ''
//   }
//
//   handleChangeInput = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }
//
//   handleOnSubmit =  (event) => {
//     event.preventDefault()
//     if (this.state.password === this.state.confirmation){
//       fetch('http://localhost:3000/api/v1/users', {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//           username: this.state.username,
//           first_name: this.state.firstname,
//           last_name: this.state.lastname,
//           email: this.state.email,
//           password: this.state.password,
//           img_url: this.state.profilePhoto
//         })
//       })
//       .then(response => response.json())
//       .then(obj => {
//         console.log(obj)
//         // this.props.setUser(obj)
//       })
//     } else {
//       alert("Passwords do not match.")
//     }
//   }
//
//   render() {
//     return (
//       <main className={classes.main}>
//         <CssBaseline />
//         <Paper className={classes.paper}>
//           <Avatar className={classes.avatar}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <form className={classes.form} onChange={this.handleChangeInput} onSubmit={this.handleOnSubmit}>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel type="text">Username</InputLabel>
//               <Input id="sign-up-username" name="username" autoFocus />
//             </FormControl>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel type="text">First Name</InputLabel>
//               <Input id="firstname" name="firstname" autoFocus />
//             </FormControl>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel type="text">Last Name</InputLabel>
//               <Input id="lastname" name="lastname" autoFocus />
//             </FormControl>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel htmlFor="email">Email Address</InputLabel>
//               <Input id="sign-up-email" name="email" autoComplete="email" autoFocus />
//             </FormControl>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel htmlFor="password">Password</InputLabel>
//               <Input name="password" type="password" id="sign-up-password" autoComplete="current-password" />
//             </FormControl>
//             <FormControl margin="normal" required fullWidth>
//               <InputLabel htmlFor="password">Password Confirmation</InputLabel>
//               <Input name="confirmation" type="password" id="password-confirmation" autoComplete="current-password" />
//             </FormControl>
//             <FormControl margin="normal" fullWidth>
//               <InputLabel type="text">Image URL</InputLabel>
//               <Input id="profile-photo" name="profilePhoto" autoFocus />
//             </FormControl>
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.submit}
//             >
//               Sign in
//             </Button>
//           </form>
//         </Paper>
//       </main>
//     );
//   }
// }
//
// SignUp.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
//
// // const mapDispatchToProps = {
// //   setUser: (payload) => ({type: 'CURRENT_USER', payload: payload})
// // }
//
// export default withStyles(styles)(SignUp);
