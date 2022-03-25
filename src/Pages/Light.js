import React,{useState} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, TextField, Paper, Typography} from '@material-ui/core';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';

import Axios from 'axios';

function Light(){
    const paperStyle={padding:20,height:'90vh',width:700,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const paperStyle2={padding:30,height:'20vh',width:380,margin:"10px auto",backgroundColor: '#f5f5f5'}
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
            <Grid container spacing={2} direction="column" justifyContent="space-between" alignItems="center" >
                <Grid item xs={12} md={4}><TextField id="outlined-basic" label="Plant name" variant="outlined" onChange={(e) => setPlantname(e.target.value)}/></Grid>
                <Grid item xs={12} md={4}><Button  variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '210px' }}>Show information</Button></Grid>
                
                <c>State :</c>
                <Paper elevation={6} style={paperStyle2} >
                
                    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={4} className="clight">Auto control</Grid>
                    <Grid item xs={1} ><Switch /></Grid>
                    <Grid item xs={6} className="clight" >Manual control</Grid>
                    </Grid>
                    
                    <Grid  container spacing={5} direction="row" justifyContent="center" alignItems="center" >
                        <Grid className="clight" item xs={2} >Light</Grid>
                        <Grid item xs={2} className="clight">Off</Grid>
                        <Switch />
                        <Grid item xs={2} className="clight" >On</Grid>
                    </Grid>

                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" >
                        <Button variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '100px' }}>Save</Button>
                    </Grid>
                 
                </Paper>
                
            </Grid>
            
            </Paper>
        </Grid>
    )
}
export default Light