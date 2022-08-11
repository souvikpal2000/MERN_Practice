import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import signupPic from "../images/signup.jpg";
import { useState } from "react";

const Signup = () => {
    const [signupValue, setsSignupValue] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: ""
    });
    const [validate, setValidate] = useState("");
    const [alert,setAlert] = useState({
        text: "",
        status: ""
    })

    const inputValues = (e) => {
        const {name, value} = e.target;
        if(name === "password"){
            if(!value){
                setValidate("");
                setsSignupValue((preValue) => {
                    return{
                        ...preValue,
                        cpassword: ""
                    }
                })
            }
            else if(signupValue.cpassword && value === signupValue.cpassword){
                setValidate("success");
            }else if(signupValue.cpassword && value !== signupValue.cpassword){
                setValidate("failure");
            }
        }else if(name === "cpassword"){
            if(!value){
                setValidate("");
            }
            else if(signupValue.password && value === signupValue.password){
                setValidate("success");
            }else if(signupValue.password && value !== signupValue.password){
                setValidate("failure");
            }
        }
        setsSignupValue((preValues) => {
            return{
                ...preValues,
                [name]: value
            }
        });
    }

    const submit = async (e) => {
        e.preventDefault();
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupValue)
        });
        const data = await res.json();
        if(data.status === 200){
            setAlert({
                text: data.message,
                status: "alert-success"
            })
        }else{
            setAlert({
                text: data.message,
                status: "alert-danger"
            })
        }   
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
                            <div>
                                {alert.text && 
                                <div className={'alert' + ' ' + alert.status} role="alert">
                                    <p>{alert.text}</p>
                                    <button class="btn-close" aria-label="Close" onClick={() => setAlert("")}></button>
                                </div>}
                            </div>
                            <form method="POST" className="form" onSubmit={submit}>
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
                                            <input type="password" name="cpassword" id="cpassword" className={'form-control' + ' ' + validate} required onChange={inputValues}/>
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