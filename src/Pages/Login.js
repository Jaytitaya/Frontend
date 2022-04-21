import React, {useState ,useEffect,useContext} from 'react';
import {Grid, TextField, Typography, Link} from '@material-ui/core';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
//import { LoginContext } from '../App';

const Login=()=>{
    const navigate = useNavigate();
    const [username, setUserName]=useState("");
    const [passwords, setPasswords]=useState("");
    const [loginStatus, setLoginStatus]=useState("");
    const [loginState, setLoginState]=useState("");
    //const {setUserName} = useContext(LoginContext);
    //const {username} = useContext(LoginContext);
    useEffect(()=>{
        if (localStorage.getItem('users')){
            navigate("/login")
        }
    },[]);
    useEffect(()=>{
        Axios.get("http://localhost:3001/login").then((response)=>{
            if (response.data.loggedInd == true){
                setLoginState(response.data.users);
                console.log(response.data.users);
            };
        });
    },[]); 
    //async function absignin(){
    //    console.warn(username,passwords)
    //    let item = {username,passwords};
    //    let result = await fetch("http://localhost:3001/login",{
    //        method:'POST',
    //        headers:{
    //            "Content-Type":"application/json",
    //            "Accept":'application/json'
    //        },
    //        body: JSON.stringify(item)
    //    });
    //    result = await result.json();
    //    window.localStorage.setItem("users",JSON.stringify(result))
    //    console.log(window.localStorage)    
    //}

    async function signin(){
        Axios.defaults.withCredentials = true
        console.warn(username,passwords)
        let item = {username,passwords};
        let result = await fetch("http://localhost:3001/login",{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":'application/json'
            },
            body: JSON.stringify(item)
        });
        result = await result.json();
        //window.localStorage.setItem("users",JSON.stringify(result))
       Axios.post('http://localhost:3001/login',{
           username: username,
           passwords: passwords
        }).then((response)=>{
            console.log(response.data[0]);
            if(response.data.message){
                navigate("/login")
                setLoginStatus(response.data.message)
            }else{
                //console.log({username})
                localStorage.setItem("users",JSON.stringify(item.username))
                setLoginState(response.data.users)
                console.log(loginState)
                //document.cookie = "username=" + response.data.users.username
                navigate("/home")
            }
        })
    }
    
    return(
        <Grid align='center' >
            <h2 className="app-front" style={{color:'#008000'}}>Smart Farm </h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Username*" variant="outlined" style={{minWidth: '250px'}} onChange={e => setUserName(e.target.value)}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" type="password" label="Password*" variant="outlined" style={{minWidth: '250px'}} onChange={e => setPasswords(e.target.value)}/>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button onClick={signin} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '250px'}}>Sign in</Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography style={{color:'#a9a9a9'}}>Do you have an account?
                        <Link href="#" onClick={()=>{navigate("/signup")}} style={{color:'#696969'}}>
                            Sign up
                        </Link>
                    </Typography>
                </Grid>
                <Grid item xs={12}><b>{loginStatus}</b></Grid>
                <Grid item xs={12}>
                    <img className="app-login-photo" src="/Loginphoto.png" />
                </Grid>
            </Grid>
        </Grid>
        
    )
}

export default Login