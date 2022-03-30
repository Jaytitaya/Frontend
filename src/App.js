
import React, { useState,createContext } from 'react';

import './App.css';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Addnewplant from './Pages/Addnewplant';
import Myplant from './Pages/Myplant';
import Card from './Components/Card';
import Home from './Pages/Home';
import Light from './Pages/Light';
import Temp from './Pages/Temp';
import Humid from './Pages/Humid';
import PH from './Pages/PH';
import Menuset from './Pages/Menuset';
import Menuinfo from './Pages/Menuinfo';
import Plantsetting from './Pages/Plantsetting';
import Farmsetting from './Pages/Farmsetting';
import Plantform from './Pages/Plantform';
import Farminfo from './Pages/Farminfo';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

const LoginContext = React.createContext();

function App() {
  const token = localStorage.getItem("accessToken");
  const [username, setUserName]=useState("");
  //if(!token){
  //  return<Login/>
  //}

  return (
    <LoginContext.Provider value={{username, setUserName}}>
     <div className="wrapper" style={{backgroundColor: '#f5f5f5', height:'100%',width:'100%' }}>
     <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/addnewplant" element={<Addnewplant/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/light" element={<Light/>}/>
        <Route exact path="/temp" element={<Temp/>}/>
        <Route exact path="/humid" element={<Humid/>}/>
        <Route exact path="/pH" element={<PH/>}/>
        <Route exact path="/myplant" element={<Myplant/>}/>
        <Route exact path="/card" element={<Card/>}/>
        <Route exact path="/menuset" element={<Menuset/>}/>
        <Route exact path="/menuinfo" element={<Menuinfo/>}/>
        <Route exact path="/plantsetting" element={<Plantsetting/>}/>
        <Route exact path="/farmsetting" element={<Farmsetting/>}/>
        <Route exact path="/plantform" element={<Plantform/>}/>
        <Route exact path="/farminfo" element={<Farminfo/>}/>
      </Routes>
     </BrowserRouter> 
     </div>
    </LoginContext.Provider>
  );
}
export {LoginContext};
export default App;
