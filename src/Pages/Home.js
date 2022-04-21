import React, {useEffect} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, Paper} from '@material-ui/core'
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';

const B = styled.button`
background-color:#ffffff;
border: 4px solid #008000;
border-radius: 8px;
padding: 20px 40px;
cursor: pointer;
transition: ease background-color 250ms;
&:hover{
    background-color:#000000; 
}`
const BT = styled.button`
background-color:#ffffff;
border: 4px solid #008000;
border-radius: 8px;
padding: 20px 35px ;
cursor: pointer;
transition: ease background-color 250ms;
&:hover{
    background-color:#000000; 
}`
const BpH = styled.button`
background-color:#ffffff;
border: 4px solid #008000;
border-radius: 8px;
margin-top: 2rem;
padding: 0px 53px ;
cursor: pointer;
transition: ease background-color 250ms;
&:hover{
    background-color:#000000; 
}`
const BH = styled.button`
background-color:#ffffff;
border: 4px solid #008000;
border-radius: 8px;
margin-top: 2rem;
padding: 19px 35px;
cursor: pointer;
transition: ease background-color 250ms;
&:hover{
    background-color:#000000; 
}`

const Home=()=>{
    const paperStyle={padding:20,height:'80vh',width:400,margin:"10px auto",backgroundColor: '#f5f5f5'}
    const navigate = useNavigate();
    const Button = B
    const ButtonTemp = BT
    const ButtonpH = BpH
    const ButtonHumid = BH

    useEffect(() => {
        checkSession();
      },[]);
      
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

    return(
        <Grid align='center'>
            <Navbar/>
            <Paper elevation={0} style={paperStyle}>
            <h2 className="app-front" style={{color:'#008000'}}>Home</h2>
            <Grid container spacing={2} >
                <Grid item xs={6}>
                    <Button onClick={()=>{navigate("/light")}}><img className="homephoto" src="/light.png" /></Button>
                </Grid>
                <Grid item xs={6}>
                    <ButtonTemp onClick={()=>{navigate("/temp")}}><img className="homephoto" src="/Temp.png" /></ButtonTemp>
                </Grid>
                <Grid item xs={6}>
                    <ButtonHumid onClick={()=>{navigate("/humid")}}><img className="homephoto" src="/Humidity.png" /></ButtonHumid>
                </Grid>
                <Grid item xs={6}>
                    <ButtonpH onClick={()=>{navigate("/pH")}}><h2 className="app-front" style={{color:'#008000'}}>pH</h2></ButtonpH>
                </Grid>
            </Grid>
            </Paper>
        </Grid>
    )
}
export default Home