import React from "react";
import Container from "react-bootstrap/Container";
import GiveReplyPic from "../images/giveReply.jpg";

const GiveReply = () => {
    return(
        <>
            <Container>
                <div className="messageHeading">
                    <h2>Give Reply</h2>
                    <button className="btn btn-primary goBack">Go Back</button>
                </div>
                <div className="replyFormContainer">
                    <div className="alignItem">
                        <img src={GiveReplyPic} alt="" className="giveReplyImage"/>
                    </div>
                    <div className="alignItem">
                        <form className="">
                        <div class="form-group">
                                <label for="reply" className="reply">Message</label>
                                <p></p>
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