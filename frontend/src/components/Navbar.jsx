import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return(
        <>
            <div className="navContainer">
                <div className="alignLeft">
                    <NavLink exact to="/" id="menu" activeClassName="active" >Home</NavLink>
                </div>
                <div className="alignRight">
                    <NavLink exact to="/about" id="menu" activeClassName="active">About</NavLink>
                    <NavLink exact to="/contact" id="menu" activeClassName="active">Contact</NavLink>
                    <NavLink exact to="/signup" id="menu" activeClassName="active">Signup</NavLink>
                    <NavLink exact to="/login" id="menu" activeClassName="active">Login</NavLink>
                </div>
            </div>
        </>
    )
}

export default Navbar;