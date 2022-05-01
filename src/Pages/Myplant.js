<<<<<<< HEAD
import React,{Component,useState,useContext,useEffect} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, Paper} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
//import { LoginContext } from '../App';


const Myplant=()=>{
    const avatarStyle={backgroundColor:'green', width:40, height:56}
    const navigate = useNavigate();
    //const {username} = localStorage.username;
    //const {username} = useContext(LoginContext);
    const [plantsList, setPlantsList] = useState([]);
    const [updateplantsList, setUpdatePlantsList] = useState([]);
    const [plantname,setPlantname]=useState("")
    const [stage,setStage]=useState("")
    const [pname, setPname] = useState([]);
    const [names, setNames] = useState("");
    const [newselectstage,setNewSelectstage]= useState(false)
    const [newPlantname,setNewPlantname]= useState("");
    const [newStage,setNewStage]= useState("");
    const [newOpentime,setNewOpentime]= useState("");
    const [newClosetime,setNewClosetime]= useState("");
    const [newLowertemp,setNewLowertemp]= useState("");
    const [newHighertemp,setNewHighertemp]= useState("");
    const [newLowerhumid,setNewLowerhumid]= useState("");
    const [newHigherhumid,setNewHigherhumid]= useState("");
    const [newLowerpH,setNewLowerpH]= useState("");
    const [newHigherpH,setNewHigherpH]= useState("");
    const [state,setState]= useState("");
    const plantstage = [
        'Seeding stage',
        'Vegetation period',
        'Flowering period',
        'Lateflowering',
      ];

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

    const handleChange = (event) => {
        setPlantname(event.target.value);
        //console.log(plantname)
    };
    const handleNewChange = (event) => {
        setNewStage(event.target.value);
    };

    const  handleChangeselectstage =(event)=>{
        setNewSelectstage(event.target.checked)
    }
    //console.log({newselectstage})

    function checkorigin(props){
        const selectstage = props;
        if (selectstage === true || selectstage === "1"){
            
            return <Checkbox defaultChecked onChange={handleChangeselectstage} />;
        }else{
            return <Checkbox onChange={handleChangeselectstage} />;
        }
    }

    function Icon(props){
        const selectstage = props;
        
        if (selectstage === true || selectstage === "1"){
            return <CheckBoxIcon sx={{ color: grey[50] }}/>;
        }
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (props) => {
        const id = props;
        setState(id);

        plantsList.map((val) => {
            const isSelected = val.id === id
            if (isSelected) {
              setNewOpentime(val.opentime)
              setNewClosetime(val.closetime)
              setNewLowertemp(val.lowertemp)
              setNewHighertemp(val.highertemp)
              setNewLowerhumid(val.lowerhumid)
              setNewHigherhumid(val.higherhumid)
              setNewLowerpH(val.lowerpH)
              setNewHigherpH(val.higherpH)
              setNewSelectstage(val.selectstage)
            }
        })
       //console.log(updateplantsList);
       //console.log(updateplantsList[0].opentime)
       
       //console.log(newHighertemp);
       
       //setOpen(true);
    };
    //console.log(newOpentime,newClosetime,newLowertemp,newHighertemp)
    const handleClose = () => {
        setOpen(false);
        setState("");
    };
    const handleClickStage = (props) => {
        const selectstage = props
        if (selectstage === "on"){
            return setNewSelectstage("off");
        }else{
            return setNewSelectstage("on");
        }
        
    };
    let [ posts, setPosts ] = useState([])
    useEffect(()=>{
    async function getResults() {
      const results = await Axios('http://localhost:3001/plantname',{ withCredentials: true });
      setPosts(results.data);
    }
    getResults()
  

        //Axios.get('http://localhost:3001/plants', { withCredentials: true }).then((response)=>{
            //console.log(response.result)
            //setPname(response.result);
            //console.log(pname)
            
            //for (let index = 0; index < pname.length; index++) {
            //        plantnames.push(pname[index].plantname)
            //}
            //let unique = [...new Set(plantnames)]
            
        //});
        //console.log(plantnames)
    },[]); 
    //console.log(posts)

    const getPlants = () =>{
        Axios.post('http://localhost:3001/showparameter', {
            plantname : plantname
         },{ withCredentials: true }).then((response)=>{
            setPlantsList(response.data);
            
        });
    }

    const handleUpdate = (id) => {
        Axios.put("http://localhost:3001/updateparameter",
            {
                id:id, 
                opentime: newOpentime,
                closetime: newClosetime,
                lowertemp: newLowertemp,
                highertemp: newHighertemp,
                lowerhumid: newLowerhumid,
                higherhumid: newHigherhumid,
                lowerpH: newLowerpH,
                higherpH: newHigherpH,
                selectstage: newselectstage
            },{ withCredentials: true }).then((result)=>{
            setPlantsList(plantsList.map((val)=>{
                return val.id === id? 
                {
                    id: val.id, 
                    plantname: val.plantname,
                    stage: val.stage, 
                    opentime: newOpentime,
                    closetime: newClosetime,
                    lowertemp: newLowertemp,
                    highertemp: newHighertemp,
                    lowerhumid: newLowerhumid,
                    higherhumid: newHigherhumid,
                    lowerpH: newLowerpH,
                    higherpH: newHigherpH,
                    selectstage: newselectstage,
                }
                : val;
            }))
        });
        setState("");
    };

    const deleteData=(id)=>{
        //event.preventDefault();
        Axios.delete(`http://localhost:3001/deleteparameter/${id}`,{ withCredentials: true }).then((result)=>{
            setPlantsList(
                plantsList.filter((val)=>{
                    return val.id !== id;
                })
            )
        }).catch(err=>console.log(err))
    }

    return(
        <Grid align='center'>
            <Navbar/>
            <h2 className="app-front" style={{color:'#008000'}}>Parameters</h2>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={6} md={2} >
                <FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Plant name</InputLabel>
                    <Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={plantname} label="plantname" input={<OutlinedInput label="plantname" />}onChange={handleChange}>
                        {posts.map((posts) => (<MenuItem key={posts} value={posts}>{posts}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6} md={2}><Button onClick={getPlants} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '210px' }}>Show information</Button></Grid>
            </Grid>
            
            
                <TableContainer sx={{ width: "max-content" }} component={Paper}>
                    <Table sx={{ tableLayout: "auto" }}  aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{backgroundColor: "green"}}>
                                <TableCell sx={{color: "white"}}>Plant name</TableCell>
                                <TableCell sx={{color: "white"}} align="right">Stage</TableCell>
                                <TableCell sx={{color: "white"}} align="right">open time - close time</TableCell>
                                <TableCell sx={{color: "white"}} align="right">Temperature&nbsp;(°C)</TableCell>
                                <TableCell sx={{color: "white"}} align="right">Humidity&nbsp;(%)</TableCell>
                                <TableCell sx={{color: "white"}} align="right">pH</TableCell>
                                <TableCell sx={{color: "white"}} align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {plantsList.map((val)=>(
                        <TableBody>
                            <TableRow 
                            key={val.plantname}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {val.plantname}
                            </TableCell>
                            <TableCell align="right">{val.stage}</TableCell>
                            <TableCell align="right">{val.opentime} - {val.closetime}</TableCell>
                            <TableCell align="right">{val.lowertemp} - {val.highertemp}</TableCell>
                            <TableCell align="right">{val.lowerhumid} - {val.higherhumid}</TableCell>
                            <TableCell align="right">{val.lowerpH} - {val.higherpH}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={()=>handleClickOpen(val.id)}><EditIcon /></IconButton>
                                <IconButton onClick={()=>deleteData(val.id)}><DeleteIcon /></IconButton>
                            </TableCell>
                            </TableRow>
                        
                        </TableBody>
                        ))}
                    </Table>
                </TableContainer>
                
                {plantsList.map((val)=>(
                <Dialog PaperProps={{ sx: { width: "100%", height: "77%" } }} open={val.id===state} onClose={handleClose}>
                            <DialogTitle className="Dialog-Title">Edit Information</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                                    <Grid item xs={12}></Grid>
                                    <Grid item xs={12}>{val.plantname}</Grid> 
                                    <Grid item xs={12}>Stage : {val.stage}</Grid>
                                    <Grid item xs={12}>open time - close time : <TextField id="time" label="Open time" type="time" name="opentime" defaultValue={val.opentime} InputLabelProps={{shrink: true,}} inputProps={{step: 300,}} sx={{ width: 150 }} onChange={(e) => setNewOpentime(e.target.value)} /> - <TextField id="time" label="Close time" type="time" name="closetime" defaultValue={val.closetime} InputLabelProps={{shrink: true,}} inputProps={{step: 300,}} sx={{ width: 150 }} onChange={(e) => setNewClosetime(e.target.value)}/></Grid>
                                    <Grid item xs={12}>Temperature : <TextField style ={{width: '20%'}}  id="outlined-required" label="Temperature" defaultValue={val.lowertemp} onChange={(e) => setNewLowertemp(e.target.value)}/> - <TextField style ={{width: '20%'}}  id="outlined-required" label="Temperature" defaultValue={val.highertemp} onChange={(e) => setNewHighertemp(e.target.value)}/> °C </Grid>
                                    <Grid item xs={12}>Humidity : <TextField style ={{width: '20%'}}  id="outlined-required" label="Humidity" defaultValue={val.lowerhumid} onChange={(e) => setNewLowerhumid(e.target.value)}/> - <TextField style ={{width: '20%'}}  id="outlined-required" label="Humidity" defaultValue={val.higherhumid} onChange={(e) => setNewHigherhumid(e.target.value)}/> % </Grid>
                                    <Grid item xs={12}>pH : <TextField style ={{width: '20%'}}  id="outlined-required" label="pH" defaultValue={val.lowerpH}  onChange={(e) => setNewLowerpH(e.target.value)}/> - <TextField style ={{width: '20%'}}  id="outlined-required" label="pH" defaultValue={val.higherpH}  onChange={(e) => setNewHigherpH(e.target.value)}/></Grid>
                               
                                </Grid>
                            </DialogContent>
                            <DialogActions >
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={()=>handleUpdate(val.id)}>Save</Button>
                            </DialogActions>
                        </Dialog>
                ))}

            
                
            
        </Grid> 
    )

}
=======
import React,{useState,useEffect} from 'react';
import Navbar from '../Components/Navbar';
import {Grid, Paper} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
//import { LoginContext } from '../App';


