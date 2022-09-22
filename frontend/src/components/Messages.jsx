import React, { useEffect, useState, createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Spinner from "react-bootstrap/Spinner";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModelContext = createContext();

const ReplyCard = ({messageId, replyId, ...reply}) => {
    const {setModel, user} = useContext(ModelContext);
    const openModal = () => {
        setModel({
            show: true,
            email: user.email,
            messageId: messageId,
            replyId: replyId
        })
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
                        <p className="cross" id={replyId} onClick={openModal}>❌</p>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

const MessageCard = ({messageId, ...message}) => {
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
                        <ReplyCard key={index} messageId={messageId} replyId={index} {...reply}/>
                    )
                })}
            </div> : null}
        </>
    )
}

const VerticallyAlignedModel = () => {
    const {model, setModel, user, setUser} = useContext(ModelContext);

    const closeModel = () => {
        setModel({
            show: false,
            email: "",
            messageId: "",
            replyId: ""
        })
    }
    
    const deleteMessage = () => {
        const {messages} = user;
        const {replies} = messages[model.messageId];
        const updatedReplies = replies.filter((reply, index) => {
            return index != model.replyId
        });
        messages[model.messageId].replies = updatedReplies;
        setUser((preValue) => {
            return{
                ...preValue,
                messages: messages
            }
        });
        setModel({
            show: false,
            email: "",
            messagesId: "",
            replyId: ""
        })
    }

    return(
        <>
            <Modal show={model.show} onHide={closeModel} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Message?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You'll lose this message after this action. We can't recover them once you delete.
                    Are you sure you want to <span className="perDlt">permanently delete</span> it?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModel}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteMessage}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const Messages = () => {
    const location = useLocation();
    const [user, setUser] = useState({
        email: "",
        messages: []
    });
    const [spinner, setSpinner] = useState(true);
    const [model, setModel] = useState({
        show: false,
        email: "",
        messageId: "",
        replyId: ""
    });
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
            setUser({
                email: data.user.email,
                messages: data.user.messages
            });
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
            <ModelContext.Provider value={{model, setModel, user, setUser}}>
                {spinner? 
                <Container className="noMessageContainer">
                    <Spinner animation="border" variant="primary" />
                </Container> : user.messages.length>0?
                <Container className="messageContainer">
                    <div className="messageHeading">
                        <h2>Messages</h2>
                        <button className="btn btn-primary goBack" onClick={() => navigate("/admin")}>Go Back</button>
                    </div>
                    <div className="messages">
                        {user.messages.map((message, index) => {
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
            
                <VerticallyAlignedModel/>
            </ModelContext.Provider>
        </>
    )
}

export default Messages;