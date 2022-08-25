import React, { useContext } from "react";
import { UserValueContext } from "./About";
import Card from 'react-bootstrap/Card';

const Timeline = () => {
    const {state, setState} = useContext(UserValueContext);
    const {messages} = state.data;

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
        })
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
                                    <p id={index} onClick={deleteMessage} className="cross">❌</p>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </>
    )
}

export default Timeline;