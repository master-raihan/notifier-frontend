import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useSelector, useDispatch} from "react-redux";
import {createCategory, getAllCategory} from "../../../../Config/State/reducers/categorySlice";
import {FormHelperText} from "@mui/material";

const CategoryForm = (props) => {
    const { open, setOpen, handleClose, categories } = props;
    const { isLoading, errors } = useSelector((state)=>state.category);
    const dispatch = useDispatch();
    const [form, setForm] = React.useState({
        category_name: "",
        transaction_type: "",
        parent_category: "",
        description: ""
    });

    const handleFormSubmit = () => {
        dispatch(createCategory(form));
    }

    const handleCategoryForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    React.useEffect(()=>{
        if(!isLoading && !errors){
            setOpen(false);
        }
    },[isLoading, errors, setOpen]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Create New Category"}
            </DialogTitle>
            <DialogContent>
               <Box component="form" noValidate sx={{ marginTop: 2 }}>
                   <Grid container spacing={2}>
                       <Grid item xs={12} sm={12}>
                           <TextField
                               onChange={handleCategoryForm}
                               value={form.category_name}
                               size="small"
                               name="category_name"
                               required
                               fullWidth
                               error={errors && 'category_name' in errors}
                               helperText={errors && 'category_name' in errors ? errors.category_name[0] : null}
                               label="Category Name"
                           />
                       </Grid>
                       <Grid item xs={12} sm={12}>
                           <FormControl variant="outlined" size="small" required fullWidth>
                               <InputLabel>Transaction Type</InputLabel>
                               <Select
                                   onChange={handleCategoryForm}
                                   value={form.transaction_type}
                                   error={errors && 'transaction_type' in errors}
                                   name="transaction_type"
                                   label="Transaction Type"
                               >
                                   <MenuItem value="payable">Payable</MenuItem>
                                   <MenuItem value="receivable">Receivable</MenuItem>
                               </Select>
                               {errors && 'transaction_type' in errors ? <FormHelperText error>{ errors.transaction_type[0] }</FormHelperText> : null}
                           </FormControl>
                       </Grid>
                       <Grid item xs={12} sm={12}>
                           <FormControl variant="outlined" size="small" fullWidth>
                               <InputLabel>Parent Category</InputLabel>
                               <Select
                                   onChange={handleCategoryForm}
                                   value={form.parent_category}
                                   error={errors && 'parent_category' in errors}
                                   helperText={errors && 'parent_category' in errors ? errors.parent_category[0] : null}
                                   name="parent_category"
                                   label="Parent Category"
                               >
                                   {
                                       !isLoading && categories ? categories.map((category, index)=>(<MenuItem key={index} value={category.id}>{category.category_name}</MenuItem>)) : <MenuItem>No Category</MenuItem>
                                   }
                               </Select>
                           </FormControl>
                       </Grid>
                       <Grid item xs={12} sm={12}>
                           <TextField
                               onChange={handleCategoryForm}
                               value={form.description}
                               error={errors && 'description' in errors}
                               helperText={errors && 'description' in errors ? errors.description[0] : null}
                               size="small"
                               name="description"
                               required
                               fullWidth
                               label="Description"
                           />
                       </Grid>
                   </Grid>
               </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button variant="contained" color="primary" onClick={handleFormSubmit} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CategoryForm;