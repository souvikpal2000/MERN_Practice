import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Common from "./common/Common";

const About = () => {
    const navigate = useNavigate();

    const fetchApi = async () => {
        try{
            const res = await fetch("/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });
            const data = await res.json();
            if(data.status !== 200){
                throw new Error(data.message);
            }
            console.log(data);
        }catch(err){
            navigate("/login");
        }
    }

    useEffect(() => {
        fetchApi();
    }, []);
    
    return(
        <>
            <Common/>
            <div className="bodyContainer">
                <h2>About Page</h2>
            </div>
        </>
    )
}

export default About;