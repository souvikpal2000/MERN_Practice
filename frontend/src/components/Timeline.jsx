import React, { useContext, useState } from "react";
import { UserValueContext } from "./About";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Timeline = () => {
    const {state, setState} = useContext(UserValueContext);
    const {messages} = state.data;

    const [model, setModel] = useState({
        id: "",
        show: false
    });
    const showModel = (e) => {
        const id = e.target.id;
        setModel({
            id: id,
            show: true
        });
    }
    const closeModel = () => {
        setModel({
            id: "",
            show: false
        });
    }
    const VerticallyAlignedModel = () => {
        return(
            <>
                <Modal show={model.show} onHide={closeModel} backdrop="static" keyboard={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Message?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You'll lose this message after this action. We can't recover them once you delete.
                        Are you sure you want to <span class="perDlt">permanently delete</span> it?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModel}>
                            Close
                        </Button>
                        <Button variant="danger" id={model.id} onClick={deleteMessage}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    const deleteMessage = (e) => {
        const updatedMessages = messages.filter((msg, index) => {
            return index != e.target.id;
        })
        const updatedData = {...state.data, messages: updatedMessages};
        setState((preValue) => {
            return{
                ...preValue,
                data: updatedData
            }
        });
        setModel({
            id: "",
            show: false
        });

        fetch(`/timeline/${e.target.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            const data = await res.json();
            if(data.status === 200){
                console.log("Message Deleted !!");
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const [showOffCanvas, setShowOffCanvas] = useState({
        messageId: "",
        show: false
    });
    const showCanvas = (e) => {
        setShowOffCanvas({
            messageId: e.target.id,
            show: true
        })
    }
    const closeCanvas = () => {
        setShowOffCanvas({
            messageId: "",
            show: false
        })
    }
    const Canvas = () => {
        const message = messages.filter((msg, index) => {
            return index == showOffCanvas.messageId
        });
        const {replies} = {...message[0]};
        return(
            <>
                {replies !== undefined? 
                <Offcanvas show={showOffCanvas.show} onHide={closeCanvas} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Replies</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {replies.map((reply) => {
                            return(
                                <Card>
                                    <Card.Body className="cardBody">
                                        <div className="content">
                                            <Card.Subtitle className="mb-2 text-muted date">{reply.createdAt.substring(0,10)}</Card.Subtitle>
                                            <Card.Text className="description">{reply.desc}</Card.Text>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </Offcanvas.Body>
                </Offcanvas> : null}
            </>
        )
    }

    return(
        <>
            <div className="timelineContainer">
                {messages.map((msg,index) => {
                    return(
                        <Card key={index}>
                            <Card.Body className="cardBody">
                                <div className="content">
                                    <Card.Subtitle className="mb-2 text-muted date">{msg.createdAt.substring(0,10)}</Card.Subtitle>
                                    <Card.Text className="description">{msg.desc}</Card.Text>
                                </div>
                                <div className="trashContent">
                                    {msg.replies.length !== 0? <p id={index} className="reply" onClick={showCanvas}>✉️</p> : null}
                                    <p id={index} onClick={showModel} className="cross">❌</p>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
            <VerticallyAlignedModel/>
            <Canvas/>
        </>
    )
}

export default Timeline;