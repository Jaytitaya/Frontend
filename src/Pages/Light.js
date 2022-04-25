import React,{useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Navbar from '../Components/Navbar';
import {Grid,  Paper} from '@material-ui/core';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { yellow } from '@material-ui/core/colors';
import Axios from 'axios';

function Light(){
    const navigate = useNavigate();
    const paperStyle={padding:20,height:'90vh',width:700,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const paperStyle2={padding:30,height:'20vh',width:380,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const [farmname,setFarmname]=useState("")
    const [checked1, setChecked1] = useState(false);
    const [lightstate, setLightstate] = useState(false);
    const Param = "light";
    const [ID,setID] = useState(0);
    let   [posts, setPosts] = useState([])

    const handleChangeManual = (event) => {setChecked1(event.target.checked)};
    const handleChangeControll = (event) => {setLightstate(event.target.checked)};

    function lighticon(){
        if (lightstate === true){ return <WbIncandescentIcon style={{ fontSize: 100, color: yellow[700] }}/>}
        else{ return <WbIncandescentIcon style={{ fontSize: 100 }}/>}
    }

    function lighttext() {if(lightstate === true){return "Open"} else{return "Close"}}

    function getSensorVal(){
        Axios.get(`http://localhost:3001/getSensorVal/${farmname}/${Param}`,{ withCredentials: true })
             .then((response) => {setLightstate(parseInt(response.data[0].iot_light) === 1? true : false)})
    }

    function BtnFn(){
        // clearInterval(ID);
        // setID(setInterval(getSensorVal,1600));
        getControllerStatus();
        //console.log(lightstate);
    }

    const handleChange = (event) => {
        setFarmname(event.target.value);
        //console.log(plantname)
    };

    const getControllerStatus = () => {
      Axios.get(`http://localhost:3001/getController/${farmname}/${Param}`,{ withCredentials: true }).then((response) => {
        setChecked1(response.data[0].light_MC === 1? true : false);
        setLightstate(response.data[0].light === 1? true : false);
        console.log(lightstate)
      })
    }
    const pushControllerStatus = () => {
      Axios.put(`http://localhost:3001/pushController/${farmname}/${Param}`,{ light_MC: checked1, light_checked: lightstate },{ withCredentials: true })
      .then((response) => {alert(response.data.message)})
    }

    function checkSession(){
      let ck = "check"
      // if(window.localStorage.getItem("users") != undefined){
      //   ck = "clear"
      // }
        Axios.get(`http://localhost:3001/session/${ck}`, {withCredentials: true}).then((response) => {
          console.log(localStorage.getItem("users"))
          if (response.data.loggedIn === false) {
            alert("Session not found :-( , redirect to login page.")
            navigate("/login")}
      })
    }
    
      useEffect(() => {
        checkSession();
      },[]);

      useEffect(() => {
        function getResults() {
          Axios.get("http://localhost:3001/farmname",{ withCredentials: true }).then(res => res.data).then(data => setPosts(data)).catch(err => console.error(err))
        }
       /* async function checkSS() {
          const results = await Axios.get(`http://localhost:3001/session/${'check'}`, {withCredentials: true})
          setss(results.data.loggedIn)
          console.log(setss)
        }
        checkSS(); */
        getResults();
        return () =>  {clearInterval(ID)};
      }, [ID]);

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
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
            <Grid item xs={12} md={4}>
                <FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Farn name</InputLabel>
                    <Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={farmname} label="Farm name" input={<OutlinedInput label="Farm name" />}onChange={handleChange}>
                        {posts.map((posts) => (<MenuItem key={posts} value={posts}>{posts}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4}><Button onClick={BtnFn} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '210px' }}>Show information</Button></Grid>
            
                
                <Grid item xs={12} >{lighticon()}</Grid>
                <Grid item xs={12} className="clight">{lighttext()}</Grid>
                
                <Paper elevation={6} style={paperStyle2} >
                    
                    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={4} className="clight">Auto control</Grid>
                    <Grid item xs={1} ><Switch onClick={handleChangeManual} checked={checked1} /></Grid>
                    <Grid item xs={6} className="clight" >Manual control</Grid>
                    </Grid>
                    
                    <Grid  container spacing={5} direction="row" justifyContent="center" alignItems="center" >
                        <Grid className="clight" item xs={2} >Light</Grid>
                        <Grid item xs={2} className="clight">Off</Grid>
                        <Switch onClick={handleChangeControll} checked={lightstate} disabled={!checked1} />
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