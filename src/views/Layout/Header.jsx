import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/LinearProgress';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import {checkToken, logoutUser} from "../../Config/State/reducers/userSlice";
import {connect} from "react-redux";
import {getAllNotification} from "../../Config/State/reducers/notificationSlice";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Header(props) {
    const { onDrawerToggle, pageHeading, logout, user, checkToken, notification, getAllNotification } = props;
    const [actionMenuAnchorEl, setActionMenuAnchorEl] = React.useState(null);
    const [isLogout, setIsLogout] = React.useState(false);
    const open = Boolean(actionMenuAnchorEl);
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const openNotification = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleActionMenu = (event) => {
        setActionMenuAnchorEl(event.currentTarget);
    };
    const handleActionMenuClose = () => {
        setActionMenuAnchorEl(null);
    };
    const handleUserLogout = () => {
      logout();
      setIsLogout(true);
    };

    React.useEffect(()=>{
        checkToken();
        if(!user.isLoggedIn && isLogout){
            history('/login');
        }
    },[user.isLoggedIn, history, checkToken, isLogout]);

    React.useEffect(()=>{
        getAllNotification()
    },[]);

    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs>
                            <Typography sx={{ textTransform: "uppercase" }} color="inherit" variant="h5" component="h1">
                                {pageHeading}
                            </Typography>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Tooltip title={notification.notifications.length > 0 ? `Notifications • ${notification.notifications.length} new notifications` : "Notifications • No notifications"}>
                                <IconButton onClick={handleClickListItem} color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton
                                onClick={handleActionMenu}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                            </IconButton>
                        </Grid>
                        { notification.notifications.length > 0 ? <Menu
                            id="lock-menu"
                            anchorEl={anchorEl}
                            open={openNotification}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'lock-button',
                                role: 'listbox',
                            }}
                        >
                            {notification.notifications.map((notificationEl, index) => (
                                <MenuItem
                                    key={index}
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccessTimeIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    {`You have ${JSON.parse(notificationEl.data).amount} due to ${JSON.parse(notificationEl.data).payee} on ${JSON.parse(notificationEl.data).due_date}`}
                                </MenuItem>
                            ))}
                        </Menu> : <div/>}
                        <Menu
                            anchorEl={actionMenuAnchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleActionMenuClose}
                            onClick={handleActionMenuClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            {
                                user.isLoading ? <LinearProgress sx={{ height: '1.4px' }} /> : <Divider />
                            }
                            <MenuItem onClick={handleUserLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
    pageHeading: PropTypes.string.isRequired
};

const mapStateToProps = (state) =>{
    return { user: state.user, notification: state.notification }
}

const mapDispatchToProps = (dispatch) =>{
    return { logout: (payload)=> dispatch(logoutUser(payload)), checkToken: ()=> dispatch(checkToken()), getAllNotification: ()=> dispatch(getAllNotification()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);