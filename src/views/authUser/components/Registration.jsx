import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useSelector, useDispatch} from "react-redux";
import {registerUser} from "../../../Config/State/reducers/userSlice";


export default function Registration() {
    const { isLoading, errors, isLoggedIn } = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const [registerFormData, setRegisterFormData] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const history = useNavigate();
    const handleFormInput = (event) =>{
        setRegisterFormData({ ...registerFormData, [event.target.name]: event.target.value });
    }
    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        dispatch(registerUser(registerFormData));
    };

    React.useEffect(()=>{
        if(!isLoading && isLoggedIn){
            history('/');
        }
    },[isLoading, isLoggedIn, history]);

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
                        Register Now
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    value={registerFormData.first_name}
                                    onChange={handleFormInput}
                                    error={errors && 'first_name' in errors}
                                    helperText={errors && 'first_name' in errors ? errors.first_name[0] : null}
                                    required
                                    fullWidth
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Last Name"
                                    name="last_name"
                                    value={registerFormData.last_name}
                                    onChange={handleFormInput}
                                    error={errors && 'last_name' in errors}
                                    helperText={errors && 'last_name' in errors ? errors.last_name[0] : null}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    value={registerFormData.email}
                                    onChange={handleFormInput}
                                    error={errors && 'email' in errors}
                                    helperText={errors && 'email' in errors ? errors.email[0] : null}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={registerFormData.password}
                                    onChange={handleFormInput}
                                    error={errors && 'password' in errors}
                                    helperText={errors && 'password' in errors ? errors.password[0] : null}
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={handleRegisterSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    { "Already have an account? Try to Login" }
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
    );
}