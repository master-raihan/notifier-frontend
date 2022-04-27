import React from 'react';
import ThemeLayout from "../../Layout/ThemeLayout";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import CategoryCard from "./Category/CategoryCard";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CategoryForm from "./Category/CategoryForm";
import { useSelector, useDispatch } from "react-redux";
import {getAllCategory} from "../../../Config/State/reducers/categorySlice";
import AddIcon from "@mui/icons-material/Add";

const Category = (props) => {
    const [openCategoryForm, setOpenCategoryForm] = React.useState(false);
    const { isLoading, errors, categories } = useSelector((state)=>state.category);
    const dispatch = useDispatch();

    const handleCategoryFormClose = () => {
        setOpenCategoryForm(false);
    }

    const handleCategoryFormOpen = () => {
        setOpenCategoryForm(true);
    }

    React.useEffect(()=>{
        dispatch(getAllCategory());
    },[dispatch]);

    return (
        <ThemeLayout pageHeading={'Manage Category'}>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Button onClick={handleCategoryFormOpen} startIcon={<AddIcon/>} variant="contained" sx={{ marginTop: 3, marginRight: 3, float: 'right' }}>
                        Add New Category
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper sx={{ maxWidth: '97%', margin: 'auto', marginTop: '20px', overflow: 'hidden' }}>
                        <List sx={{ width: '100%' , bgcolor: 'background.paper', cursor: 'pointer' }}>
                            {
                                !isLoading ? categories.map((category, index)=>(
                                    <React.Fragment key={index}>
                                        <CategoryCard category={category}/>
                                    </React.Fragment>
                                )) : <div>No Categories Found</div>
                            }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
            <CategoryForm categories={categories} open={openCategoryForm} setOpen={setOpenCategoryForm}  handleClose={handleCategoryFormClose}/>
        </ThemeLayout>
    );
}

export default Category;