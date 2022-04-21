import React, {useState,useEffect} from 'react'
import {Grid, Paper, Avatar, TextField, Typography, Link} from '@material-ui/core'
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';

const Signup=()=>{
    const paperStyle={padding:20,height:'80vh',width:400,margin:"60px auto",backgroundColor: '#f5f5f5'}
    const avatarStyle={backgroundColor:'green', width:56, height:56}
    const navigate = useNavigate();
    const [firstname,setFirstname]=useState("")
    const [lastname,setLastname]=useState("")
    const [username,setUsername]=useState("")
    const [passwords,setPasswords]=useState("")
    const [userList, setUserList] = useState([])
    const [registerStatus, setRegisterStatus]=useState("")
 
    const addUser = () => {
        Axios.post('http://localhost:3001/create',{
            firstname: firstname,
            lastname: lastname,
            username: username,
            passwords: passwords
        })
        .then((response)=>{
            navigate("/signup");
            setRegisterStatus(response.data.message);
        })
        .then(() => {
            setUserList([
                ...userList,
            {
                firstname: firstname,
                lastname: lastname,
                username: username,
                passwords: passwords 
            }
            ])
        })
    }
    return(
        <Grid align='center'>
            
            <Paper elevation={0} style={paperStyle}>
                <Avatar style={avatarStyle} ><LockOutlinedIcon/></Avatar>
                <h2 className="app-front" style={{color:'#008000'}}>Sign up </h2>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <TextField id="outlined-basic" label="First name*" variant="outlined" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                    </Grid>
                    
                    <Grid item xs={6} md={6}>
                        <TextField id="outlined-basic" label="Last name*" variant="outlined" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                    </Grid>
                    
                    <Grid item xs={12} >
                        <TextField id="outlined-basic" label="Username*" variant="outlined" style={{minWidth: '400px'}} value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" type="password" label="Password*" variant="outlined" style={{minWidth: '400px'}} value={passwords} onChange={(e) => setPasswords(e.target.value)}/>
                    </Grid>
                    
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button onClick={addUser} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '400px'}}>Sign up</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}><b>{registerStatus}</b></Grid>
                <Grid item xs={12}>
                    <Typography style={{color:'#a9a9a9'}}>Already have an account?
                        <Link href="#" onClick={()=>{navigate("/login")}} style={{color:'#696969'}}>
                            Sign in
                        </Link>
                    </Typography>
                </Grid>
            </Paper>
            
        </Grid>
    )
}

export default Signup