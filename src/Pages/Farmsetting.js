import React, {useState,useEffect} from 'react'
import Navbar from '../Components/Navbar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function Farmsetting() {
    const navigate = useNavigate();
    const [farmname,setFarmname]=useState("");
    const [plantname,setPlantname]=useState("");
    const [location,setLocation]=useState("");
    const [plantamount,setPlantamount]=useState("");
    const [stage,setStage]=useState("");
    const [registerfarmStatus, setRegisterFarmStatus]=useState("")
    const plantstage = [
      {name:'Seeding stage', val:'seed'},
      {name:'Vegetation period', val:'veget'},
      {name:'Flowering period', val:'flowr'},
      {name:'Lateflowering', val:'late'},
    ];

    const handleChange = (event) => {
        setStage(event.target.value);
    };
    const handlePlantChange = (event) => {
      setPlantname(event.target.value);
    };

    let [ posts, setPosts ] = useState([])
    useEffect(()=>{
    async function getResults() {
      const results = await Axios('http://localhost:3001/plantname',{ withCredentials: true });
      setPosts(results.data);
    }
    getResults()
    },[]); 

    const addFarm = () => {
      Axios.post('http://localhost:3001/farmregister',{
          farmname: farmname,
          plantname: plantname,
          location: location,
          plantamount: plantamount,
          stage: stage
      },{ withCredentials: true })
        .then((response)=>{
            if(response.data.message){
                setRegisterFarmStatus(response.data.message);
                
            }else{
                navigate("/farminfo")
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
          md={6}
          sx={{
            backgroundImage: 'url(/Farm.jpg)',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} align='center' sm={8} md={6} component={Paper} elevation={6} square>
        <h2 className="app-front" style={{color:'#008000'}}>Farm</h2>
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Grid container spacing={2} align='center'>
                <Grid item xs={12} ><TextField id="outlined-basic" label="Farm name" variant="outlined" onChange={(e) => setFarmname(e.target.value)}/></Grid>
                <Grid item xs={12} >
                  <FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Plant name</InputLabel>
                    <Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={plantname} label="plantname" input={<OutlinedInput label="plantname" />}onChange={handlePlantChange}>
                        {posts.map((posts) => (<MenuItem key={posts} value={posts}>{posts}</MenuItem>))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} ><TextField id="outlined-basic" label="Location" variant="outlined" onChange={(e) => setLocation(e.target.value)}/></Grid>
                <Grid item xs={12} ><TextField id="outlined-basic" label="Plant amount / Farm" variant="outlined" onChange={(e) => setPlantamount(e.target.value)}/></Grid>
                <Grid item xs={12} ><FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Stage</InputLabel><Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={stage} label="Stage" input={<OutlinedInput label="Stage" />} onChange={handleChange}>
                    {plantstage.map((plantstage) => (<MenuItem key={plantstage.name} value={plantstage.val}>{plantstage.name}</MenuItem>))}</Select></FormControl></Grid>
                <Grid item xs={12}><b>{registerfarmStatus}</b></Grid>
                <Grid item xs={12}><Button onClick={addFarm} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '225px' }}>Save</Button></Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}