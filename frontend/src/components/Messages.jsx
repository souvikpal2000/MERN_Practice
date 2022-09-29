import React, { useEffect, useState, createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Spinner from "react-bootstrap/Spinner";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

const FormModal = () => {
    const {user, setUser, formModel, setFormModel} = useContext(ModelContext);

    const setReply = (e) => {
        setFormModel((preValue) => {
            return{
                ...preValue,
                reply: e.target.value
            }
        })
    }

    const close = () => {
        setFormModel({
            show: false,
            messageId: "",
            message: "",
            url: "",
            reply: ""
        })
    }
    const sendReply = async () => {
        if(formModel.reply){
            try{
                const res = await fetch(formModel.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({reply: formModel.reply})
                });
                const data = await res.json();
                if(data.status === 200){
                    const {messages} = user;
                    messages[formModel.messageId].replies.push(data.message.reply);
                    setUser((preValue) => {
                        return{
                            ...preValue,
                            messages: messages
                        }
                    });
                    setFormModel({
                        show: false,
                        messageId: "",
                        message: "",
                        url: "",
                        reply: ""
                    });
                }
            }catch(err){
                console.log(err)
            }
        }
    }

    return(
        <>
            <Modal show={formModel.show} onHide={close} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Send Reply</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={formModel.message} disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Reply</Form.Label>
                            <Form.Control as="textarea" rows={5} autoFocus onChange={setReply} value={formModel.reply}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>Close</Button>
                    <Button variant="primary" onClick={sendReply}>Send</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const MessageCard = ({messageId, ...message}) => {
    const [showReplies, setShowReplies] = useState(false);
    const {user, setFormModel} = useContext(ModelContext);

    const openFormModel = () => {
        setFormModel({
            show: true,
            messageId: messageId,
            message: message.desc,
            url: `/adminreply/${user.email}/${messageId}`,
            reply: ""
        })
    }
    
    return(
        <>
            <Card>
                <Card.Body className="cardBody">
                    <div className="content">
                        <Card.Subtitle className="mb-2 text-muted date">{message.createdAt.substring(0,10)}</Card.Subtitle>
                        <Card.Text className="description">{message.desc}</Card.Text>
                    </div>
                    <div className="trashContent">
                        <Button className="btn btn-secondary giveReply" onClick={openFormModel}>Give Reply</Button>
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
        });

        fetch(`/delreply/${model.email}/${model.messageId}/${model.replyId}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            const data = await res.json();
            if(data.status === 200){
                console.log("Reply Deleted !!");
            }
        }).catch((err) => {

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
    const [formModel, setFormModel] = useState({
        show: false,
        messageId: "",
        message: "",
        url: "",
        reply: ""
    })
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
            <ModelContext.Provider value={{model, setModel, user, setUser, formModel, setFormModel}}>
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
                <FormModal/>
            </ModelContext.Provider>
        </>
    )
}

export default Messages;