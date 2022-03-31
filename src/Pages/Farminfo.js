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
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
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
    const [plantname,setPlantname]=useState("")
    const [stage,setStage]=useState("")
    const [newselectstage,setNewSelectstage]= useState(false)
    const [newPlantname,setNewPlantname]= useState("");
    const [newStage,setNewStage]= useState("");
    const [newFarmname,setNewFarmname]= useState("");
    const [newLocation,setNewLocation]= useState("");
    const [newPlantamount,setNewPlantamount]= useState("");
    const [newstage,setNewstage]= useState("");
    const [state,setState]= useState("");
    const plantstage = [
        {name:'Seeding stage', val:'seed'},
        {name:'Vegetation period', val:'veget'},
        {name:'Flowering period', val:'flowr'},
        {name:'Lateflowering', val:'late'},
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
              setNewFarmname(val.farm_name)
              setNewLocation(val.farm_location)
              setNewPlantamount(val.plant_amount)
              setNewstage(val.farm_stage)
              
              
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
    },[]); 
    //console.log(posts)

    const getFarm = () =>{
        Axios.post('http://localhost:3001/showfarm', {
            plantname : plantname
         },{ withCredentials: true }).then((response)=>{
            setPlantsList(response.data);
            
        });
    }

    const handleUpdate = (id) => {
        Axios.put("http://localhost:3001/updatefarm",
            {
                id:id, 
                farmname: newFarmname,
                location: newLocation,
                plantamount: newPlantamount,
                stage: newstage,
                
            },{ withCredentials: true }).then((result)=>{
            setPlantsList(plantsList.map((val)=>{
                return val.id === id? 
                {
                    id: val.id, 
                    farm_name: newFarmname,
                    farm_location: newLocation,
                    plant_amount: newPlantamount,
                    farm_stage: newstage,
                    
                }
                : val;
            }))
        });
        setState("");
    };

    const deleteData=(id)=>{
        //event.preventDefault();
        Axios.delete(`http://localhost:3001/deletefarm/${id}`,{ withCredentials: true }).then((result)=>{
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
            <h2 className="app-front" style={{color:'#008000'}}>Farm</h2>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={3} md={2} >
                <FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Plant name</InputLabel>
                    <Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={plantname} label="plantname" input={<OutlinedInput label="plantname" />}onChange={handleChange}>
                        {posts.map((posts) => (<MenuItem key={posts} value={posts}>{posts}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={3} md={2}><Button onClick={getFarm} variant="contained" color="success" size="large" sx={{ mt: 3, mb: 2 }} style={{minWidth: '210px' }}>Show information</Button></Grid>
            </Grid>
            
            
                <TableContainer sx={{ width: "max-content" }} component={Paper}>
                    <Table sx={{ tableLayout: "auto" }}  aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{backgroundColor: "green"}}>
                                <TableCell sx={{color: "white"}}>Farm name</TableCell>
                                <TableCell sx={{color: "white"}} align="center">Location</TableCell>
                                <TableCell sx={{color: "white"}} align="center">Plant amount/Farm</TableCell>
                                <TableCell sx={{color: "white"}} align="center">Farm stage</TableCell>
                                <TableCell sx={{color: "white"}} align="center">Action</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        {plantsList.map((val)=>(
                        <TableBody>
                            <TableRow 
                            key={val.farm_name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {val.farm_name}
                            </TableCell>
                            <TableCell align="center">{val.farm_location}</TableCell>
                            <TableCell align="center">{val.plant_amount}</TableCell>
                            <TableCell align="center">{val.farm_stage}</TableCell>
                            
                            <TableCell align="center">
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
                                <Grid item xs={12}>Farm name : <TextField style ={{width: '60%'}}  id="outlined-required" label="Farm name" defaultValue={val.farm_name} onChange={(e) => setNewFarmname(e.target.value)}/></Grid>
                                <Grid item xs={12}>Location : <TextField style ={{width: '60%'}}  id="outlined-required" label="Location" defaultValue={val.farm_location} onChange={(e) => setNewLocation(e.target.value)}/> </Grid>
                                <Grid item xs={12}>Plant amount/Farm : <TextField style ={{width: '20%'}}  id="outlined-required" label="Plant amount" defaultValue={val.plant_amount} onChange={(e) => setNewPlantamount(e.target.value)}/> </Grid>
                                <Grid item xs={12} >Stage : <FormControl sx={{ minWidth: 120 }}><InputLabel id="demo-simple-select-label" >Stage</InputLabel>
                                    <Select style={{minWidth: '220px'}} labelId="demo-multiple-name-label" id="demo-multiple-name" value={newstage} defaultValue={val.farm_stage} label="Stage" input={<OutlinedInput label="Stage" />} onChange={(e) => setNewstage(e.target.value)}>
                                        {plantstage.map((plantstage) => (<MenuItem key={plantstage.name} value={plantstage.val}>{plantstage.name}</MenuItem>))}
                                    </Select></FormControl>
                                </Grid>
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
export default Myplant