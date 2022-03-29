import React, {useState,useEffect} from 'react'
import Navbar from '../Components/Navbar';
import {Grid, Paper, Avatar, TextField, Typography, Link} from '@material-ui/core'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';


const  Farmsetting=()=>{
    const paperStyle={padding:20,height:'70vh',width:700,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const papergreen={padding:20,height:'50vh',width:400,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const navigate = useNavigate();
    const [plantname,setPlantname]=useState("");
    const [stage,setStage]=useState("");
    const plantstage = [
        'Seeding stage',
        'Vegetation period',
        'Flowering period',
        'Lateflowering',
    ];

    const handleChange = (event) => {
        setStage(event.target.value);
    };
    
    
    return(
        <Grid align='center'>
           <Navbar/>
           <Paper elevation={0} style={paperStyle}>
                <h2 className="app-front" style={{color:'#008000'}}>Farm</h2>
                
                    <Grid container spacing={2}>
                        <Grid item xs={12} ><TextField id="outlined-basic" label="Farm name" variant="outlined" onChange={(e) => setPlantname(e.target.value)}/></Grid>
                        <Grid item xs={12} ><TextField id="outlined-basic" label="Location" variant="outlined"/></Grid>
                        <Grid item xs={12} ><FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Stage</InputLabel><Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={stage} label="Stage" input={<OutlinedInput label="Stage" />} onChange={handleChange}>
                    {plantstage.map((plantstage) => (<MenuItem key={plantstage} value={plantstage}>{plantstage}</MenuItem>))}</Select></FormControl></Grid>
                        <Grid item xs={12}><Button variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '225px' }}>Save</Button></Grid>
                    </Grid> 
                
           </Paper>
        </Grid>
    )
}

export default Farmsetting