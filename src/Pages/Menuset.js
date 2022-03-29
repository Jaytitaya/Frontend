import React, {useState,useEffect} from 'react'
import Navbar from '../Components/Navbar';
import {Grid, Paper, Avatar, TextField, Typography, Link} from '@material-ui/core'
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';

const Menuset=()=>{
    const paperStyle={padding:20,height:'80vh',width:400,margin:"60px auto",backgroundColor: '#f5f5f5'}
    const avatarStyle={backgroundColor:'green', width:56, height:56}
    const navigate = useNavigate();
    const [firstname,setFirstname]=useState("")
    const [lastname,setLastname]=useState("")
    const [username,setUsername]=useState("")
    const [passwords,setPasswords]=useState("")
    const [userList, setUserList] = useState([])
    const [registerStatus, setRegisterStatus]=useState("")
 
    
    return(
        <Grid align='center'>
           <Navbar/>
           <Button variant="outlined" color="error">Error</Button>
        </Grid>
    )
}

export default Menuset