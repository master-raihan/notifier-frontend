import React from 'react';
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PaidIcon from '@mui/icons-material/Paid';
import ListItemText from "@mui/material/ListItemText";
import { diffDays } from '../../../../helper/utility/date';
import { numberWithCommas } from '../../../../helper/utility/formatter';

const BillCard = ({ bill }) =>{

    return (
        <React.Fragment>
            <Divider component="li"/>
            <ListItem sx={{ '&:hover': { bgcolor: 'hover.light' } }}>
                <ListItemAvatar>
                    <Avatar>
                        <PaidIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${bill.payee} - ${bill.currency} ${numberWithCommas(bill.amount)}`} secondary={`Due in ${diffDays(bill.due_date)} days`} />
            </ListItem>
        </React.Fragment>
    );

}

export default BillCard;