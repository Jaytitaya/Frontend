import React,{Component,useState,useContext,useEffect} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, Paper} from '@material-ui/core';
import {Avatar} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Axios from 'axios';
import { LoginContext } from '../App';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';



const Myplant=()=>{
    const avatarStyle={backgroundColor:'green', width:40, height:56, cursor: 'pointer'}
    const navigate = useNavigate();
    //const {username} = localStorage.username;
    //const {username} = useContext(LoginContext);
    const [plantsList, setPlantsList] = useState([]);
    const plantnames = [];
    const [pname, setPname] = useState([]);
    const [names, setNames] = useState("");
    const handleChange = (event) => {
        setNames(event.target.value);
      };

    //useEffect(()=>{
        //Axios.get('http://localhost:3001/plants', { withCredentials: true }).then((response)=>{
        //    setPname(response.result);
        //    console.log(pname)
            
            //for (let index = 0; index < pname.length; index++) {
            //        plantnames.push(pname[index].plantname)
            //}
            //let unique = [...new Set(plantnames)]
            
        //});
        //console.log(plantnames)
    //},[]); 

    const getPlants = () =>{
        Axios.get('http://localhost:3001/plants', { withCredentials: true }).then((response)=>{
            setPlantsList(response.data);
        });
    }

    return(
        <Grid align='center'>
            <Navbar/>
            <h2 className="app-front" style={{color:'#008000'}}>My Plant</h2>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={3} md={2} >
                <FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Plant</InputLabel>
                    <Select style={{minWidth: '200px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={names}  label="Plant" input={<OutlinedInput label="Plant" />} onChange={handleChange}>
                        {plantnames.map((plantnames) => (<MenuItem key={plantnames} value={plantnames}>{plantnames}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={3} md={2}><Button onClick={getPlants} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '210px' }}>Show information</Button></Grid>
            </Grid>
            {plantsList.map((val,key)=>{
            return(
                 <div className='card-container'>
                    <div className="card-content">
                        <div className="card-title">
                            <h3>{val.plantname}</h3>
                        </div>
                        <div className="card-body">
                            <p>Stage:{val.stage}</p>
                            <p>open time - close time:{val.opentime}-{val.closetime}</p>
                            <p>Temperature:{val.lowertemp}-{val.highertemp}Celsius</p>
                            <p>Humidity:{val.lowerhumid}-{val.higherhumid}%</p>
                            <p>pH:{val.lowerpH}-{val.higherpH}</p>
                        </div>
                    </div>
        
                    <div className="btn">
                        <Avatar onClick={()=>{navigate("/addnewplant")}} style={avatarStyle} ><EditIcon/></Avatar>
                        <Avatar style={avatarStyle} ><DeleteIcon/></Avatar>
                    </div>
                </div>
                
            )
        })}
        </Grid> 
    )

}
export default Myplant