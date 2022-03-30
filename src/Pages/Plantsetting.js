import React, {useState,useEffect} from 'react'
import Navbar from '../Components/Navbar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';

const theme = createTheme();

export default function Plantsetting() {
  const [plantname,setPlantname]=useState("")
  const [plantnameEng,setPlantnameEng]=useState("")
  //const [username,setUsername]=useState("")
  const [lifecycle,setLifecycle]=useState("")
  const [utilization, setUtilization]=useState("")
  const [registerplantStatus, setRegisterPlantStatus]=useState("")

  const addPlant = () => {
    Axios.post('http://localhost:3001/plantregister',{
        plantname: plantname,
        plantnameEng: plantnameEng,
        lifecycle: lifecycle,
        utilization: utilization
    },{ withCredentials: true })
      .then((response)=>{
          if(response.data.message){
              setRegisterPlantStatus(response.data.message);
              
          }else{
              //navigate("/myplant")
          }
    },{ withCredentials: true })
    .then((response)=>{
        //navigate("/signup");
        //console.log(response);
    })
}

  return (
    <ThemeProvider theme={theme}>
        <Navbar/>
      <Grid container component="main" sx={{ height: '89vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: 'url(/plant.jpg)',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2 className="app-front" style={{color:'#008000'}}>Plant</h2>
            <Grid container spacing={2} align='center'>
            <Grid item xs={12} >
              <TextField 
                id="outlined-basic" 
                label="Plant name (Thai)" 
                variant="outlined"
                value={plantname} 
                onChange={(e) => setPlantname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField 
                id="outlined-basic" 
                label="Plant name (English)" 
                variant="outlined"
                value={plantnameEng} 
                onChange={(e) => setPlantnameEng(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField 
                id="outlined-basic" 
                label="Life cycle" 
                variant="outlined"
                value={lifecycle} 
                onChange={(e) => setLifecycle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField 
                id="outlined-basic" 
                label="Utilization" 
                variant="outlined"
                value={utilization} 
                onChange={(e) => setUtilization(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}><b>{registerplantStatus}</b></Grid>
            <Grid item xs={12}><Button onClick={addPlant} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '225px' }}>Save</Button></Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}