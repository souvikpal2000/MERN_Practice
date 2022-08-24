import React, { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import Common from "./common/Common";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import profilePic from "../images/profile.jpg";

export const UserValueContext = createContext();

const About = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        showSpinner: "",
        data: ""
    });

    /*Child Navbar Activation Problem Fixed -----------*/
    const [active, setActive] = useState({
        profile: "inactive",
        timeline: "inactive"
    });
    const location = useLocation();
    const linkActivation = (e) => {
        const name = e.target.name;
        if(name === "profile"){
            setActive({
                profile: "active",
                timeline: "inactive"
            })
        }else{
            setActive({
                profile: "inactive",
                timeline: "active"
            })
        }
    }
    /*------------------------------------------------*/

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
            setState((preValue) => {
                return{
                    ...preValue,
                    data: data.data
                }
            });
            closeSpinnerIn1Seconds();
        }catch(err){
            navigate("/");
        }
    }

    const closeSpinnerIn1Seconds = () => {
        setTimeout(() => {
            setState((preValue) => {
                return{
                    ...preValue,
                    showSpinner: false
                }
            })
        }, 1000)
    }

    useEffect(() => {
        if(!Cookies.get("jwt")){
            navigate("/login");
            return;
        }
        /*Child Navbar Activation Problem Fixed -----------*/
        if(location.pathname == "/about"){
            setActive({
                profile: "active",
                timeline: "inactive"
            })
        }
        /*------------------------------------------------*/
        setState((preValue) => {
            return{
                ...preValue,
                showSpinner: true
            }
        });
        fetchApi();
    }, []);
    
    return(
        <>
            <Common/>
            <div className="bodyContainer">
                {state.showSpinner === true || state.showSpinner === "" ? 
                <Spinner animation="border" variant="primary" /> :  
                <Container>
                    <Row>
                        <Col className="col-12 col-md-2 picContainer">
                            <img src={profilePic} alt="" className="profilePic"/>
                        </Col>
                        <Col className="col-12 col-md-8 info">
                            <div className="nameWork">
                                <h4>{state.data.name}</h4>
                                <p>{state.data.work}</p>
                            </div>
                            <div className="navigation">
                                <Navbar className="navBar">
                                    <Nav>
                                        <NavLink to="/about/profile" id="menu" className={'nav-link'+ " " + active.profile} name="profile" onClick={linkActivation}>Profile</NavLink>
                                        <NavLink to="/about/timeline" id="menu" className={'nav-link'+ " " + active.timeline} name="timeline" onClick={linkActivation}>Timeline</NavLink>
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
                        <Col className="col-12 col-md-8 subOutlet">
                            <UserValueContext.Provider value={{state}}>
                                <Outlet/>
                            </UserValueContext.Provider>
                        </Col>
                    </Row>
                </Container>}
            </div>
        </>
    )
}

export default About;