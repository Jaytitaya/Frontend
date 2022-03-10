import React from 'react';
import Navbar from '../Components/Navbar';
import {Grid, TextField, Paper, Typography} from '@material-ui/core'

function PH(){
    const paperStyle={padding:20,height:'90vh',width:700,margin:"10px auto",backgroundColor: '#f5f5f5'}
    return(
        <Grid align='center'>
            <Navbar/>
            <Paper elevation={5} style={paperStyle}>
            <Grid container spacing={2} justifyContent="center" >
                <h2 className="app-front" style={{color:'#008000'}}>pH</h2>
                
            </Grid>
            </Paper>
        </Grid>
    )
}
export default PH