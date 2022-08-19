import React, { useEffect, useState, createContext } from "react";
import Cookies from "js-cookie";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import Common from "./common/Common";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import profilePic from "../images/profile.jpg";

export const UserValueContext = createContext();

const About = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState("");

    const fetchApi = async () => {
        try{
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const data = await res.json();
            if(data.status !== 200){
                throw new Error(data.message);
            }
            setUserData({
                id: data.data._id,
                name: data.data.name,
                email: data.data.email,
                phone: data.data.phone,
                work: data.data.work
            })
        }catch(err){
            navigate("/");
        }
    }

    useEffect(() => {
        if(!Cookies.get("jwt")){
            navigate("/login");
            return;
        }
        fetchApi();
    }, []);
    
    return(
        <>
            <Common/>
            <div className="bodyContainer">
                <Container>
                    <Row>
                        <Col className="col-12 col-md-2 picContainer">
                            <img src={profilePic} alt="" className="profilePic"/>
                        </Col>
                        <Col className="col-12 col-md-8 info">
                            <div>
                                <h4>{userData.name}</h4>
                                <p>{userData.work}</p>
                            </div>
                            <div>
                                <Navbar className="navBar">
                                    <Nav>
                                        <NavLink to="/about/profile" id="menu" className="nav-link">Profile</NavLink>
                                        <NavLink to="/about/timeline" id="menu" className="nav-link">Timeline</NavLink>
                                    </Nav>
                                </Navbar>
                            </div>
                        </Col>
                        <Col className="col-12 col-md-2">
                            <button className="btn btn-primary">Edit</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-2"></Col>
                        <Col className="col-md-8 subOutlet">
                            <UserValueContext.Provider value={userData}>
                                <Outlet/>
                            </UserValueContext.Provider>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default About;