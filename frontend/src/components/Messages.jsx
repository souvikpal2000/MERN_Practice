import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';

const Messages = () => {
    const location = useLocation();
    const [messages, setMessages] = useState([]);

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
            setMessages(data.messages);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const ReplyCard = ({...reply}) => {
        return(
            <>
                <Card>
                    <Card.Body className="cardBody">
                        <div className="content">
                            <Card.Subtitle className="mb-2 text-muted date">{reply.createdAt.substring(0,10)}</Card.Subtitle>
                            <Card.Text className="description">{reply.desc}</Card.Text>
                        </div>
                        <div className="trashContent">
                            <p className="cross">❌</p>
                        </div>
                    </Card.Body>
                </Card>
            </>
        )
    }

    const MessageCard = ({...message}) => {
        const [showReplies, setShowReplies] = useState(false);
        return(
            <>
                <Card>
                    <Card.Body className="cardBody">
                        <div className="content">
                            <Card.Subtitle className="mb-2 text-muted date">{message.createdAt.substring(0,10)}</Card.Subtitle>
                            <Card.Text className="description">{message.desc}</Card.Text>
                        </div>
                        <div className="trashContent">
                            <button className="btn btn-secondary">Give Reply</button>
                            {message.replies.length>0? 
                            <div>
                                {showReplies? <p className="minus" onClick={() => setShowReplies(!showReplies)}>➖</p> : <p className="plus" onClick={() => setShowReplies(!showReplies)}>➕</p>}
                            </div> : null}
                        </div>
                    </Card.Body>
                </Card>
                {showReplies? 
                <div className="replyContainer">
                    {message.replies.map((reply, index) => {
                        return(
                            <ReplyCard key={index} {...reply}/>
                        )
                    })}
                </div> : null}
            </>
        )
    }

    return(
        <>
            <Container>
                {messages.map((message, index) => {
                    return(
                        <MessageCard key={index} {...message}/>
                    )
                })}
            </Container>
        </>
    )
}

export default Messages;