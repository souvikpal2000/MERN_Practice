import React, { useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from "../App";
import Common from "./common/Common";
import Cookies from "js-cookie";

const Contact = () => {
    const {state} = useContext(UserContext);
    const [contactInfo, setContactInfo] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [show, setShow] = useState(false);
    const MessageModal = () => {
        return(
            <>
                <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Message sent Successfully !!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You will be contacted Soon.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShow(false)}>
                            Understood
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    const fetchApi = async () => {
        try{
            const res = await fetch("/contact", {
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
            setContactInfo((preValue) => {
                return{
                    ...preValue,
                    name: data.data.name,
                    email: data.data.email,
                    phone: data.data.phone
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if(!Cookies.get("jwt")){
            return;
        }
        fetchApi();
    }, []);

    const input = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setContactInfo((preValue) => {
            return{
                ...preValue,
                [name]: value
            }
        })
    }

    const submit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contactInfo)
            })
            const data = await res.json();
            if(data.status === 200){
                setContactInfo((preValue) => {
                    return{
                        ...preValue,
                        message: ""
                    }
                });
                setShow(true);
            }
        }catch(err){
            console.log(err);
        } 
    }
    return(
        <>
            <Common/>
            <div className="bodyContainer">
                <Container>
                    <div className="contactInfo">
                        <Col className="col-md-3 info">
                            <div className="icon">
                                <p>📞</p>
                            </div>
                            <div className="information">
                                <p>Phone</p>
                                <p className="details">+91-8017137650</p>
                            </div>
                        </Col>
                        <Col className="col-md-3 info">
                            <div className="icon">
                                <p>✉️</p>
                            </div>
                            <div className="information">
                                <p>Email</p>
                                <p className="details">spal62588@gmail.com</p>
                            </div>
                        </Col>
                        <Col className="col-md-3 info">
                            <div className="icon">
                                <p>📫</p>
                            </div>
                            <div className="information">
                                <p>Address</p>
                                <p className="details">Khardah, Kolkata - 700116</p>
                            </div>
                        </Col>
                    </div>
                    <div className="contactFormContainer">
                        <div className="contactForm">
                            <form method="POST" className="form" onSubmit={submit}>
                                {state === false? 
                                    <div className="input1">
                                        <input type="text" name="name" id="name" className="form-control" placeholder="Your Name" required value={contactInfo.name} onChange={input}/>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Your Email" required value={contactInfo.email} onChange={input}/>
                                        <input type="text" name="phone" id="phone" className="form-control" placeholder="Your Phone Number" required value={contactInfo.phone} onChange={input}/>
                                    </div> : 
                                    <div className="input1">
                                        <input type="text" name="name" id="name" className="form-control" placeholder="Your Name" required value={contactInfo.name} onChange={input} disabled/>
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Your Email" required value={contactInfo.email} onChange={input} disabled/>
                                        <input type="text" name="phone" id="phone" className="form-control" placeholder="Your Phone Number" required value={contactInfo.phone} onChange={input} disabled/>
                                    </div>
                                }
                                <div className="input2">
                                    <textarea required rows="8" name="message" id="message" className="form-control" value={contactInfo.message} onChange={input} placeholder="Enter Message..."></textarea>
                                </div>
                                <button className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>  
                </Container>
            </div>
            <MessageModal/>
        </>
    )
}

export default Contact;