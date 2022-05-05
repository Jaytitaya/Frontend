import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Grid, Paper } from "@material-ui/core";
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

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

function Temp() {

  const paperStyle = {padding: 20,height: "120vh",width: 700,margin: "10px auto",backgroundColor: "#f5f5f5"};
  const paperStyle2 = {padding: 30,height: "25vh",width: 380,margin: "10px auto",backgroundColor: "#f5f5f5"};
  const [farmname,setFarmname]=useState("")
  const [sensorread_Temp, setsensorread_Temp] = useState(0);
  const [Lowertemp, setLowertemp] = useState(20);
  const [Highertemp, setHighertemp] = useState(29);
  const [ID,setID] = useState(0);
  const Param = "temp";
  //const [status, setStatus] = useState("");
  let [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [showgate, setShowgate] = useState(true);
  const [forceRender,setForceRender] = useState(true);
  const [plotdata,setPlotdata] = useState([])
  const url = process.env.REACT_APP_HOST;
  const port = process.env.REACT_APP_BE_PORT;

  function getSensorVal(){
    Axios.get(`http://${url}:${port}/getSensorVal/${farmname}/${Param}`,{ withCredentials: true })
         .then((response) => {setsensorread_Temp(response.data[0].iot_temp)
        if(forceRender === true){setForceRender(false)}})
  }
  function getPlant(){
    Axios.get(`http://${url}:${port}/getPlantname/${farmname}`,{ withCredentials: true })
         .then((response) => {getRange(response.data[0].farm_plant,response.data[0].farm_stage);})
  }
  function getRange(plant_name, stage_name){
    Axios.get(`http://${url}:${port}/getRange/${plant_name}/${stage_name}/${Param}`,{ withCredentials: true })
         .then((response) => {
           setLowertemp(response.data[0].lowertemp);
           setHighertemp(response.data[0].highertemp);
          })
          .catch(err => console.log(err))
  };
  const getControllerStatus = () => {
    Axios.get(`http://${url}:${port}/getController/${farmname}/${Param}`,{ withCredentials: true }).then((response) => {
      setChecked_MC(response.data[0].temp_MC === 1? true : false);
      setChecked_Fan(response.data[0].fan === 1? true : false);
      setChecked_HL(response.data[0].heatlight === 1? true : false);
    })
  }
  const pushControllerStatus = () => {
    Axios.put(`http://${url}:${port}/pushController/${farmname}/${Param}`,{ temp_MC: checked_MC, fan: checked_fan, heatlight: checked_HL },{ withCredentials: true })
    .then((response) => {alert(response.data.message)})
  }
  function BtnFn(){
    setForceRender(true);
    clearInterval(ID);
    getPlant();
    getDataToPlot();
    getControllerStatus();
    setShowgate(true);
    setID(setInterval(getSensorVal,1600));
  }

  function getDataToPlot(){
    Axios.get(`http://${url}:${port}/getPlot/${farmname}/${Param}`,{ withCredentials: true })
         .then((response) => {
           setPlotdata(response.data)
           console.log(response.data)
         })
  }

  function checkSession(){
    let ck = "check"
    // if(window.localStorage.getItem("users") != undefined){
    //   ck = "clear"
    // }
      Axios.get(`http://${url}:${port}/session/${ck}`, {withCredentials: true}).then((response) => {
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
  const [checked_fan, setChecked_Fan] = useState(false);
  const [checked_HL, setChecked_HL] = useState(false);

  const handleChangeManual = (event) => {setChecked_MC(event.target.checked)};
  const handleChangeControl_Fan = (event) => {setChecked_Fan(event.target.checked)};
  const handleChangeControl_HL = (event) => {setChecked_HL(event.target.checked)};
  const handleChange = (event) => {setFarmname(event.target.value)};


  useEffect(() => {
    checkSession();
  },[]);

  // const data = {
  //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };



  useEffect(() => {
    function getResults() {
      Axios.get(`http://${url}:${port}/farmname`,{ withCredentials: true }).then(res => res.data).then(data => setPosts(data)).catch(err => console.log(err))
    }
   /* async function checkSS() {
      const results = await Axios.get(`http://${url}:${port}/session/${'check'}`, {withCredentials: true})
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
          <Grid item xs={2}><img className="homephoto" src="/Temp.png" alt="Temp"/></Grid>
          <Grid item xs={6}><h2 className="app-front" style={{ color: "#008000" }}>Temperature</h2></Grid>
        </Grid>

        <Grid container rowspacing={4} direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Farm name</InputLabel>
              <Select defaultValue = "" style={{ minWidth: "220px" }} labelId="demo-multiple-name-label" id="demo-multiple-name" label="Farm name" input={<OutlinedInput label="plantname" />} onChange={handleChange}>
                {posts.map((post) => (<MenuItem key={post} value={post}>{post}</MenuItem>))}
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
          value={sensorread_Temp}
          width={400}
          height={245}
          minValue={Lowertemp + (Lowertemp - Highertemp)}
          maxValue={Highertemp + (Highertemp - Lowertemp)}
          valueTextFontSize={"20"}
          needleColor="#662200"
          needleTransitionDuration={500}
          needleTransition="easeCubicOut"
          segments={3}
          paddingVertical={60}
          currentValueText = {`${sensorread_Temp}°C`}
          segmentColors={["#b3ff66", "#00b300", "#e6b800"]}
          forceRender={forceRender}
          // customSegmentLabels={[
          //   {
          //     text: "Low Temp",
          //     position: "OUTSIDE",
          //     color: "#555",
          //     fontSize: "16px",
          //   },
          //   {
          //     text: "Normal Temp",
          //     position: "OUTSIDE",
          //     color: "#555",
          //     fontSize: "16px",
          //   },
          //   {
          //     text: "High Temp",
          //     position: "OUTSIDE",
          //     color: "#555",
          //     fontSize: "1ู6px",
          //   },
          // ]}
        />}

        {/* <Pie data={data} /> */}

        <Grid item xs={12} className="headcard">Temperature Controller</Grid>
        <Paper elevation={6} style={paperStyle2}>
          <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={4} className="clight">Auto control</Grid>
            <Grid item xs={1}><Switch onClick={handleChangeManual} checked={checked_MC} /></Grid>
            <Grid item xs={6} className="clight">Manual control</Grid>
          </Grid>

          <Grid container spacing={5} direction="row" justifyContent="center" alignItems="center">
            <Grid className="clight" item xs={5}>Fan</Grid>
            <Grid item xs={2} className="clight">Off</Grid>
            <Switch onClick={handleChangeControl_Fan} checked={checked_fan} disabled={!checked_MC}/>
            <Grid item xs={2} className="clight">On</Grid>
          </Grid>

          <Grid container spacing={5} direction="row" justifyContent="center" alignItems="center">
            <Grid className="clight" item xs={5}>HeatLight</Grid>
            <Grid item xs={2} className="clight">Off</Grid>
            <Switch onClick={handleChangeControl_HL} checked={checked_HL} disabled={!checked_MC}/>
            <Grid item xs={2} className="clight">On</Grid>
          </Grid>

          <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
            <Button variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{ minWidth: "100px" }} onClick={BtnFn2}>
              SAVE
            </Button>
          </Grid>
        </Paper>
      </Paper>
    </Grid>
  );
}
export default Temp;
