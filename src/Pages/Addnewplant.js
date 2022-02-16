import React,{useState} from 'react'
import Navbar from '../Components/Navbar';
import {Grid, TextField, Paper, Typography} from '@material-ui/core'
import Button from '@mui/material/Button';
import Axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
function Addnewplant(){
    const paperStyle={padding:20,height:'90vh',width:900,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const paperinside={height:'60vh',width:600,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const [plantname,setPlantname]=useState("")
    const [stage,setStage]=useState("")
    const [openclosetime,setOpenclosetime]=useState("")
    const [lowertemp,setLowertemp]=useState("")
    const [highertemp,setHighertemp]=useState("")
    const [lowerhumid,setLowerhumid]=useState("")
    const [higherhumid,setHigherhumid]=useState("")
    const [lowerpH,setLowerpH]=useState("")
    const [higherpH,setHigherpH]=useState("")
    const plantstage = [
        'Seeding stage',
        'Vegetation period',
        'Flowering period',
        'Lateflowering',
      ];
  const handleChange = (event) => {
    setStage(event.target.value);
  };
    const [plantsList, setPlantsList] = useState([])
    const addPlant = () => {
        Axios.post('http://localhost:3001/createplant',{
            plantname: plantname,
            stage: stage,
            openclosetime: openclosetime,
            lowertemp: lowertemp,
            highertemp: highertemp,
            lowerhumid: lowerhumid,
            higherhumid: higherhumid,
            lowerpH: lowerpH,
            higherpH: higherpH
            
        },{ withCredentials: true }).then(() => {
            setPlantsList([
                ...plantsList,
            {
                plantname: plantname,
                stage: stage,
                openclosetime: openclosetime,
                lowertemp: lowertemp,
                highertemp: highertemp,
                lowerhumid: lowerhumid,
                higherhumid: higherhumid,
                lowerpH: lowerpH,
                higherpH: higherpH
            }
            ])
        })
    }
    return(
        
        <Grid align='center'>
           <Navbar/>
            <Paper elevation={0} style={paperStyle}>
                <h2 className="app-front" style={{color:'#008000'}}>Add New Plant</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12} ><TextField id="outlined-basic" label="Plant name" variant="outlined" onChange={(e) => setPlantname(e.target.value)}/></Grid>
                    <Grid item xs={12} ><FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Stage</InputLabel><Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={stage} label="Stage" input={<OutlinedInput label="Stage" />}onChange={handleChange}>
                    {plantstage.map((plantstage) => (<MenuItem key={plantstage} value={plantstage}>{plantstage}</MenuItem>))}</Select></FormControl></Grid>
                </Grid> 
                <Paper elevation={0} style={paperinside}>
                <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item xs={3} ><img className="homephoto" src="/light.png" /></Grid>
                    <Grid item xs={1} md={5}><TextField id="outlined-basic" label="Open time - Close time" variant="outlined" onChange={(e) => setOpenclosetime(e.target.value)}/></Grid>
                </Grid>
                <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item xs={3} ><img className="app-light-photo" src="/Temp.png" /></Grid>
                    <Grid item xs={3} md={3}><TextField id="outlined-basic" label="Temperature" variant="outlined" onChange={(e) => setLowertemp(e.target.value)}/></Grid>
                    <Grid item xs={1}><Typography style={{color:'#008000'}}>-</Typography></Grid>
                    <Grid item xs={3} md={3}><TextField id="outlined-basic" label="Temperature" variant="outlined" onChange={(e) => setHighertemp(e.target.value)}/></Grid>
                    <Grid item xs={2} ><Typography style={{color:'#008000'}}>Celsius</Typography></Grid> 
                </Grid>
                <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item xs={3} ><img className="app-light-photo" src="/Humidity.png" /></Grid>
                    <Grid item xs={2} md={3}><TextField id="outlined-basic" label="Humidity" variant="outlined" onChange={(e) => setLowerhumid(e.target.value)}/></Grid>
                    <Grid item xs={1}><Typography style={{color:'#008000'}}>-</Typography></Grid>
                    <Grid item xs={2} md={3}><TextField id="outlined-basic" label="Humidity" variant="outlined" onChange={(e) => setHigherhumid(e.target.value)}/></Grid>
                    <Grid item xs={2} ><Typography style={{color:'#008000'}}>%</Typography></Grid>
                </Grid>
                <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item xs={3} ><h2 className="app-front" style={{color:'#008000'}}>pH</h2></Grid>
                    <Grid item xs={2} md={3}><TextField id="outlined-basic" label="pH value" variant="outlined" onChange={(e) => setLowerpH(e.target.value)}/></Grid>
                    <Grid item xs={1}><Typography style={{color:'#008000'}}>-</Typography></Grid>
                    <Grid item xs={2} md={3}><TextField id="outlined-basic" label="pH value" variant="outlined" onChange={(e) => setHigherpH(e.target.value)}/></Grid>
                    <Grid item xs={12}><Button onClick={addPlant} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '300px' }}>Save</Button></Grid>                  
                </Grid>
                </Paper>
                  
            </Paper>
        </Grid>
    )
}
export default Addnewplant