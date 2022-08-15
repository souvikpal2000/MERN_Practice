import React from "react";
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../images/logo.png";
import { UserContext } from "../App";
import { useContext } from "react";

const Header = () => {
    const {state, dispatch} = useContext(UserContext);
    const RenderMenu = () => {
        if(state){
            return(
                <>
                    <NavLink to="/logout" id="menu" className="nav-link">Logout</NavLink>
                </>
            )
        }else{
            return(
                <>
                    <NavLink to="/signup" id="menu" className="nav-link">Signup</NavLink>
                    <NavLink to="/login" id="menu" className="nav-link">Login</NavLink>
                </>
            )
        }
    }
    return(
        <>
            <Navbar expand="lg" className="navContainer">
                <Container>
                    <Navbar.Brand>
                        <img src={logo} alt="" className="brandImage"/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggler"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink to="/" id="menu" className="nav-link">Home</NavLink>
                            <NavLink to="/about" id="menu" className="nav-link">About</NavLink>
                            <NavLink to="/contact" id="menu" className="nav-link">Contact</NavLink>
                            <RenderMenu/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;