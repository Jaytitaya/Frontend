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
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { yellow } from '@material-ui/core/colors';
import Axios from 'axios';

function Light(){
    const paperStyle={padding:20,height:'90vh',width:700,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const paperStyle2={padding:30,height:'20vh',width:380,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const [plantname,setPlantname]=useState("")
    const [farmname,setFarmname]=useState("")
    const [plantsList, setPlantsList] = useState([])
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    let [ posts, setPosts ] = useState([])

    const handleChangeManual = (event) => {setChecked1(event.target.checked)};
    const handleChangeControll = (event) => {setChecked2(event.target.checked)};

    useEffect(()=>{
    async function getResults() {
      const results = await Axios('http://localhost:3001/farmname',{ withCredentials: true });
      setPosts(results.data);
    }
    getResults()
    },[]); 
    console.log(posts)

    const handleChange = (event) => {
        setFarmname(event.target.value);
        //console.log(plantname)
    };

    const getPlants = () =>{
        Axios.post('http://localhost:3001/plantname', {
            plantname : plantname
         },{ withCredentials: true }).then((response)=>{
            setPlantsList(response.data);
            
        });
    }

    const getControllerStatus = () => {
        Axios.post("http://localhost:3001/getControllerHumid",{plantname: plantname},{ withCredentials: true }).then((response) => {
          setChecked1(response.data[0].lightcontrolstrategy);
          setChecked2(response.data[0].lightcontrolstatus);
        });
      }

    const pushControllerStatus = () => {
        if (checked1 == true) {
          Axios.post("http://localhost:3001/pushControllerTemp",{ plantname: plantname, lightcontrolstrategy: checked1 },{ withCredentials: true })
        }
        else {
          Axios.post("http://localhost:3001/pushControllerTemp",{ plantname: plantname, lightcontrolstrategy: checked1},{ withCredentials: true })
          Axios.post("http://localhost:3001/manualpushControllerTemp",{ plantname: plantname, lightcontrolstatus: checked2},{ withCredentials: true })
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
                <FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Farn name</InputLabel>
                    <Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={plantname} label="Farm name" input={<OutlinedInput label="Farm name" />}onChange={handleChange}>
                        {posts.map((posts) => (<MenuItem key={posts} value={posts}>{posts}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4}><Button onClick={getControllerStatus} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '210px' }}>Show information</Button></Grid>
            
                
                <Grid item xs={6} ><WbIncandescentIcon style={{ fontSize: 100, color: yellow[700] }}/></Grid>
                <Grid item xs={6} className="clight">Open</Grid>
                <Grid item xs={6} ><WbIncandescentIcon style={{ fontSize: 100 }}/></Grid>
                <Grid item xs={6} className="clight">Close</Grid>
                
                <Paper elevation={6} style={paperStyle2} >
                    
                    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={4} className="clight">Auto control</Grid>
                    <Grid item xs={1} ><Switch onClick={handleChangeManual} checked={checked1} /></Grid>
                    <Grid item xs={6} className="clight" >Manual control</Grid>
                    </Grid>
                    
                    <Grid  container spacing={5} direction="row" justifyContent="center" alignItems="center" >
                        <Grid className="clight" item xs={2} >Light</Grid>
                        <Grid item xs={2} className="clight">Off</Grid>
                        <Switch onClick={handleChangeControll} checked={checked2} disabled={!checked1} />
                        <Grid item xs={2} className="clight" >On</Grid>
                    </Grid>

                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" >
                        <Button onClick={pushControllerStatus} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '100px' }}>Save</Button>
                    </Grid>
                 
                </Paper>
                
            </Grid>
            
            </Paper>
        </Grid>
    )
}
export default Light