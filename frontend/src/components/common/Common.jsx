import React, { useContext, useEffect }  from "react";
import Cookies from "js-cookie";
import { UserContext } from "../../App";

const Common = () => {
    const {state, dispatch} = useContext(UserContext);
    useEffect(() => {
        if(Cookies.get("jwt")){
            dispatch({type: "loggedIn"})
        }else{
            dispatch({type: "loggedOut"})
        }
    });
    return(
        <></>
    )
}

export default Common;