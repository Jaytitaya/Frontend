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
    const [plantname,setPlantname]=useState("")
    const [farmname,setFarmname]=useState("")
    const [plantsList, setPlantsList] = useState([])
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [lightstate, setLightstate] = useState("1");
    const [Param,setParam] = useState("light");
    const [ID,setID] = useState(0);
    let [ posts, setPosts ] = useState([])

    const handleChangeManual = (event) => {setChecked1(event.target.checked)};
    const handleChangeControll = (event) => {setChecked2(event.target.checked)};

    function lighticon(){
        if (lightstate === "1"){
            
            return <WbIncandescentIcon style={{ fontSize: 100, color: yellow[700] }}/>;
        }else{
            return <WbIncandescentIcon style={{ fontSize: 100 }}/>;
        }
    }

    function lighttext(){
        if (lightstate === "1"){
            return "Open";
        }else{
            return "Close";
        }
    }

    

    async function getSensorVal(){
        const results = await Axios.get(`http://localhost:3001/getSensorVal/${farmname}/${Param}`,{ withCredentials: true });
        setLightstate(parseInt(results.data[0].iot_light));
        console.log(lightstate);
    }

    function BtnFn(){
        clearInterval(ID);
        //getControllerStatus();
        setID(setInterval(getSensorVal,1600));
        //console.log(lightstate);

    }

    useEffect(() => {
        function getResults() {
          Axios.get("http://localhost:3001/farmname",{ withCredentials: true }).then(res => res.data).then(data => setPosts(data)).catch(err => alert("log in first !"))
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

      function checkSession(){
        let ck = "check"
        
      /*  if(window.localStorage.getItem("users") != undefined){
          ck = "check"
        }*/
          Axios.get(`http://localhost:3001/session/${ck}`, {withCredentials: true}).then((response) => {
            console.log(window.localStorage.getItem("users"))
            if (response.data.loggedIn === false) {navigate("/login")}
        })
      }
    
      useEffect(() => {
        checkSession();
      },[]);

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
            <Grid item xs={12} md={4}><Button onClick={BtnFn} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '210px' }}>Show light state</Button></Grid>
            
                
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