import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from './Home';
import About from './About';
import Contact from './Contact';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import Error from './Error';
import { useContext } from "react";
import { UserContext } from "../App";

const Routing = () => {
    const {state, dispatch} = useContext(UserContext);
    const Render = () => {
        if(state){
            return(
                <>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/contact" element={<Contact/>} />
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="*" element={<Error/>}/>
                        {/* <Route path="*" element={<Navigate to="/"/>}/> */}
                    </Routes>
                </>
            )
        }else{
            return(
                <>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/about" element={<About/>} />
                        <Route path="/contact" element={<Contact/>} />
                        <Route path="/signup" element={<Signup/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="*" element={<Error/>}/>
                        {/* <Route path="*" element={<Navigate to="/"/>}/> */}
                    </Routes>
                </>
            )
        }
    }
    return(
        <Render/>
    )
}

export default Routing;