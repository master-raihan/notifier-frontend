import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MenuItem from "@mui/material/MenuItem";
import {createBill, updateBill} from "../../../../Config/State/reducers/billSlice";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategory} from "../../../../Config/State/reducers/categorySlice";
import {FormHelperText} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import {getLocalDate} from '../../../../helper/utility/date';


const BillForm = (props) => {
    const { open, setOpen, handleClose, isEditable, editableBill } = props;
    const [form, setForm] = React.useState({
        id: null,
        currency: "BDT",
        note: "",
        amount: 0,
        transaction_type: "payable",
        category: "",
        payee: "",
        due_date: "",
        repeat_count: 0,
        repeat_unit: "don't",
        notification: 5,
        status: 0
    });
    const { bill, category } = useSelector((state)=>state);
    const dispatch = useDispatch();

    const handleBillForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isEditable){
            dispatch(updateBill(form));
        }else {
            dispatch(createBill(form));
        }
    }

    React.useEffect(()=>{
        dispatch(getAllCategory());
    },[dispatch]);

    React.useEffect(()=>{
        if(!bill.isLoading && !bill.errors){
            setOpen(false);
        }
    },[bill.isLoading, bill.errors, setOpen]);

    React.useEffect(()=>{
       if(isEditable){
           setForm({
               id: editableBill.id,
               currency: editableBill.currency,
               note: editableBill.note,
               amount: editableBill.amount,
               transaction_type: editableBill.transaction_type,
               category: editableBill.category_id,
               payee: editableBill.payee,
               due_date: editableBill.due_date,
               repeat_count: editableBill.repeat,
               repeat_unit: editableBill.repeat_unit,
               notification: editableBill.notification,
               status: editableBill.status,
               billType: editableBill.billType
           });
       }else {
           setForm({
               id: null,
               currency: "BDT",
               note: "",
               amount: 0,
               transaction_type: "payable",
               category: "",
               payee: "",
               due_date: "",
               repeat_count: 0,
               repeat_unit: "don't",
               notification: 5,
               status: 0
           });
       }
    },[isEditable, editableBill]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                { isEditable ? "Edit Bill" : "Add New Bill" }
            </DialogTitle>
            <DialogContent>
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" size="small" required fullWidth>
                            <InputLabel>Currency</InputLabel>
                            <Select
                                value={form.currency}
                                onChange={handleBillForm}
                                name="currency"
                                label="Currency"
                                error={bill.errors && 'currency' in bill.errors}
                            >
                                <MenuItem value="BDT">BDT</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="INR">INR</MenuItem>
                            </Select>
                            {bill.errors && 'currency' in bill.errors ? <FormHelperText error>{bill.errors.currency[0]}</FormHelperText> : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            value={form.amount}
                            size="small"
                            onChange={handleBillForm}
                            type="number"
                            name="amount"
                            required
                            fullWidth
                            error={bill.errors && 'amount' in bill.errors}
                            helperText={bill.errors && 'amount' in bill.errors ? bill.errors.amount[0] : null}
                            label="Amount"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" size="small" fullWidth>
                            <InputLabel>Transaction Type</InputLabel>
                            <Select
                                onChange={handleBillForm}
                                value={form.transaction_type}
                                name="transaction_type"
                                label="Transaction Type"
                            >
                                <MenuItem value="payable">Payable</MenuItem>
                                <MenuItem value="receivable">Receivable</MenuItem>
                            </Select>
                            {bill.errors && 'transaction_type' in bill.errors ? <FormHelperText error>{bill.errors.transaction_type[0]}</FormHelperText> : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <FormControl variant="outlined" size="small" required fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                onChange={handleBillForm}
                                value={form.category}
                                error={bill.errors && 'category' in bill.errors}
                                name="category"
                                label="Category"
                            >
                                {
                                    !category.isLoading && category.categories ? category.categories.map((category, index)=>(<MenuItem key={index} value={category.id}>{category.category_name}</MenuItem>)) : <MenuItem>No Category</MenuItem>
                                }
                            </Select>
                            {bill.errors && 'category' in bill.errors ? <FormHelperText error>{bill.errors.category[0]}</FormHelperText> : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleBillForm}
                            value={form.payee}
                            size="small"
                            name="payee"
                            required
                            error={bill.errors && 'payee' in bill.errors}
                            helperText={bill.errors && 'payee' in bill.errors ? bill.errors.payee[0] : null}
                            fullWidth
                            label="Payee"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            onChange={handleBillForm}
                            value={getLocalDate(form.due_date)}
                            error={bill.errors && 'due_date' in bill.errors}
                            helperText={bill.errors && 'due_date' in bill.errors ? bill.errors.due_date[0] : null}
                            size="small"
                            name="due_date"
                            required
                            fullWidth
                            type="datetime-local"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            value={form.note}
                            size="small"
                            onChange={handleBillForm}
                            name="note"
                            fullWidth
                            error={bill.errors && 'note' in bill.errors}
                            helperText={bill.errors && 'note' in bill.errors ? bill.errors.note[0] : null}
                            label="Notes"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            onChange={handleBillForm}
                            error={bill.errors && 'repeat_count' in bill.errors}
                            helperText={bill.errors && 'repeat_count' in bill.errors ? bill.errors.repeat_count[0] : null}
                            value={form.repeat_count}
                            type="number"
                            size="small"
                            name="repeat_count"
                            required
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <FormControl variant="outlined" size="small" required fullWidth>
                            <InputLabel>Repeats in Every</InputLabel>
                            <Select
                                onChange={handleBillForm}
                                value={form.repeat_unit}
                                name="repeat_unit"
                                error={bill.errors && 'repeat_unit' in bill.errors}
                                label="Repeats in Every"
                            >
                                <MenuItem value="don't">Don't Repeat</MenuItem>
                                <MenuItem value="day">Days</MenuItem>
                                <MenuItem value="week">Week</MenuItem>
                                <MenuItem value="month">Month</MenuItem>
                                <MenuItem value="year">Year</MenuItem>
                            </Select>
                            {bill.errors && 'repeat_unit' in bill.errors ? <FormHelperText error>{bill.errors.repeat_unit[0]}</FormHelperText> : null}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <FormControl variant="outlined" size="small" required fullWidth>
                            <InputLabel>Send Daily Reminder Notification</InputLabel>
                            <Select
                                onChange={handleBillForm}
                                value={form.notification}
                                name="notification"
                                label="Notification"
                            >
                                <MenuItem value="0">Don't Send Any Notification</MenuItem>
                                {
                                    [...Array(14)].map((element,index)=>(
                                        <MenuItem key={index} value={index+1}>{index+1} Days Before Due Date</MenuItem>
                                    ))
                                }
                            </Select>
                            {bill.errors && 'notification' in bill.errors ? <FormHelperText error>{bill.errors.notification[0]}</FormHelperText> : null}
                        </FormControl>
                    </Grid>
                    {
                        isEditable ? <Grid item xs={12} sm={12}>
                            <FormControl variant="outlined" size="small" required fullWidth>
                                <InputLabel>Bill Status</InputLabel>
                                <Select
                                    value={form.status}
                                    onChange={handleBillForm}
                                    name="status"
                                    label="Bill Status"
                                    error={bill.errors && 'status' in bill.errors}
                                >
                                    <MenuItem value="0">Unpaid</MenuItem>
                                    <MenuItem value="1">Paid</MenuItem>
                                </Select>
                                {bill.errors && 'status' in bill.errors ? <FormHelperText error>{bill.errors.status[0]}</FormHelperText> : null}
                            </FormControl>
                        </Grid> : <div/>
                    }
                </Grid>
            </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>)
}

export default BillForm;