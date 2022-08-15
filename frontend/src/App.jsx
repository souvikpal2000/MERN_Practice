import React, { useReducer, createContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from "./components/Header";
import Routing from "./components/Routing";
import Footer from "./components/Footer";

export const UserContext = createContext();
export const initialState = null;
export const reducer = (state, action) => {
	switch (action.type){
		case 'loggedIn':
			state = true;
			break;
		case 'loggedOut':
			state = false;
			break;
	}
	return state;
} 
const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return(
		<>	
			<UserContext.Provider value={{state, dispatch}}>
				<Header/>
				<Routing/>
				<Footer/>
			</UserContext.Provider>
		</>
	)
}

export default App;