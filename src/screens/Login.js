import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const { history } = props;
    const [user, setUser] = useState({
        username: '',
        password: '',
    })

    const routeTo = (routeName, props) => {
        history.push(routeName, props);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (!user.username || !user.password) {
            alert('Username and Password required')
            return;
        }
        localStorage.setItem('calibraint_user', JSON.stringify({ ...user, isLogined: true }));
        routeTo('dashboard', {});
    };

    useEffect(() => {
        let userDetailsString = localStorage.getItem('calibraint_user') || "";
        let userDetails = userDetailsString != '' ? JSON.parse(userDetailsString) : {};
        if (userDetails.isLogined) {
            routeTo('dashboard', {})
        }
    }, [])

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Email Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => handleChange(e)}
                    autoComplete="current-password"
                />
                <Button
                    onClick={(e) => handleLogin(e)}
                    fullWidth
                    disabled={user.username == '' || user.password == ''}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
          </Button>
            </div>
        </Container>
    );
}

export default Login;