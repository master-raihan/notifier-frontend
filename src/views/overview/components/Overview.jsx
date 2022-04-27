import React from 'react';
import ThemeLayout from "../../Layout/ThemeLayout";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import List from '@mui/material/List';
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import BillCard from "./Bill/BillCard";
import {useNavigate} from "react-router-dom";
import {getAllBill, getReportBill, resetBillErrors} from "../../../Config/State/reducers/billSlice";
import {useSelector, useDispatch} from "react-redux";
import BillForm from "./Bill/BillForm";
import Typography from "@mui/material/Typography";
import {numberWithCommas} from "../../../helper/utility/formatter";
import Grid from "@mui/material/Grid";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Paper
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{ borderRadius: 0, minHeight: 400 }}
            {...other}
        >
            {value === index && (
                <React.Fragment>
                    {children}
                </React.Fragment>
            )}
        </Paper>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Overview = (props) => {
    const [tab, setTab] = React.useState(0);
    const {isLoading, reportBills} = useSelector((state)=>state.bill);
    const dispatch = useDispatch();

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };


    React.useEffect(()=>{
        dispatch(getReportBill());
    },[dispatch]);

    return (<ThemeLayout pageHeading={"overview"}>
            <Box component="div" sx={{px: 8, py: 8, bgcolor: "#009be5"}}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#fff' }}>Paid: BDT {!isLoading && reportBills.paid && numberWithCommas(reportBills.paid.reduce((prev, curr)=>prev+parseFloat(curr.amount), 0))}</Typography>
                        <Typography sx={{ color: '#fff' }}>Upcoming Due: BDT {!isLoading && reportBills.upcoming && numberWithCommas(reportBills.upcoming.reduce((prev, curr)=>prev+parseFloat(curr.amount), 0))}</Typography>
                        <Typography sx={{ color: '#fff' }}>Overdue: BDT {!isLoading && reportBills.overdue && numberWithCommas(reportBills.overdue.reduce((prev, curr)=>prev+parseFloat(curr.amount), 0))}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ color: '#fff' }}>Payable: BDT {!isLoading && numberWithCommas(parseFloat(reportBills.payable)) }</Typography>
                        <Typography sx={{ color: '#fff' }}>Receivable: BDT {!isLoading && numberWithCommas(parseFloat(reportBills.receivable)) }</Typography>
                        <Typography sx={{ color: '#fff' }}>Outstanding: ({!isLoading && reportBills.outstanding > 0 ? '+' : '-'}) BDT {!isLoading && numberWithCommas(Math.abs(parseFloat(reportBills.outstanding))) }</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs TabIndicatorProps={{
                        sx: {
                            backgroundColor: "#009be5",
                        },
                    }} sx={{ marginLeft: 0 }} variant="fullWidth" value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab sx={{ textTransform: "uppercase" }} label="Upcoming" {...a11yProps(0)} />
                        <Tab sx={{ textTransform: "uppercase" }} label="Overdue" {...a11yProps(1)} />
                        <Tab sx={{ textTransform: "uppercase" }} label="Paid" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={tab} index={0}>
                    <List sx={{ width: '100%' , bgcolor: 'background.paper', cursor: 'pointer' }}>
                        {
                            !isLoading && reportBills.upcoming && reportBills.upcoming.map((upcoming, index)=>(
                                <React.Fragment key={index}>
                                    <BillCard isPaid={false} bill={upcoming}/>
                                    { index === reportBills.upcoming.length - 1 ? (<Divider component="li"/>) : <div/> }
                                </React.Fragment>
                            ))
                        }
                    </List>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <List sx={{ width: '100%' , bgcolor: 'background.paper', cursor: 'pointer' }}>
                        {
                            !isLoading && reportBills.overdue && reportBills.overdue.map((overdue, index)=>(
                                <React.Fragment key={index}>
                                    <BillCard isPaid={false} bill={overdue}/>
                                    { index === reportBills.overdue.length - 1 ? (<Divider component="li"/>) : <div/> }
                                </React.Fragment>
                            ))
                        }
                    </List>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <List sx={{ width: '100%' , bgcolor: 'background.paper', cursor: 'pointer' }}>
                        {
                            !isLoading && reportBills.paid && reportBills.paid.map((paid, index)=>(
                                <React.Fragment key={index}>
                                    <BillCard isPaid={true} bill={paid}/>
                                    { index === reportBills.paid.length - 1 ? (<Divider component="li"/>) : <div/> }
                                </React.Fragment>
                            ))
                        }
                    </List>
                </TabPanel>
            </Box>
        </ThemeLayout>
    );
}

export default Overview;