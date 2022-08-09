import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Error from "./components/Error";
import Footer from "./components/Footer";

const App = () => {
	return(
		<>
			<Header/>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="/about" element={<About/>} />
				<Route path="/contact" element={<Contact/>} />
				<Route path="/signup" element={<Signup/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="*" element={<Error/>}/>
				{/* <Route path="*" element={<Navigate to="/"/>}/> */}
			</Routes>
			<Footer/>
		</>
	)
}

export default App;