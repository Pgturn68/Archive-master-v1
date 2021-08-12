import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import { login } from '../utils/api'
import { useHistory } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'GitHub Repository '}
      <Link color='secondary' href='https://github.com/a-ukp/guilt-trip'>
        Guilt Trip
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(6, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured/?travel)', // Unsplash API using the Travel Search Term
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default function Login() {
  let history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const classes = useStyles();

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(user);
   
    login(user)
      .then((result) => {
        console.log('====================================');
        console.log(result.data[0]);
        console.log('====================================');
        localStorage.setItem("userId", result.data[0]._id)
        setUser({
          email: "",
          password: ""
        })
        history.push("/create");
      })
      .catch((err) => {
        console.log(`A signup error: ${err}`)
      })

  }

  const handleChange = (evt) => {
    evt.preventDefault()
    let field = evt.target.name;
    let value = evt.target.value
    setUser((prev) => {
      return { ...prev, [field]: value }
    })
  }


  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline /> {/* What is this pulling from? */}
      {/* Left Login Form */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography
            variant='h3'
            color='textSecondary'
            component='h2'
            gutterBottom
          >
            Guilt Trip Logo
          </Typography>

          <Avatar className={classes.avatar}>
            <FlightTakeoffIcon />
          </Avatar>

          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={handleChange}
            />

            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to="/signup" variant='body2'>
                  {'Need an account? Sign up'}
                </NavLink>
              </Grid>
            </Grid>
            
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      {/* Right Randomized Image Display */}
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}