import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Grid,Paper } from "@material-ui/core";
import ReactSpeedometer from "react-d3-speedometer";
import Axios from "axios";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";

function Temp() {

  const paperStyle = {padding: 20,height: "120vh",width: 700,margin: "10px auto",backgroundColor: "#f5f5f5"};
  const paperStyle2 = {padding: 30,height: "25vh",width: 380,margin: "10px auto",backgroundColor: "#f5f5f5"};
  const [farmname,setFarmname]=useState("")
  const [sensorread_Temp, setsensorread_Temp] = useState(8);
  const [plantname, setPlantname] = useState("");
  const [Range, setRange] = useState([]);
  const [Lowertemp, setLowertemp] = useState(20);
  const [Highertemp, setHighertemp] = useState(29);
  let [posts, setPosts] = useState([]);
  
  const getT = () => {
    Axios .get(`http://localhost:3001/getTemp/${farmname}`,{ withCredentials: true })
          .then((response) => {setsensorread_Temp(response.data[0].iot_temp)})
  };
  const getRange = () => {
    Axios.get(`http://localhost:3001/getrangeTemp/${farmname}`,{plantname: plantname},{ withCredentials: true }).then((response) => {
      setRange(response.data);
      console.log(response.data);
    });
  };
  const getControllerStatus = () => {
    Axios.get(`http://localhost:3001/getControllerTemp/${farmname}`,{plantname: plantname},{ withCredentials: true }).then((response) => {
      setChecked_MC(response.data[0].temp_MC);
      setChecked_Fan(response.data[0].fan);
      setChecked_HL(response.data[0].heatlight)
    });
  }
  const pushControllerStatus = () => {
    Axios.post("http://localhost:3001/pushControllerTemp",{ plantname: plantname, temp_MC: checked_MC },{ withCredentials: true })
    if (checked_MC == false) {
      Axios.post("http://localhost:3001/manualpushControllerTemp",{ plantname: plantname, fan: checked_fan, heatlight: checked_HL},{ withCredentials: true })
    }
  }
  const WrapperFn = () => {
    clearInterval(getT);
    setInterval(getT,1000);
    getRange();
    setLowertemp(Range[0].lowertemp);
    setHighertemp(Range[0].highertemp);
    getControllerStatus();
    pushControllerStatus();
  };

  const [checked_MC, setChecked_MC] = useState(false);
  const [checked_fan, setChecked_Fan] = useState(false);
  const [checked_HL, setChecked_HL] = useState(false);

  const handleChangeManual = (event) => {setChecked_MC(event.target.checked)};
  const handleChangeControl_Fan = (event) => {setChecked_Fan(event.target.checked)};
  const handleChangeControl_HL = (event) => {setChecked_HL(event.target.checked)};
  const handleChange = (event) => {setFarmname(event.target.value)};

  useEffect(() => {
    async function getResults() {
      const results = await Axios("http://localhost:3001/farmname",{ withCredentials: true });
      setPosts(results.data);
    }
    getResults();
  }, []);
  //console.log(posts);
  return (
    <Grid align="center">
      <Navbar />
      <Paper elevation={0} style={paperStyle}>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={2}><img className="homephoto" src="/Temp.png" /></Grid>
          <Grid item xs={6}><h2 className="app-front" style={{ color: "#008000" }}>Temperature</h2></Grid>
        </Grid>

        <Grid container rowSpacing={4} direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Farm name</InputLabel>
              <Select style={{ minWidth: "220px" }} labelId="demo-multiple-name-label" id="demo-multiple-name" value={farmname} label="Farm name" input={<OutlinedInput label="plantname" />} onChange={handleChange}>
                {posts.map((posts) => (<MenuItem key={posts} value={posts}>{posts}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button onClick={WrapperFn} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{ minWidth: "210px" }}>
              Show information
            </Button>
          </Grid>
        </Grid>

        
        
        <ReactSpeedometer
          value={sensorread_Temp}
          width={400}
          height={245}
          minValue={Lowertemp + (Lowertemp - Highertemp)}
          maxValue={Highertemp + (Highertemp - Lowertemp)}
          valueTextFontSize={20}
          needleColor="#662200"
          needleTransitionDuration={2222}
          needleTransition="easeElastic"
          segments={3}
          paddingVertical={60}
          segmentColors={["#b3ff66", "#00b300", "#e6b800"]}
          customSegmentLabels={[
            {
              text: "Low Temp",
              position: "OUTSIDE",
              color: "#555",
              fontSize: "16px",
            },
            {
              text: "Normal Temp",
              position: "OUTSIDE",
              color: "#555",
              fontSize: "16px",
            },
            {
              text: "High Temp",
              position: "OUTSIDE",
              color: "#555",
              fontSize: "1ู6px",
            },
          ]}
        />

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
            <Button variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{ minWidth: "100px" }} onClick={WrapperFn}>
              Save
            </Button>
          </Grid>

        </Paper>
      </Paper>
    </Grid>
  );
}
export default Temp;