const Myplant=()=>{
    const navigate = useNavigate();
    //const {username} = localStorage.username;
    //const {username} = useContext(LoginContext);
    const [plantsList, setPlantsList] = useState([]);
    const [plantname,setPlantname]=useState("")
    const [newselectstage,setNewSelectstage]= useState(false)
    const [newOpentime,setNewOpentime]= useState("");
    const [newClosetime,setNewClosetime]= useState("");
    const [newLowertemp,setNewLowertemp]= useState("");
    const [newHighertemp,setNewHighertemp]= useState("");
    const [newLowerhumid,setNewLowerhumid]= useState("");
    const [newHigherhumid,setNewHigherhumid]= useState("");
    const [newLowerpH,setNewLowerpH]= useState("");
    const [newHigherpH,setNewHigherpH]= useState("");
    const [state,setState]= useState("");
    const url = process.env.REACT_APP_HOST;
    const port = process.env.REACT_APP_BE_PORT;

      useEffect(() => {
        checkSession();
      },[]);
      
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

    const handleChange = (event) => {
        setPlantname(event.target.value);
        //console.log(plantname)
    };

    // const  handleChangeselectstage =(event)=>{
    //     setNewSelectstage(event.target.checked)
    // }
    //console.log({newselectstage})

    // function checkorigin(props){
    //     const selectstage = props;
    //     if (selectstage === true || selectstage === "1"){
            
    //         return <Checkbox defaultChecked onChange={handleChangeselectstage} />;
    //     }else{
    //         return <Checkbox onChange={handleChangeselectstage} />;
    //     }
    // }

    // function Icon(props){
    //     const selectstage = props;
        
    //     if (selectstage === true || selectstage === "1"){
    //         return <CheckBoxIcon sx={{ color: grey[50] }}/>;
    //     }
    // }
    // const [open, setOpen] = React.useState(false);

    const handleClickOpen = (props) => {
        const id = props;
        setState(id);

        plantsList.map((val) => {
            const isSelected = val.id === id
            if (isSelected) {
              setNewOpentime(val.opentime)
              setNewClosetime(val.closetime)
              setNewLowertemp(val.lowertemp)
              setNewHighertemp(val.highertemp)
              setNewLowerhumid(val.lowerhumid)
              setNewHigherhumid(val.higherhumid)
              setNewLowerpH(val.lowerpH)
              setNewHigherpH(val.higherpH)
              setNewSelectstage(val.selectstage)
            }
        })
       //console.log(updateplantsList);
       //console.log(updateplantsList[0].opentime)
       
       //console.log(newHighertemp);
       
       //setOpen(true);
    };
    //console.log(newOpentime,newClosetime,newLowertemp,newHighertemp)
    const handleClose = () => {
        setState("");
    };
    // const handleClickStage = (props) => {
    //     const selectstage = props
    //     if (selectstage === "on"){
    //         return setNewSelectstage("off");
    //     }else{
    //         return setNewSelectstage("on");
    //     }
        
    // };
    let [ posts, setPosts ] = useState([])
    useEffect(()=>{
    async function getResults() {
      const results = await Axios(`http://${url}:${port}/plantname`,{ withCredentials: true });
      setPosts(results.data);
    }
    getResults()
  

        //Axios.get('http://localhost:3001/plants', { withCredentials: true }).then((response)=>{
            //console.log(response.result)
            //setPname(response.result);
            //console.log(pname)
            
            //for (let index = 0; index < pname.length; index++) {
            //        plantnames.push(pname[index].plantname)
            //}
            //let unique = [...new Set(plantnames)]
            
        //});
        //console.log(plantnames)
    },[]); 
    //console.log(posts)

    const getPlants = () =>{
        Axios.post(`http://${url}:${port}/showparameter`, {
            plantname : plantname
         },{ withCredentials: true }).then((response)=>{
            setPlantsList(response.data);
            
        });
    }

    const handleUpdate = (id) => {
        Axios.put(`http://${url}:${port}/updateparameter`,
            {
                id:id, 
                opentime: newOpentime,
                closetime: newClosetime,
                lowertemp: newLowertemp,
                highertemp: newHighertemp,
                lowerhumid: newLowerhumid,
                higherhumid: newHigherhumid,
                lowerpH: newLowerpH,
                higherpH: newHigherpH,
                selectstage: newselectstage
            },{ withCredentials: true }).then((result)=>{
            setPlantsList(plantsList.map((val)=>{
                return val.id === id? 
                {
                    id: val.id, 
                    plantname: val.plantname,
                    stage: val.stage, 
                    opentime: newOpentime,
                    closetime: newClosetime,
                    lowertemp: newLowertemp,
                    highertemp: newHighertemp,
                    lowerhumid: newLowerhumid,
                    higherhumid: newHigherhumid,
                    lowerpH: newLowerpH,
                    higherpH: newHigherpH,
                    selectstage: newselectstage,
                }
                : val;
            }))
        });
        setState("");
    };

    const deleteData=(id)=>{
        //event.preventDefault();
        Axios.delete(`http://${url}:${port}/deleteparameter/${id}`,{ withCredentials: true }).then((result)=>{
            setPlantsList(
                plantsList.filter((val)=>{
                    return val.id !== id;
                })
            )
        }).catch(err=>console.log(err))
    }

    return(
        <Grid align='center'>
            <Navbar/>
            <h2 className="app-front" style={{color:'#008000'}}>Parameter</h2>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={3} md={2} >
                <FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Plant name</InputLabel>
                    <Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={plantname} label="plantname" input={<OutlinedInput label="plantname" />}onChange={handleChange}>
                        {posts.map((posts) => (<MenuItem key={posts} value={posts}>{posts}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={3} md={2}><Button onClick={getPlants} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '210px' }}>Show information</Button></Grid>
            </Grid>
            
            
                <TableContainer sx={{ width: "max-content" }} component={Paper}>
                    <Table sx={{ tableLayout: "auto" }}  aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{backgroundColor: "green"}}>
                                <TableCell sx={{color: "white"}}>Plant name</TableCell>
                                <TableCell sx={{color: "white"}} align="right">Stage</TableCell>
                                <TableCell sx={{color: "white"}} align="right">open time - close time</TableCell>
                                <TableCell sx={{color: "white"}} align="right">Temperature&nbsp;(°C)</TableCell>
                                <TableCell sx={{color: "white"}} align="right">Humidity&nbsp;(%)</TableCell>
                                <TableCell sx={{color: "white"}} align="right">pH</TableCell>
                                <TableCell sx={{color: "white"}} align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {plantsList.map((val)=>(
                        <TableBody>
                            <TableRow 
                            key={val.plantname}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {val.plantname}
                            </TableCell>
                            <TableCell align="right">{val.stage}</TableCell>
                            <TableCell align="right">{val.opentime} - {val.closetime}</TableCell>
                            <TableCell align="right">{val.lowertemp} - {val.highertemp}</TableCell>
                            <TableCell align="right">{val.lowerhumid} - {val.higherhumid}</TableCell>
                            <TableCell align="right">{val.lowerpH} - {val.higherpH}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={()=>handleClickOpen(val.id)}><EditIcon /></IconButton>
                                <IconButton onClick={()=>deleteData(val.id)}><DeleteIcon /></IconButton>
                            </TableCell>
                            </TableRow>
                        
                        </TableBody>
                        ))}
                    </Table>
                </TableContainer>
                
                {plantsList.map((val)=>(
                <Dialog PaperProps={{ sx: { width: "100%", height: "77%" } }} open={val.id===state} onClose={handleClose}>
                            <DialogTitle className="Dialog-Title">Edit Information</DialogTitle>
                            <DialogContent>
                                <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                                    <Grid item xs={12}></Grid>
                                    <Grid item xs={12}>{val.plantname}</Grid> 
                                    <Grid item xs={12}>Stage : {val.stage}</Grid>
                                    <Grid item xs={12}>open time - close time : <TextField id="time" label="Open time" type="time" name="opentime" defaultValue={val.opentime} InputLabelProps={{shrink: true,}} inputProps={{step: 300,}} sx={{ width: 150 }} onChange={(e) => setNewOpentime(e.target.value)} /> - <TextField id="time" label="Close time" type="time" name="closetime" defaultValue={val.closetime} InputLabelProps={{shrink: true,}} inputProps={{step: 300,}} sx={{ width: 150 }} onChange={(e) => setNewClosetime(e.target.value)}/></Grid>
                                    <Grid item xs={12}>Temperature : <TextField style ={{width: '20%'}}  id="outlined-required" label="Temperature" defaultValue={val.lowertemp} onChange={(e) => setNewLowertemp(e.target.value)}/> - <TextField style ={{width: '20%'}}  id="outlined-required" label="Temperature" defaultValue={val.highertemp} onChange={(e) => setNewHighertemp(e.target.value)}/> °C </Grid>
                                    <Grid item xs={12}>Humidity : <TextField style ={{width: '20%'}}  id="outlined-required" label="Humidity" defaultValue={val.lowerhumid} onChange={(e) => setNewLowerhumid(e.target.value)}/> - <TextField style ={{width: '20%'}}  id="outlined-required" label="Humidity" defaultValue={val.higherhumid} onChange={(e) => setNewHigherhumid(e.target.value)}/> % </Grid>
                                    <Grid item xs={12}>pH : <TextField style ={{width: '20%'}}  id="outlined-required" label="pH" defaultValue={val.lowerpH}  onChange={(e) => setNewLowerpH(e.target.value)}/> - <TextField style ={{width: '20%'}}  id="outlined-required" label="pH" defaultValue={val.higherpH}  onChange={(e) => setNewHigherpH(e.target.value)}/></Grid>
                               
                                </Grid>
                            </DialogContent>
                            <DialogActions >
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={()=>handleUpdate(val.id)}>Save</Button>
                            </DialogActions>
                        </Dialog>
                ))}

            
                
            
        </Grid> 
    )

}
>>>>>>> f88e869469f088ad9efeb05bb9a43e432b1745d0
export default Myplant