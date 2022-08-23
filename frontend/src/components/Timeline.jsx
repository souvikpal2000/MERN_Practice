import React, { useContext } from "react";
import { UserValueContext } from "./About";
import Card from 'react-bootstrap/Card';

const Timeline = () => {
    const {state} = useContext(UserValueContext);
    const {messages} = state.data;

    return(
        <>
            <div className="timelineContainer">
                {messages.map((msg) => {
                    return(
                        <Card>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted date">{msg.createdAt.substring(0,10)}</Card.Subtitle>
                                <Card.Text className="description">{msg.desc}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </>
    )
}

export default Timeline;