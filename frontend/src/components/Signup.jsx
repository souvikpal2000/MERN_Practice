import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import signupPic from "../images/signup.jpg";
import { Button } from "bootstrap";
import { useState } from "react";

const Signup = () => {
    const [signupValue, setsSignupValue] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: ""
    });
    const [validate, setValidate] = useState({
        cpassword: "",
        status: ""
    });

    const inputValues = (e) => {
        const {name, value} = e.target;
        if(name === "password"){
            if(!value){
                setValidate({
                    cpassword: "",
                    status: ""
                });
            }
            else if(value && validate.cpassword && value === validate.cpassword){
                setValidate((preValue) => {
                    return{
                        ...preValue,
                        status: "success"
                    }
                })
            }else if(value && validate.cpassword && value !== validate.cpassword){
                setValidate((preValue) => {
                    return{
                        ...preValue,
                        status: "failure"
                    }
                })
            }
        }
        setsSignupValue((preValues) => {
            return{
                ...preValues,
                [name]: value
            }
        });
    }

    const checkPass = (e) => {
        if(!signupValue.password || !e.target.value){
            setValidate({
                cpassword: "",
                status: ""
            });
        }
        else if(signupValue.password === e.target.value && e.target.value){
            setValidate({
                cpassword: e.target.value,
                status: "success"
            });
        }else{
            setValidate({
                cpassword: e.target.value,
                status: "failure"
            });
        }
    }

    const submit = (e) => {
        e.preventDefault();
    }

    return(
        <>
            <div className="bodyContainer">
                <Container>
                    <Row>
                        <Col className="alignItem">
                            <img src={signupPic} alt="" className="image"/>
                        </Col>
                        <Col className="alignItem">
                            <form method="POST" action="/register" className="form" onSubmit={submit}>
                                <div className="form-group row justify-content-center">
                                    <div className="col-12 col-md-10">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">Full Name</span>
                                            <input type="text" name="name" id="name" className="form-control" required onChange={inputValues}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row justify-content-center">
                                    <div className="col-12 col-md-10">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">Email</span>
                                            <input type="email" name="email" id="email" className="form-control" required onChange={inputValues}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row justify-content-center">
                                    <div className="col-12 col-md-10">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">Phone</span>
                                            <input type="text" name="phone" id="phone" className="form-control" required onChange={inputValues}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row justify-content-center">
                                    <div className="col-12 col-md-10">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">Work</span>
                                            <input type="text" name="work" id="work" className="form-control" required onChange={inputValues}/>
                                        </div>
                                    </div>
                                </div>
                
                                <div className="form-group row justify-content-center">
                                    <div className="col-12 col-md-10">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">Password</span>
                                            <input type="password" name="password" id="password" className="form-control" required onChange={inputValues}/>
                                        </div>
                                    </div>
                                </div>

                                {signupValue.password &&
                                <div className="form-group row justify-content-center">
                                    <div className="col-12 col-md-10">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">Confirm Password</span>
                                            <input type="password" name="conPassword" id="conPassword" className={'form-control' + ' ' + validate.status} required onChange={checkPass}/>
                                        </div>
                                    </div>
                                </div>}

                                <div className="form-group row justify-content-center">
                                    <button type="submit" className="btn btn-success">Register</button>
                                </div>             
                            </form>
                        </Col>
                    </Row>
                </Container> 
            </div>
        </>
    )
}

export default Signup;