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
    const [replyForm, setReplyForm] = useState({
        reply: "",
    });

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
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(location.pathname, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(replyForm)
            });
            const data = await res.json();
            if(data.status === 200){
                setReplyForm({
                    reply: ""
                });
            }
        }catch(err){
            console.log(err)
        }
    }

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
                        <form method="POST" className="form" onSubmit={submit}>
                            <div className="form-group mb-2">
                                <label className="reply">Message</label>
                                <textarea className="form-control" rows={3} disabled defaultValue={message}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="reply" className="reply">Reply</label>
                                <textarea name="reply" id="reply" className="form-control" rows={6} onChange={(e) => setReplyForm({reply: e.target.value})} value={replyForm.reply} required></textarea>
                            </div>
                            <div className="form-group">
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