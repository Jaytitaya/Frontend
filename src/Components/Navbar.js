import React,{useState} from 'react'
import { FiMenu, FiX } from "react-icons/fi";
//import {useNavigate} from "react-router-dom";
import Axios from "axios";


function Navbar(){
    const [click,setClick]=useState(false);
    const handleClick=()=>setClick(!click);
    const closeMobileMenu=()=>setClick(false);
    
    const url = process.env.REACT_APP_HOST;
    const port = process.env.REACT_APP_BE_PORT;
    //const navigate = useNavigate();

    function clearSession(){
        window.localStorage.removeItem("users")
        Axios.get(`http://${url}:${port}/session/${'clear'}`, {withCredentials: true})
    }

    return(
        <div className="navbar">
            <div className="container">
                <div className="header-con">
                    <div className="logo-container">
                        <a href="/Home">Smart Farm</a>
                    </div>
                    <ul className={click?"menu active":"menu"}>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <a href="/Home" /*onClick={()=>{navigate("/Home")}}*/>Home</a>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <a href="/menuset" /*onClick={()=>{navigate("/menuset")}}*/>Configuration</a>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <a href="/menuinfo" /*onClick={()=>{navigate("/menuinfo")}}*/>Information</a>
                        </li>
                        <li className="menu-link" onClick={clearSession}>
                            <a href="/login" /*onClick={()=>{navigate("/login")}}*/>Log out</a>
                        </li>
                    </ul>
                    <div className="mobile-menu" onClick={handleClick}>
                        {click ? (
                            <FiX/>
                        ) : (
                            <FiMenu/>
                        )}
                    </div>
                </div>

            </div>
            
        </div>
    )
}
export default Navbar