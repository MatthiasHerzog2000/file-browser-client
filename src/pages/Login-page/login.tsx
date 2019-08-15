import React, { SyntheticEvent } from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import  {Paper, createStyles, Theme, WithStyles, withStyles, CssBaseline, Avatar, Typography, FormControl, InputLabel, Input, FormControlLabel, Checkbox, Button}  from '@material-ui/core';
import { ILoginState } from './ILoginState';
import { LoginService } from '../../utils/login-service';
import { RouteComponentProps } from 'react-router';
import { SignIn } from '../../models/signIn';
import SnackbarComponent from '../../components/snackBar-component/snackbarComponent';
import { AuthService } from '../../utils/auth-service';
import { PathService } from '../../utils/path-service';
const styles = (theme: Theme) => createStyles({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
export interface ILoginProps extends WithStyles< typeof styles >, RouteComponentProps<void> {}
class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      open: false,
      message: '',
      type: 'error',
      handleClose : () => this.handleClose()
    }
  }
  handleClose = () => {
    this.setState({open: !this.state.open});
  }
  submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
    console.log(this.state)
    const data: SignIn = await LoginService.login(this.state.username, this.state.password) as SignIn;
    console.log(data);
    if(data.success) {
      localStorage.setItem('token', data.token as string);
      localStorage.setItem('user', JSON.stringify(data.user));
      AuthService.Instantiate();
      const path: any = await PathService.getInitialPath();
      localStorage.setItem('initPath', path.initPath);
      this.props.history.push(path.initPath);
      console.log(this.props);
    } else {
      this.setState({open: true, message: data.err, type: 'error'})
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={(e) => this.submit(e)} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" name="username" onChange={e => this.setState({username: e.currentTarget.value})} autoComplete="username" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" onChange={e => this.setState({password: e.currentTarget.value})} type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
      </Paper>
      <SnackbarComponent handleClose={this.state.handleClose} message={this.state.message} type={this.state.type} open={this.state.open}></SnackbarComponent>
    </main>
    )
  }
}

export default withStyles(styles)(Login)
