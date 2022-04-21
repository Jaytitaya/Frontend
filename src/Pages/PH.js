import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Grid, TextField, Paper, TypograpHy } from "@material-ui/core";
import ReactSpeedometer from "react-d3-speedometer";
import Axios from "axios";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import {useNavigate} from "react-router-dom";

function PH() {

  const paperStyle = {padding: 20,height: "120vh",width: 700,margin: "10px auto",backgroundColor: "#f5f5f5"};
  const paperStyle2 = {padding: 30,height: "25vh",width: 380,margin: "10px auto",backgroundColor: "#f5f5f5"};
  const [farmname,setFarmname]=useState("")
  const [sensorread, setSensorread] = useState(25);
  const [lowerph, setlowerph] = useState(20);
  const [higherph, sethigherph] = useState(29);
  const [ID,setID] = useState(0);
  const Param = "ph";
  const [status, setStatus] = useState("");
  let [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [showgate, setShowgate] = useState(true);
  const [forceRender,setForceRender] = useState(true);

  function getSensorVal(){
    Axios.get(`http://localhost:3001/getSensorVal/${farmname}/${Param}`,{ withCredentials: true })
         .then((response) => {setSensorread(response.data[0].iot_ph)
        if(forceRender === true){setForceRender(false)}})
  }
  function getPlant(){
    Axios.get(`http://localhost:3001/getPlantname/${farmname}`,{ withCredentials: true })
         .then((response) => {getRange(response.data[0].farm_plant,response.data[0].farm_stage);})
  }
  function getRange(plant_name, stage_name){
    Axios.get(`http://localhost:3001/getRange/${plant_name}/${stage_name}/${Param}`,{ withCredentials: true })
         .then((response) => {
           setlowerph(response.data[0].lowerph);
           sethigherph(response.data[0].higherph);
          })
          .catch(err => console.log(err))
  };
  const getControllerStatus = () => {
    Axios.get(`http://localhost:3001/getController/${farmname}/${Param}`,{ withCredentials: true }).then((response) => {
      setChecked_MC(response.data[0].pH_MC === 1? true : false);
      setChecked_phlow(response.data[0].phlow === 1? true : false);
      setChecked_phhigh(response.data[0].phhigh === 1? true : false);
    })
  }
  const pushControllerStatus = () => {
    Axios.put(`http://localhost:3001/pushController/${farmname}/${Param}`,{ ph_MC: checked_MC, phlow: checked_phlow, phhigh: checked_phhigh },{ withCredentials: true })
    .then((response) => {alert(response.data.message)})
  }

  function BtnFn(){
    setForceRender(true)
    clearInterval(ID);
    getPlant();
    getControllerStatus();
    setShowgate(true);
    setID(setInterval(getSensorVal,1600));
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
  function BtnFn2(){
    pushControllerStatus();
  }

  const [checked_MC, setChecked_MC] = useState(false);  
  const [checked_phlow, setChecked_phlow] = useState(false);
  const [checked_phhigh, setChecked_phhigh] = useState(false);

  const handleChangeManual = (event) => {setChecked_MC(event.target.checked)};
  const handleChangeControl_phlow = (event) => {setChecked_phlow(event.target.checked)};
  const handleChangeControl_phhigh = (event) => {setChecked_phhigh(event.target.checked)};
  const handleChange = (event) => {setFarmname(event.target.value)};


  useEffect(() => {
    checkSession();
  },[]);

  useEffect(() => {
    function getResults() {
      Axios.get("http://localhost:3001/farmname",{ withCredentials: true }).then(res => res.data).then(data => setPosts(data)).catch(err => console.log(err))
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

  return (
    <Grid align="center">
      <Navbar />
      <Paper elevation={0} style={paperStyle}>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={8}><h2 className="app-front" style={{ color: "#008000" }}>pH</h2></Grid>
        </Grid>

        <Grid container rowSpacing={4} direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Farm name</InputLabel>
              <Select style={{ minWidth: "220px" }} labelId="demo-multiple-name-label" id="demo-multiple-name" value={farmname} label="farmname" input={<OutlinedInput label="farmname" />} onChange={handleChange}>
                {posts.map((posts) => (<MenuItem key={posts} value={posts}>{posts}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button onClick={BtnFn} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{ minWidth: "210px" }}>
              Show information
            </Button>
          </Grid>
        </Grid>

        
        {showgate&&<ReactSpeedometer
          value={sensorread}
          width={400}
          height={245}
          minValue={lowerph + (lowerph - higherph)}
          maxValue={higherph + (higherph - lowerph)}
          //minValue={0}
          //maxValue={10}
          //customSegmentStops={[0,lowerph, higherph, 10]}
          valueTextFontSize={"20"}
          needleColor="#662200"
          needleTransitionDuration={500}
          needleTransition="easeCubicOut"
          segments={3}
          paddingVertical={60}
          currentValueText = "${value}"
          segmentColors={["#b3ff66", "#00b300", "#e6b800"]}
          forceRender={forceRender}
          // customSegmentLabels={[
          //   {
          //     text: "Low ph",
          //     position: "OUTSIDE",
          //     color: "#555",
          //     fontSize: "16px",
          //   },
          //   {
          //     text: "Normal ph",
          //     position: "OUTSIDE",
          //     color: "#555",
          //     fontSize: "16px",
          //   },
          //   {
          //     text: "High ph",
          //     position: "OUTSIDE",
          //     color: "#555",
          //     fontSize: "1ู6px",
          //   },
          // ]}
        />}

      <Grid item xs={12} className="headcard">pH Controller</Grid>
        <Paper elevation={6} style={paperStyle2}>
          <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={4} className="clight">Auto control</Grid>
            <Grid item xs={1}><Switch onClick={handleChangeManual} checked={checked_MC} /></Grid>
            <Grid item xs={6} className="clight">Manual control</Grid>
          </Grid>

          <Grid container spacing={5} direction="row" justifyContent="center" alignItems="center">
            <Grid className="clight" item xs={2}>Acid</Grid>
            <Grid item xs={2} className="clight">Off</Grid>
            <Switch onClick={handleChangeControl_phlow} checked={checked_phlow} disabled={!checked_MC}/>
            <Grid item xs={2} className="clight">On</Grid>
          </Grid>

          <Grid container spacing={5} direction="row" justifyContent="center" alignItems="center">
            <Grid className="clight" item xs={2}>Base</Grid>
            <Grid item xs={2} className="clight">Off</Grid>
            <Switch onClick={handleChangeControl_phhigh} checked={checked_phhigh} disabled={!checked_MC}/>
            <Grid item xs={2} className="clight">On</Grid>
          </Grid>

          <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
            <Button variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{ minWidth: "100px" }} onClick={BtnFn2}>
              Save
            </Button>
          </Grid>

        </Paper>
      </Paper>
    </Grid>
  );
}
export default PH;
