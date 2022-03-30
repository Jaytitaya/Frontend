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
//import { LoginContext } from '../App';


const Plantform=()=>{
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
        Axios.post('http://localhost:3001/showplant', {
            plantname : plantname
         },{ withCredentials: true }).then((response)=>{
            setPlantsList(response.data);
            //console.log(plantsList)
            
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
            <h2 className="app-front" style={{color:'#008000'}}>Plant</h2>
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
            {plantsList.map((val,key)=>{
            return(
                 <div className='card-container'>
                    <div className="card-content">
                        <div className="card-title">
                        
                        </div>
                        <div className="card-body">
                            <p>Plant name (Thai) : {val.plants_name}</p>
                            <p>Plant name (English) : {val.plants_engname}</p>
                            <p>Life cycle : {val.plants_lifecycle} days</p>
                            <p>Utilization : {val.plants_utilization}</p>
                            
                        </div>
            
                    <div className="btn">
                        
                        
                        <IconButton onClick={()=>handleClickOpen(val.id)}><EditIcon sx={{ color: grey[50] }}/></IconButton>
                        <IconButton onClick={()=>deleteData(val.id)}><DeleteIcon sx={{ color: grey[50] }}/></IconButton>
                    </div>
                </div>
                
               
                <Dialog PaperProps={{ sx: { width: "100%", height: "77%" } }} open={val.id===state} onClose={handleClose}>
                            <DialogTitle className="Dialog-Title">Edit Information</DialogTitle>
                            <DialogContent>
                            
                                <h3>{val.plants_name}</h3> 
                                <p>Plant name (English) : <TextField style ={{width: '60%'}}  id="outlined-required" label="Plant name (English)" defaultValue={val.plants_engname} onChange={(e) => setNewOpentime(e.target.value)} /> </p>
                                <p>Life cycle : <TextField style ={{width: '20%'}}  id="outlined-required" label="Life cycle" defaultValue={val.plants_lifecycle} onChange={(e) => setNewLowertemp(e.target.value)}/> days</p>
                                <p>Utilization : <TextField style ={{width: '20%'}}  id="outlined-required" label="Utilization" defaultValue={val.plants_utilization} onChange={(e) => setNewLowerhumid(e.target.value)}/> </p>
                                
                                
                            
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
export default Plantform