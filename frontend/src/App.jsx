import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
	return(
		<>
			<Navbar/>
			<Routes>
				<Route exact path="/" element={<Home/>} />
				<Route exact path="/about" element={<About/>} />
				<Route exact path="/contact" element={<Contact/>} />
				<Route exact path="/signup" element={<Signup/>} />
				<Route exact path="/login" element={<Login/>} />
			</Routes>
			<Footer/>
		</>
	)
}

export default App;