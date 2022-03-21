import React,{useState} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, TextField, Paper, Typography} from '@material-ui/core';
import Button from '@mui/material/Button';

import Axios from 'axios';

function Light(){
    const paperStyle={padding:20,height:'90vh',width:700,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const [plantname,setPlantname]=useState("")
    return(
        
        <Grid align='center'>
            <Navbar/>
            <Paper elevation={0} style={paperStyle}>
            <Grid container spacing={2} justifyContent="center" >
                <Grid item xs={2} >
                    <img className="homephoto" src="/light.png" />
                </Grid>
                <Grid item xs={3} >
                    <h2 className="app-front" style={{color:'#008000'}}>Light</h2>
                </Grid>
            </Grid>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" >
                <Grid item xs={3} md={4}><TextField id="outlined-basic" label="Plant name" variant="outlined" onChange={(e) => setPlantname(e.target.value)}/></Grid>
                <Grid item xs={3} md={2}><Button  variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '210px' }}>Show information</Button></Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <c>State :</c>
            </Grid>
            </Paper>
        </Grid>
    )
}
export default Light