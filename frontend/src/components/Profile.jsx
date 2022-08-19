import React, { useContext } from "react";
import { UserValueContext } from "./About";

const Profile = () => {
    const value = useContext(UserValueContext);
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
                    <p>{value.id}</p>
                    <p>{value.name}</p>
                    <p>{value.email}</p>
                    <p>{value.phone}</p>
                    <p>{value.work}</p>
                </div>
            </div>
        </>
    )
}

export default Profile;