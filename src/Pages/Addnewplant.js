import React,{useState,useEffect} from 'react'
import Navbar from '../Components/Navbar';
import {useNavigate} from "react-router-dom";
import {Grid, TextField, Paper, Typography} from '@material-ui/core'
import Button from '@mui/material/Button';
import Axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

//import 'antd/dist/antd.css';

function Addnewplant(){
    const navigate = useNavigate();
    const paperStyle={padding:20,height:'90vh',width:900,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const paperinside={height:'60vh',width:600,margin:"10px auto",backgroundColor: '#f5f5f5'}
    //const [inputtime,setInputtime]=useState([{opentime:'',closetime:''},])
    const [plantname,setPlantname]=useState("")
    const [stage,setStage]=useState("")
    const [opentime,setOpentime]=useState("")
    const [closetime,setClosetime]=useState("")
    const [lowertemp,setLowertemp]=useState("")
    const [highertemp,setHighertemp]=useState("")
    const [lowerhumid,setLowerhumid]=useState("")
    const [higherhumid,setHigherhumid]=useState("")
    const [lowerpH,setLowerpH]=useState("")
    const [higherpH,setHigherpH]=useState("")
    
    const [registerplantStatus, setRegisterPlantStatus]=useState("")
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
  
  //const handleClickStage = () => {
  //  setSelectstage("on");
  //};

  //const handleChangeInput = (index, event)=>{
  //  const values = [...inputtime];
  //  values[index][event.target.name]= event.target.value;
  //  setInputtime(values);
  //}
  //const handleAddTime = () => {
  //    setInputtime([...inputtime,{opentime:'',closetime:''}])
  //}
  //const handleRemoveTime = (index) =>{
  //  const values = [...inputtime];
  //  values.splice(index,1);
  //  setInputtime(values);
  //}
    const [plantsList, setPlantsList] = useState([])
    const addPlant = () => {
        Axios.post('http://localhost:3001/plantparameter',{
            plantname: plantname,
            stage: stage,
            opentime: opentime,
            closetime: closetime,
            lowertemp: lowertemp,
            highertemp: highertemp,
            lowerhumid: lowerhumid,
            higherhumid: higherhumid,
            lowerpH: lowerpH,
            higherpH: higherpH
            
        },{ withCredentials: true })
        .then((response)=>{
            if(response.data.message){
                setRegisterPlantStatus(response.data.message);
                
            }else{
                navigate("/myplant")
            }
        },{ withCredentials: true })
        .then(() => {
            setPlantsList([
                ...plantsList,
            {
                plantname: plantname,
                stage: stage,
                opentime: opentime,
                closetime: closetime,
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
                <h2 className="app-front" style={{color:'#008000'}}>Parameters</h2>
                <Grid container spacing={3}>
                    <Grid item xs={12} ><FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Plant name</InputLabel>
                    <Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={plantname} label="plantname" input={<OutlinedInput label="plantname" />}onChange={handlePlantChange}>
                        {posts.map((posts) => (<MenuItem key={posts} value={posts}>{posts}</MenuItem>))}
                    </Select>
                  </FormControl></Grid>
                    <Grid item xs={12} ><FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Stage</InputLabel><Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={stage} label="Stage" input={<OutlinedInput label="Stage" />}onChange={handleChange}>
                    {plantstage.map((plantstage) => (<MenuItem key={plantstage.name} value={plantstage.val}>{plantstage.name}</MenuItem>))}</Select></FormControl></Grid>
                </Grid> 
                <Paper elevation={0} style={paperinside}>
                <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item xs={3} ><img className="homephoto" src="/light.png" /></Grid>
                    <form onSubmit={addPlant}>
                    
                    <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item xs={5} md={6}> <TextField id="time" label="Open time" type="time" name="opentime"  InputLabelProps={{shrink: true,}} inputProps={{step: 300,}} sx={{ width: 150 }} onChange={(e) => setOpentime(e.target.value)}/></Grid>
                    <Grid item xs={1} ><Typography style={{color:'#008000'}}>-</Typography></Grid>
                    <Grid item xs={5} md={4}> <TextField id="time" label="Close time" type="time" name="closetime"  InputLabelProps={{shrink: true,}} inputProps={{step: 300,}} sx={{ width: 150 }}  onChange={(e) => setClosetime(e.target.value)}/></Grid>
                    
                    </Grid>
                    
                    </form>
                </Grid>
                <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                    <Grid item xs={3} ><img className="app-light-photo" src="/Temp.png" /></Grid>
                    <Grid item xs={3} md={3}><TextField id="outlined-basic" label="Temperature" variant="outlined" onChange={(e) => setLowertemp(e.target.value)}/></Grid>
                    <Grid item xs={1}><Typography style={{color:'#008000'}}>-</Typography></Grid>
                    <Grid item xs={3} md={3}><TextField id="outlined-basic" label="Temperature" variant="outlined" onChange={(e) => setHighertemp(e.target.value)}/></Grid>
                    <Grid item xs={2} ><Typography style={{color:'#008000'}}>°C</Typography></Grid> 
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
                    <Grid item xs={12}><b>{registerplantStatus}</b></Grid>
                    
                
                </Grid>
                </Paper>
                  
            </Paper>
        </Grid>
    )
}
export default Addnewplant