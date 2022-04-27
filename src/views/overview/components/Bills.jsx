import React from 'react';
import ThemeLayout from "../../Layout/ThemeLayout";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';
import {useSelector, useDispatch} from "react-redux";
import {deleteBill, getAllBill, resetBillErrors} from "../../../Config/State/reducers/billSlice";
import Chip from "@mui/material/Chip";
import AddIcon from '@mui/icons-material/Add';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import BillForm from "./Bill/BillForm";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {dateFormat} from "../../../helper/utility/date";
import {numberWithCommas} from "../../../helper/utility/formatter";


const Bills = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openBillForm, setOpenBillForm] = React.useState(false);
    const [selectedBill, setSelectedBill] = React.useState({});
    const [isEditable, setIsEditable] = React.useState(false);
    const {isLoading, bills} = useSelector((state)=>state.bill);
    const dispatch = useDispatch();

    const [actionMenuEl, setActionMenuEl] = React.useState(null);

    const handleActionMenu = (id, event) => {
        setActionMenuEl({ [id]: event.currentTarget });
    }

    const handleCloseActionMenu = () => {
        setActionMenuEl(null);
    }

    const handleBillFormClose = () => {
        setSelectedBill({});
        dispatch(resetBillErrors());
        setIsEditable(false);
        setOpenBillForm(false);
    }

    const handleBillFormOpen = () => {
        setSelectedBill({});
        setIsEditable(false);
        setOpenBillForm(true);
    }

    const handleEditBill = (bill) => {
        setActionMenuEl(null);
        setSelectedBill(bill);
        setIsEditable(true);
        setOpenBillForm(true);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    React.useEffect(()=>{
        dispatch(getAllBill());
    },[dispatch]);

    return (<ThemeLayout pageHeading={"Bills"}>
        <Grid container>
            <Grid item xs={12} sm={12}>
                <Button onClick={handleBillFormOpen} startIcon={<AddIcon/>} sx={{ float: 'right', marginTop: 3, marginRight: 3 }} variant="contained" color="primary">Add New Bill</Button>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Paper sx={{ width: '97%', overflow: 'hidden', margin: 'auto', marginTop: '20px' }}>
                    <TableContainer sx={{ maxHeight: 470}}>
                        <Table size="small" stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{minWidth: 170}}>
                                        Payee
                                    </TableCell>
                                    <TableCell sx={{minWidth: 50}} align="center">
                                        Amount
                                    </TableCell>
                                    <TableCell sx={{minWidth: 70}}>
                                        Due Date
                                    </TableCell>
                                    <TableCell sx={{minWidth: 40}} align="center">
                                        Transaction Type
                                    </TableCell>
                                    <TableCell sx={{minWidth: 40}}>
                                        Notification
                                    </TableCell>
                                    <TableCell align="center" sx={{minWidth: 17}}>
                                        Paid
                                    </TableCell>
                                    <TableCell align="center" sx={{minWidth: 17}}>

                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bills
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((bill) => (
                                        <TableRow>
                                            <TableCell sx={{minWidth: 170}}>
                                                {bill.payee}
                                            </TableCell>
                                            <TableCell sx={{minWidth: 50}} align="center">
                                                {bill.currency} {numberWithCommas(bill.amount)}
                                            </TableCell>
                                            <TableCell sx={{minWidth: 70}}>
                                                {dateFormat(bill.due_date)}
                                            </TableCell>
                                            <TableCell sx={{minWidth: 40}} align="center">
                                                <Chip sx={{ textTransform: 'uppercase' }} label={bill.transaction_type} color={bill.transaction_type === 'payable' ? 'success' : 'primary'} />
                                            </TableCell>
                                            <TableCell sx={{minWidth: 40}}>
                                                Before {bill.notification} days
                                            </TableCell>
                                            <TableCell align="center" sx={{minWidth: 17}}>
                                                {bill.status === 0 ? <GppBadIcon color="disabled"/> : <GppGoodIcon color="secondary"/> }
                                            </TableCell>
                                            <TableCell align="center" sx={{minWidth: 17}}>
                                                <IconButton
                                                    aria-controls={`bill-action-menu-${bill.id}`}
                                                    onClick={(event)=>handleActionMenu(bill.id, event)}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    id={`bill-action-menu-${bill.id}`}
                                                    anchorEl={actionMenuEl && actionMenuEl[bill.id]}
                                                    keepMounted
                                                    open={Boolean(actionMenuEl && actionMenuEl[bill.id])}
                                                    onClose={handleCloseActionMenu}
                                                >
                                                    <MenuItem  onClick={handleEditBill.bind(this, bill)}>Edit Bill</MenuItem>
                                                    <MenuItem onClick={()=> dispatch(deleteBill({ id: bill.id }))}>Delete</MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={bills.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Grid>
        </Grid>
        <BillForm isEditable={isEditable} editableBill={selectedBill} open={openBillForm} setOpen={setOpenBillForm}  handleClose={handleBillFormClose}/>
    </ThemeLayout>);
}

export default Bills;