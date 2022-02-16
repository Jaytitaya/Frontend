import React from 'react'
import {Grid, TextField, Paper, Typography} from '@material-ui/core'
const ABC=()=>{
    const paperStyle={padding:20,height:'90vh',width:600,margin:"10px auto",backgroundColor: '#f5f5f5'}

    return(
            <Paper elevation={10} style={paperStyle}>
                <h2 className="app-front" style={{color:'#008000'}}>Add New Plant</h2>
                <div className="container">
                    <TextField className="center1" id="outlined-basic" label="Plant name" variant="outlined"/>                 
                    <TextField className="center2" id="outlined-basic" label="Stage" variant="outlined"/>                               
                    <img className="photo" src="/light.png" />
                    <TextField className="opentime" id="outlined-basic" label="Open time" variant="outlined"/>
                    <TextField className="closetime" id="outlined-basic" label="Close time" variant="outlined"/>
                </div>
                    
                        <img className="app-light-photo" src="/Temp.png" />
                    
                        <TextField id="outlined-basic" label="Temperature" variant="outlined"/>
                    
                    <Typography style={{color:'#008000'}}>-</Typography>
                    
                        <TextField id="outlined-basic" label="Temperature" variant="outlined"/>
                    
                    <Typography style={{color:'#008000'}}>Celsius</Typography>
                    
                    
                  
            </Paper>
        
    )
}
export default ABC