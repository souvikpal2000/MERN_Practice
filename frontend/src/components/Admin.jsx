import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Common from "./common/Common";
import ProfilePic from "../images/profile.jpg";
import Pagination from "./Pagination";

const Admin = () => {
    const [spinner, setSpinner] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("/admin", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include"
        }).then((res) => {
           res.json().then((data) => {
                setUsers(data.users);
                closeSpinnerIn1Seconds();
           }).catch((err) => {
                console.log(err);
           })
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const closeSpinnerIn1Seconds = () => {
        setTimeout(() => {
            setSpinner(false);
        }, 1000)
    }

    return(
        <>
            <Common/>
            <div className="bodyContainer">
                {spinner === true? 
                <Spinner animation="border" variant="secondary" /> :
                <Container> 
                    <div className="profileCard">
                        {users.map((user,index) => {
                            return(
                                <Card key={index}>
                                    <Card.Img variant="top" src={ProfilePic} />
                                    <Card.Body>
                                        <Card.Title>{user.name}</Card.Title>
                                        <Card.Text className="email">
                                            {user.email}
                                        </Card.Text>
                                        <Button variant="secondary">Messages</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </div>       
                    <Pagination users={users}/>    
                </Container>}
            </div>
        </>
    )
}

export default Admin;