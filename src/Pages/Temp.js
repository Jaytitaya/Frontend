import React from 'react';
import Navbar from '../Components/Navbar';
import {Grid, TextField, Paper, Typography} from '@material-ui/core'

function Temp(){
    const paperStyle={padding:20,height:'90vh',width:700,margin:"10px auto",backgroundColor: '#f5f5f5'}
    return(
        <Grid align='center'>
            <Navbar/>
            <Paper elevation={5} style={paperStyle}>
            <Grid container spacing={2} justifyContent="center" >
                <Grid item xs={2} >
                    <img className="homephoto" src="/Temp.png" />
                </Grid>
                <Grid item xs={6} >
                    <h2 className="app-front" style={{color:'#008000'}}>Temperature</h2>
                </Grid>
            </Grid>
            </Paper>
        </Grid>
    )
}
export default Temp