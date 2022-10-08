import React, { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Common from "./common/Common";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import profilePic from "../images/profile.jpg";
import Profile from "./Profile";
import Timeline from "./Timeline";

export const UserValueContext = createContext();
const ModelContext = createContext();

const EditModal = () => {
    const {showModel, setShowModel, state, setState} = useContext(ModelContext);
    const [info, setInfo] = useState({
        name: state.data.name,
        phone: state.data.phone,
        work: state.data.work
    });

    const editInfo = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInfo((preValue) => {
            return{
                ...preValue,
                [name]: value
            }
        });
    }
    const close = () => {
        setShowModel(false);
    }
    const edit = () => {
        let data = state.data;
        const updatedData = {
            ...data,
            ...info
        }
        setState((preValue) => {
            return{
                ...preValue,
                data: updatedData
            }
        })
        setShowModel(false);
    }
    return(
        <>
            <Modal show={showModel} onHide={close} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={info.name} name="name" onChange={editInfo} autoFocus required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" value={info.phone} name="phone" onChange={editInfo} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Profession</Form.Label>
                            <Form.Control type="text" value={info.work} name="work" onChange={editInfo} required/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>Close</Button>
                    <Button variant="primary" onClick={edit}>Edit</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const About = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        showSpinner: "",
        data: ""
    });
    
    const [key, setKey] = useState('profile');
    const [showModel, setShowModel] = useState(false);

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
                            <button className="btn btn-primary" onClick={() => setShowModel(true)}>Edit</button>
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
                    <ModelContext.Provider value={{showModel, setShowModel, state, setState}}>
                        <EditModal/>
                    </ModelContext.Provider>
                </Container>}
            </div>
        </>
    )
}

export default About;