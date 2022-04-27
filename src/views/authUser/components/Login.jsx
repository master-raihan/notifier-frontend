import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {connect} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {loginUser} from "../../../Config/State/reducers/userSlice";

function Login(props) {
    const { login, user } = props;
    const [loginFormData, setLoginFormData] = React.useState({
       email: '',
       password: ''
    });
    const history = useNavigate();

    const handleFormInput = (event) =>{
        setLoginFormData({ ...loginFormData, [event.target.name]: event.target.value });
    }

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        login(loginFormData);
    };

    React.useEffect(()=>{
        if(!user.isLoading && user.isLoggedIn){
            history('/');
        }
    },[user.auth, user.isLoading, user.isLoggedIn, history]);

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={loginFormData.email}
                    onChange={handleFormInput}
                    error={user.errors && 'email' in user.errors}
                    helperText={user.errors && 'email' in user.errors ? user.errors.email[0] : null}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={loginFormData.password}
                    onChange={handleFormInput}
                    error={user.errors && 'password' in user.errors}
                    helperText={user.errors && 'password' in user.errors ? user.errors.password[0] : null}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Log In
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link to="/registration" variant="body2">
                            {"Don't have an account? Create New Account"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
    );
}

const mapStateToProps = (state) =>{
    return { user: state.user }
}

const mapDispatchToProps = (dispatch) =>{
    return { login: (payload)=> dispatch(loginUser(payload)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);