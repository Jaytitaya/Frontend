import React,{useState,useEffect} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, TextField, Paper, Typography} from '@material-ui/core';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Axios from 'axios';

function Light(){
    const paperStyle={padding:20,height:'90vh',width:700,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const paperStyle2={padding:30,height:'20vh',width:380,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const [plantname,setPlantname]=useState("");
    const [plantsList, setPlantsList] = useState([]);
    const [manualcontrol,setManualControl]=useState(false);
    let [ posts, setPosts ] = useState([]);

    useEffect(()=>{
    async function getResults() {
      const results = await Axios('http://localhost:3001/plantname',{ withCredentials: true });
      setPosts(results.data);
    }
    getResults()
    },[]); 
    console.log(posts)

    const handleChange = (event) => {
        setPlantname(event.target.value);
        //console.log(plantname)
    };

    const getPlants = () =>{
        Axios.post('http://localhost:3001/plantname', {
            plantname : plantname
         },{ withCredentials: true }).then((response)=>{
            setPlantsList(response.data);
            
        });
    }

    console.log({manualcontrol})
    const  handleChangecontrol =(event)=>{
        setManualControl(event.target.checked)
    }

    function checkorigin(){
        //const selectstage = props;
        if (manualcontrol === true || manualcontrol === "1"){
            
            return <FormControlLabel control={<Switch  />} label="" />;
        }else{
            return <FormControlLabel disabled control={<Switch />} label="Disabled" />;
        }
    }

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
            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" >
            <Grid item xs={12} md={4}>
                <FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Plant name</InputLabel>
                    <Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={plantname} label="plantname" input={<OutlinedInput label="plantname" />}onChange={handleChange}>
                        {posts.map((posts) => (<MenuItem key={posts} value={posts}>{posts}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4}><Button onClick={getPlants} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '210px' }}>Show information</Button></Grid>
            
                <c>State :</c>
                <Paper elevation={6} style={paperStyle2} >
                
                    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={4} className="clight">Auto control</Grid>
                    <Grid item xs={1} ><FormControlLabel value="Manual" control={<Switch />} label="" onChange={handleChangecontrol}/></Grid>
                    <Grid item xs={6} className="clight" >Manual control</Grid>
                    </Grid>
                    
                    <Grid  container spacing={5} direction="row" justifyContent="center" alignItems="center" >
                        <Grid className="clight" item xs={2} >Light</Grid>
                        <Grid item xs={2} className="clight">Off</Grid>
                        <Switch/>
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