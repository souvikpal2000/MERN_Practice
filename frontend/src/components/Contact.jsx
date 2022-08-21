import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Common from "./common/Common";

const Contact = () => {
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
                            <form method="POST" className="form">
                                <div className="input1">
                                    <input type="text" name="name" id="name" className="form-control" placeholder="Your Name"/>
                                    <input type="email" name="email" id="email" className="form-control" placeholder="Your Email"/>
                                    <input type="text" name="phone" id="phone" className="form-control" placeholder="Your Phone Number"/>
                                </div>
                                <div className="input2">
                                    <textarea required rows="8" name="markdown" id="markdown" class="form-control"></textarea>
                                </div>
                                <button className="btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                    
                </Container>
            </div>
        </>
    )
}

export default Contact;