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
//import {Avatar} from '@material-ui/core';
//import { LoginContext } from '../App';
//import SvgIcon from '@mui/material/SvgIcon';

const Myplant=()=>{
    const avatarStyle={backgroundColor:'green', width:40, height:56}
    const navigate = useNavigate();
    //const {username} = localStorage.username;
    //const {username} = useContext(LoginContext);
    const [plantsList, setPlantsList] = useState([]);
    const [updateplantsList, setUpdatePlantsList] = useState([]);
    const plantnames = [];
    const [stage,setStage]=useState("")
    const [pname, setPname] = useState([]);
    const [names, setNames] = useState("");
    const [newselectstage,setNewSelectstage]= useState("off")
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
    const handleChange = (event) => {
        setStage(event.target.value);
    };
    const handleNewChange = (event) => {
        setNewStage(event.target.value);
    };

    function checkorigin(props){
        const selectstage = props;
        if (selectstage === "on"){
            return <Checkbox defaultChecked/>;
        }else{
            return <Checkbox />;
        }
    }

    function Icon(props){
        const selectstage = props;
        if (selectstage === "on"){
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
      const results = await Axios('http://localhost:3001/plants');
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
    console.log(posts)

    const getPlants = () =>{
        Axios.post('http://localhost:3001/stage', {
            stage : stage
         },{ withCredentials: true }).then((response)=>{
            setPlantsList(response.data);
            
        });
    }

    const handleUpdate = (id) => {
        Axios.put("http://localhost:3001/update",
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
        Axios.delete(`http://localhost:3001/delete/${id}`,{ withCredentials: true }).then((result)=>{
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
            <h2 className="app-front" style={{color:'#008000'}}>My Plant</h2>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={3} md={2} >
                <FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Plant name</InputLabel>
                    <Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={stage} label="plantname" input={<OutlinedInput label="plantname" />}onChange={handleChange}>
                        {posts.map((posts) => (<MenuItem key={posts} value={posts}>{posts}</MenuItem>))}
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
                            <p>Stage : {val.stage}</p>
                            <p>open time - close time : {val.opentime} - {val.closetime}</p>
                            <p>Temperature : {val.lowertemp} - {val.highertemp} °C</p>
                            <p>Humidity : {val.lowerhumid} - {val.higherhumid} %</p>
                            <p>pH : {val.lowerpH} - {val.higherpH}</p>
                        </div>
            
                    <div className="btn">
                        <p>{Icon(val.selectstage)}</p>
                        <IconButton onClick={()=>handleClickOpen(val.id)}><EditIcon sx={{ color: grey[50] }}/></IconButton>
                        <IconButton onClick={()=>deleteData(val.id)}><DeleteIcon sx={{ color: grey[50] }}/></IconButton>
                    </div>
                </div>
                
               
                <Dialog PaperProps={{ sx: { width: "100%", height: "77%" } }} open={val.id===state} onClose={handleClose}>
                            <DialogTitle className="Dialog-Title">Edit Information</DialogTitle>
                            <DialogContent>
                            
                                <h3>{val.plantname}</h3> 
                                <p>Stage : {val.stage}</p>
                                <p>open time - close time : <TextField id="time" label="Open time" type="time" name="opentime" defaultValue={val.opentime} InputLabelProps={{shrink: true,}} inputProps={{step: 300,}} sx={{ width: 150 }} onChange={(e) => setNewOpentime(e.target.value)} /> - <TextField id="time" label="Close time" type="time" name="closetime" defaultValue={val.closetime} InputLabelProps={{shrink: true,}} inputProps={{step: 300,}} sx={{ width: 150 }} onChange={(e) => setNewClosetime(e.target.value)}/></p>
                                <p>Temperature : <TextField style ={{width: '20%'}}  id="outlined-required" label="Temperature" defaultValue={val.lowertemp} onChange={(e) => setNewLowertemp(e.target.value)}/> - <TextField style ={{width: '20%'}}  id="outlined-required" label="Temperature" defaultValue={val.highertemp} onChange={(e) => setNewHighertemp(e.target.value)}/> °C</p>
                                <p>Humidity : <TextField style ={{width: '20%'}}  id="outlined-required" label="Humidity" defaultValue={val.lowerhumid} onChange={(e) => setNewLowerhumid(e.target.value)}/> - <TextField style ={{width: '20%'}}  id="outlined-required" label="Humidity" defaultValue={val.higherhumid} onChange={(e) => setNewHigherhumid(e.target.value)}/> %</p>
                                <p>pH : <TextField style ={{width: '20%'}}  id="outlined-required" label="pH" defaultValue={val.lowerpH}  onChange={(e) => setNewLowerpH(e.target.value)}/> - <TextField style ={{width: '20%'}}  id="outlined-required" label="pH" defaultValue={val.higherpH}  onChange={(e) => setNewHigherpH(e.target.value)}/></p>
                                <FormControlLabel onClick={()=>handleClickStage(val.selectstage)}  control={checkorigin(val.selectstage)} label="The plant is in this stage" labelPlacement="The plant is in this stage" />
                            
                            </DialogContent>
                            <DialogActions >
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={()=>handleUpdate(val.id)}>Save</Button>
                            </DialogActions>
                        </Dialog>
                
                </div>
                
                )
            })}

            
                
            
        </Grid> 
    )

}
export default Myplant