import React,{Component,useState,useContext,useEffect} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, TextField, Paper, Typography} from '@material-ui/core'
import Button from '@mui/material/Button';
import ReactSpeedometer from "react-d3-speedometer";

function Temp(){
    const paperStyle={padding:20,height:'90vh',width:700,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const [plantname,setPlantname]=useState("")
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
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={3} md={3} ><TextField id="outlined-basic" label="Plant name" variant="outlined" onChange={(e) => setPlantname(e.target.value)}/></Grid>
                <Grid item xs={3} md={2}><Button  variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '210px' }}>Show information</Button></Grid>
            </Grid>
            <ReactSpeedometer
                
                width={400}
                height={400}
                
                valueTextFontSize = {20}
                needleColor="#662200"
                needleTransitionDuration={4000}
                needleTransition="easeElastic"
                segments = {3}
                paddingVertical = {10}
                segmentColors = {["#b3ff66","#00b300","#e6b800"]}
                customSegmentLabels={[
                    {
                      text: "Low Temp",
                      position: "OUTSIDE",
                      color: "#555",
                      fontSize: "16px"
                    },
                    {
                      text: "Normal Temp",
                      position: "OUTSIDE",
                      color: "#555",
                      fontSize: "16px"
                    },
                    {
                      text: "High Temp",
                      position: "OUTSIDE",
                      color: "#555",
                      fontSize: "1ู6px"
                    }
                  ]}
            />
            </Paper>
        </Grid>
    )
}
export default Temp