import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import loginPic from "../images/login.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginValues, setLoginValues] = useState({
        email: "",
        password: ""
    });
    const [alert,setAlert] = useState({
        text: "",
        status: ""
    });
    const navigate = useNavigate();

    const inputValues = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginValues((preValue) => {
            return { 
                ...preValue,
                [name]: value
            }
        })
    }

    const submit = async (e) => {
        e.preventDefault();
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginValues)
        })
        const data = await res.json();
        console.log(data);
        if(data.status === 200){
            setLoginValues({
                email: "",
                password: ""
            });
            navigate("/");
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
                        <Col className="alignItem col-12 col-md-6">
                            <img src={loginPic} alt="" className="loginImage"/>
                        </Col>
                        <Col className="alignItem col-12 col-md-6">
                            {alert.text && 
                            <div className={'alert' + ' ' + alert.status} role="alert">
                                <p>{alert.text}</p>
                                <button class="btn-close" aria-label="Close" onClick={() => setAlert("")}></button>
                            </div>}
                            <form method="POST" className="form" onSubmit={submit}>
                                <div className="form-group row justify-content-center">
                                    <div className="col-12 col-md-10">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">Email</span>
                                            <input type="email" name="email" id="email" className="form-control" required value={loginValues.email} onChange={inputValues}/>
                                        </div>
                                    </div>
                                </div>
                
                                <div className="form-group row justify-content-center">
                                    <div className="col-12 col-md-10">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon1">Password</span>
                                            <input type="password" name="password" id="password" className="form-control" required value={loginValues.password} onChange={inputValues}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row justify-content-center">
                                    <button type="submit" className="btn btn-success">Login</button>
                                </div>             
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login;