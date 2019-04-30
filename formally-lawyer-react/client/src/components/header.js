import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from '../Logo.png';
import Modal from '@material-ui/core/Modal';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/es/Typography/Typography'
import { NavLink, Redirect } from 'react-router-dom'


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  bar: {
    backgroundColor: "#01BABB",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  button: {
    fontSize: "large",
    marginLeft: "5%",
    marginRight: "5%",
  },
  welcome: {
    color: "white",
    fontSize: "large",
    marginLeft: "5%",
    marginRight: "5%",
  },
  img: {
    marginLeft: "1%",
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  buttonModal: {
    padding: 0,
    color: "black"
  },

});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class Header extends React.Component {
  state = {
    open: false,
    signUpSignIn: true,
    email: '', password: '', error: false, errorMsg: '', redirect: false,
  };



  handleOpen = () => {
    this.setState({ open: true });
  };

  changeLogin = () => {
    this.setState({ signUpSignIn: !this.state.signUpSignIn })
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes } = this.props;
    const { signUpSignIn } = this.state;
    const { user } = this.props.userReducer;
    const { redirect } = this.props.redirectReducer;


    const signUp = (<div>
                      <SignUp />
                      Have an Account?
                      <Button size="small" onClick={this.changeLogin} className={classes.buttonModal}>Sign In</Button>
                    </div>
                    );

    const signIn = (<div>
                      <SignIn />
                      Need an Account?
                      <Button size="small" onClick={this.changeLogin} className={classes.buttonModal}>Sign Up</Button>
                    </div>
                  );


    const signInOptions = (<div className={classes.buttons}>
      <Button color="secondary" onClick={this.handleOpen} className={classes.button}>Sign In or Sign Up</Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open && !redirect}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>

          {signUpSignIn ? signIn : signUp}

        </div>
      </Modal>
    </div>);


    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Toolbar>
            <NavLink to="/home"> <img src={logo} className={classes.img}/></NavLink>

            {(user !== undefined) ? (<div className={classes.buttons}>
              <Typography className={classes.welcome}> Hello {user.first_name} {user.last_name} </Typography>
            </div>) : signInOptions }

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));