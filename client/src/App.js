import './App.css';
import { Redirect , BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import chat from "./components/chat/Chat";
import home from "./components/home/Home";
import Navbar from "./components/layout/Navbar";
import login from "./components/auth/Login";
import signup from "./components/auth/Signup";
import serverURL from "./constant"

function App() {

	const [user, setUser] = useState(null);
	useEffect(() => {

		const verifyuser = async () => {
			try {
				const res = await fetch(`http://${serverURL}/verifyuser`, {
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' }
				});
				const data = await res.json();
				setUser(data.user)
			} catch (error) {
				console.log(error);
			}

		}

		verifyuser();
	}, [])

	return (
		<Router>
			<div className="App">
				<UserContext.Provider value={{ user, setUser }}>
					<Navbar />
					<Switch>
						<Route exact path='/' component={home} />
						<Route exact path='/chat/:room_id/:room_name' component={chat} />
						<Route path='/signup' component={signup} />
						<Route path='/login' component={login} />
						<Redirect from="*" to="/" />
					</Switch>
				</UserContext.Provider>
			</div>
		</Router>
	);
}

export default App;
