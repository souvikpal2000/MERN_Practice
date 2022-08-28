import React, { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Common from "./common/Common";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import profilePic from "../images/profile.jpg";
import Profile from "./Profile";
import Timeline from "./Timeline";

export const UserValueContext = createContext();

const About = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        showSpinner: "",
        data: ""
    });
    
    const [key, setKey] = useState('profile');

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
                                <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="tab">
                                    <Tab eventKey="profile" title="Profile"></Tab>
                                    <Tab eventKey="timeline" title="Timeline"></Tab>
                                </Tabs>
                            </div>
                        </Col>
                        <Col className="col-12 col-md-2">
                            <button className="btn btn-primary">Edit</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-md-2"></Col>
                        <Col className="col-12 col-md-8 subOutlet">
                            <UserValueContext.Provider value={{state, setState}}>
                                {key === "profile"? <Profile/> : <Timeline/>}
                            </UserValueContext.Provider>
                        </Col>
                    </Row>
                </Container>}
            </div>
        </>
    )
}

export default About;