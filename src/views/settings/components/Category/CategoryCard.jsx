import React from 'react';
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ListItemText from "@mui/material/ListItemText";
import {useSelector, useDispatch} from "react-redux";
import {deleteCategory} from "../../../../Config/State/reducers/categorySlice";


const CategoryCard = ({ category: { id, icon, category_name, transaction_type, parent_category, description } }) => {
    const [actionMenuEl, setActionMenuEl] = React.useState(null);
    const dispatch = useDispatch();
    const handleActionMenu = (id, event) => {
        setActionMenuEl({ [id]: event.currentTarget });
    };
    const handleCloseActionMenu = () => {
        setActionMenuEl(null);
    };

    return (
        <React.Fragment>
            <ListItem sx={{ '&:hover': { bgcolor: 'hover.light' } }} secondaryAction={
                <React.Fragment>
                    <IconButton
                        aria-controls={`category-action-menu-${id}`}
                        onClick={(event)=>handleActionMenu(id, event)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id={`category-action-menu-${id}`}
                        anchorEl={actionMenuEl && actionMenuEl[id]}
                        keepMounted
                        open={Boolean(actionMenuEl && actionMenuEl[id])}
                        onClose={handleCloseActionMenu}
                    >
                        <MenuItem onClick={()=>dispatch(deleteCategory({ id: id }))}>Delete</MenuItem>
                    </Menu>
                </React.Fragment>}>
                <ListItemAvatar>
                    <Avatar>
                        <LocalOfferIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${category_name} ${transaction_type}`} secondary={parent_category} />
            </ListItem>
        </React.Fragment>
    );
}

export default CategoryCard;