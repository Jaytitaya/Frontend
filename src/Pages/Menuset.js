import React, {useState,useEffect} from 'react'
import Navbar from '../Components/Navbar';
import {Grid, Paper, Avatar, TextField, Typography, Link} from '@material-ui/core'
import Button from '@mui/material/Button';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
const BB = styled.button`
    background-color:#f5f5f5;
    border: 4px solid #008000;
    border-radius: 8px;
    padding: 30px 90px;
    cursor: pointer;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 25px;
    transition: ease background-color 250ms;
    &:hover{
        background-color:#000000; 
        color: white;
    }`
const BP = styled.button`
    background-color:#f5f5f5;
    border: 4px solid #008000;
    border-radius: 8px;
    padding: 30px 52px;
    cursor: pointer;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 25px;
    transition: ease background-color 250ms;
    &:hover{
        background-color:#000000; 
        color: white;
    }`

const Menuset=()=>{
    const paperStyle={padding:20,height:'50vh',width:400,margin:"40px auto",backgroundColor: '#f5f5f5'}
    const navigate = useNavigate();
    const Button = BB
    const ButtonP = BP

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
           <h2 className="app-front" style={{color:'#008000'}}>Configuration</h2>
           <Paper elevation={0} style={paperStyle}>
           <Grid container spacing={6} >
                <Grid item xs={12}>
                    <Button onClick={()=>{navigate("/plantsetting")}} >New Plant</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={()=>{navigate("/farmsetting")}}>New Farm</Button>
                </Grid>
                <Grid item xs={12}>
                    <ButtonP onClick={()=>{navigate("/addnewplant")}} >Plant Parameters</ButtonP>
                </Grid>
           </Grid>
           </Paper>
        </Grid>
    )
}

export default Menuset