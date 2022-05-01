import React from 'react'
import {Avatar} from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
function Card(){
    const avatarStyle={backgroundColor:'green', width:40, height:56, cursor: 'pointer'}
    const navigate = useNavigate();
    const plantsList = [];
    {plantsList.map((val)=>{
    return(
        
        <div className='card-container'>
            <div className="card-content">
                <div className="card-title">
                    <h3>{val.plantname}</h3>
                </div>
                <div className="card-body">
                    <p>Stage:{val.stage}</p>
                    <p>Light Open time - Close time:{val.openclosetime}</p>
                    <p>Temperature:{val.lowertemp}-{val.highertemp}</p>
                    <p>Humidity:{val.lowerhumid}-{val.higherhumid}</p>
                    <p>pH:{val.lowerpH}-{val.higherpH}</p>
                </div>
            </div>

            <div className="btn">
                <Avatar onClick={()=>{navigate("/addnewplant")}} style={avatarStyle} ><EditIcon/></Avatar>
                <Avatar style={avatarStyle} ><DeleteIcon/></Avatar>
            </div>
        </div>
        
    )
})}
}
export default Card;