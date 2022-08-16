import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        fetch("/logout", {
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            navigate("/");
        }).catch((err) => {
            console.log(err);
        })
        
    }, []);
}

export default Logout