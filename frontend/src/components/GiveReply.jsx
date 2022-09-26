import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useLocation, useNavigate } from "react-router-dom";
import GiveReplyPic from "../images/giveReply.jpg";

const GiveReply = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.pathname.substring(12, location.pathname.lastIndexOf("/"));

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(location.pathname, {
            method: "GET", 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(async (res) => {
            const data = await res.json();
            if(data.status === "200"){
                setMessage(data.message);
            }
        })
    }, []);

    return(
        <>
            <Container>
                <div className="messageHeading">
                    <h2>Give Reply</h2>
                    <button className="btn btn-primary goBack" onClick={() => navigate(`/admin/viewmsg/${email}`)}>Go Back</button>
                </div>
                <div className="replyFormContainer">
                    <div className="alignItem">
                        <img src={GiveReplyPic} alt="" className="giveReplyImage"/>
                    </div>
                    <div className="alignItem">
                        <form>
                            <div class="form-group mb-2">
                                <label for="reply" className="reply">Message</label>
                                <textarea name="reply" id="reply" class="form-control" rows={3} disabled defaultValue={message}></textarea>
                            </div>
                            <div class="form-group">
                                <label for="reply" className="reply">Reply</label>
                                <textarea name="reply" id="reply" class="form-control" rows={6}></textarea>
                            </div>
                            <div class="form-group">
                                <button className="btn btn-primary sendReply">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default GiveReply;