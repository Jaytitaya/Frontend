import React,{useState,useContext,useEffect} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, Paper} from '@material-ui/core';
import {Avatar} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Axios from 'axios';
import { LoginContext } from '../App';

const Myplant=()=>{
    const avatarStyle={backgroundColor:'green', width:40, height:56, cursor: 'pointer'}
    const navigate = useNavigate();
    //const {username} = localStorage.username;
    const {username} = useContext(LoginContext);
    const [plantsList, setPlantsList] = useState([])
    const getPlants = () =>{
        Axios.get('http://localhost:3001/plants', { withCredentials: true }).then((response)=>{
            setPlantsList(response.data);
        });
    }
    
    return(
        <Grid align='center'>
            <Navbar/>
            <h2 className="app-front" style={{color:'#008000'}}>My Plant</h2>
           
            <Grid item xs={12}><Button onClick={getPlants} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '300px' }}>Show information</Button></Grid>
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