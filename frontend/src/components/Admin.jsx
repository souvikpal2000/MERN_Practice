import React, { useEffect, useState, createContext } from "react";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Common from "./common/Common";
import ProfilePic from "../images/profile.jpg";
import Pagination from "./Pagination";
import Search from "./Search";

export const PaginationContext = createContext();

const Admin = () => {
    const [spinner, setSpinner] = useState(true);
    const [users, setUsers] = useState([]);

    const [page, setPage] = useState({
        pageNo: 0,
        start: 0,
        end: 2
    });
    
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
            <div className="adminContainer">
                {spinner === true? 
                <Spinner animation="border" variant="secondary" /> :
                <Container className="adminContent"> 
                    <Search/>
                    <div className="profileCard">
                        {users.map((user,index) => {
                            if(page.start <= index && index <= page.end){
                                return(
                                    <Card key={index}>
                                        <Card.Img variant="top" src={ProfilePic} />
                                        <Card.Body>
                                            <Card.Title>{user.name}</Card.Title>
                                            <Card.Text className="email">
                                                {user.email}
                                            </Card.Text>
                                            <NavLink to={"/admin/viewmsg/"+user.email} className="btn btn-primary">Messages</NavLink>
                                        </Card.Body>
                                    </Card>
                                )
                            }
                        })}
                    </div>
                    <PaginationContext.Provider value={{page, setPage}}>
                        <Pagination users={users}/>
                    </PaginationContext.Provider>      
                </Container>}
            </div>
        </>
    )
}

export default Admin;