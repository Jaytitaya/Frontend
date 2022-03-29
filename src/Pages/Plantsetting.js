import React, {useState,useEffect} from 'react'
import Navbar from '../Components/Navbar';
import {Grid, Paper, Avatar, TextField, Typography, Link} from '@material-ui/core'
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';

const  Plantsetting=()=>{
    const paperStyle={padding:20,height:'70vh',width:700,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const papergreen={padding:20,height:'50vh',width:400,margin:"10px auto",backgroundColor: '#8FBC8F'}
    const navigate = useNavigate();
    const [plantname,setPlantname]=useState("")
    
    
    return(
        <Grid align='center'>
           <Navbar/>
           <Paper elevation={0} style={paperStyle}>
                <h2 className="app-front" style={{color:'#008000'}}>Plant</h2>
                
                    <Grid container spacing={2}>
                        <Grid item xs={12} ><TextField id="outlined-basic" label="Plant name" variant="outlined" onChange={(e) => setPlantname(e.target.value)}/></Grid>
                        <Grid item xs={12} ><TextField id="outlined-basic" label="Life cycle" variant="outlined"/></Grid>
                        <Grid item xs={12} ><TextField id="outlined-basic" label="Max height" variant="outlined"/></Grid>
                        <Grid item xs={12}><Button variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '225px' }}>Save</Button></Grid>
                    </Grid> 
                
           </Paper>
        </Grid>
    )
}

export default Plantsetting