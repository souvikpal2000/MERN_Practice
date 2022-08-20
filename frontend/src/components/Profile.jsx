import React, { useContext } from "react";
import { UserValueContext } from "./About";

const Profile = () => {
    const {state} = useContext(UserValueContext);
    return(
        <>
            <div className="profileContainer">
                <div className="title">
                    <p>User Id</p>
                    <p>Name</p>
                    <p>Email</p>
                    <p>Phone</p>
                    <p>Profession</p>
                </div>
                <div className="profileInfo">
                    <p>{state.data._id}</p>
                    <p>{state.data.name}</p>
                    <p>{state.data.email}</p>
                    <p>{state.data.phone}</p>
                    <p>{state.data.work}</p>
                </div>
            </div>
        </>
    )
}

export default Profile;