import React, { useEffect, useState, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Spinner from "react-bootstrap/Spinner";
import { useContext } from "react";

const ReplyContext = createContext();

const ReplyCard = ({messageId, replyId, ...reply}) => {
    const {replies, setReplies} = useContext(ReplyContext);
    const deleteReply = (e) => {
        const updatedReplies = replies.filter((reply, index) => {
            return index != e.target.id
        });
        setReplies(updatedReplies);
    }

    return(
        <>
            <Card>
                <Card.Body className="cardBody">
                    <div className="content">
                        <Card.Subtitle className="mb-2 text-muted date">{reply.createdAt.substring(0,10)}</Card.Subtitle>
                        <Card.Text className="description">{reply.desc}</Card.Text>
                    </div>
                    <div className="trashContent">
                        <p className="cross" id={replyId} onClick={deleteReply}>❌</p>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

const MessageCard = ({messageId, ...message}) => {
    const [replies, setReplies] = useState(message.replies);
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
                        <button className="btn btn-secondary giveReply">Give Reply</button>
                        {replies.length>0? 
                        <div>
                            {showReplies? <p className="minus" onClick={() => setShowReplies(!showReplies)}>➖</p> : <p className="plus" onClick={() => setShowReplies(!showReplies)}>➕</p>}
                        </div> : null}
                    </div>
                </Card.Body>
            </Card>
            {showReplies? 
            <div className="replyContainer">
                <ReplyContext.Provider value={{replies, setReplies}}>
                    {replies.map((reply, index) => {
                        return(
                            <ReplyCard key={index} messageId={messageId} replyId={index} {...reply}/>
                        )
                    })}
                </ReplyContext.Provider>
            </div> : null}
        </>
    )
}

const Messages = () => {
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const navigate = useNavigate();

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
            closeSpinnerIn1Seconds();
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    const closeSpinnerIn1Seconds = () => {
        setTimeout(() => {
            setSpinner(false);
        }, 500)
    }

    return(
        <>
            {spinner? 
            <Container className="noMessageContainer">
                <Spinner animation="border" variant="primary" />
            </Container> : messages.length>0?
            <Container className="messageContainer">
                <div className="messageHeading">
                    <h2>Messages</h2>
                    <button className="btn btn-primary goBack" onClick={() => navigate("/admin")}>Go Back</button>
                </div>
                <div className="messages">
                    {messages.map((message, index) => {
                        return(
                            <MessageCard key={index} messageId={index} {...message}/>
                        )
                    })}
                </div>
            </Container>:
            <Container className="noMessageContainer">
                <h1>No Messages</h1>
                <button className="btn btn-primary" onClick={() => navigate("/admin")}>Go Back</button>
            </Container>}
        </>
    )
}

export default Messages;