import React,{useState} from 'react'
import { FiMenu, FiX } from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import Axios from "axios";


function Navbar(){
    const [click,setClick]=useState(false);
    const handleClick=()=>setClick(!click);
    const closeMobileMenu=()=>setClick(false);
    const navigate = useNavigate();

    function clearSession(){
        window.localStorage.removeItem("users")
        const sscheck = Axios.get(`http://localhost:3001/session/${'clear'}`, {withCredentials: true})
    }

    return(
        <div className="navbar">
            <div className="container">
                <div className="header-con">
                    <div className="logo-container">
                        <a href="#">Smart Farm</a>
                    </div>
                    <ul className={click?"menu active":"menu"}>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <a href="#" onClick={()=>{navigate("/Home")}}>Home</a>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <a href="#" onClick={()=>{navigate("/menuset")}}>Configuration</a>
                        </li>
                        <li className="menu-link" onClick={closeMobileMenu}>
                            <a href="#" onClick={()=>{navigate("/menuinfo")}}>Information</a>
                        </li>
                        <li className="menu-link" onClick={clearSession}>
                            <a href="#" onClick={()=>{navigate("/login")}}>Log out</a>
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