import logo from './logo.svg';
import React, { useState,createContext } from 'react';
import './App.css';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Addnewplant from './Pages/Addnewplant';
import Myplant from './Pages/Myplant';
import Card from './Components/Card';
import Home from './Pages/Home';
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
        <Route exact path="/myplant" element={<Myplant/>}/>
        <Route exact path="/card" element={<Card/>}/>
      </Routes>
     </BrowserRouter> 
     </div>
    </LoginContext.Provider>
  );
}
export {LoginContext};
export default App;
