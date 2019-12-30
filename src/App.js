import React, { Component } from "react";
import { NavBarContainer } from "./components/nav-bar/nav-bar-container.component";
import { Route } from "react-router-dom";
import Login from "./components/registrations/login.components";
import SignUp from "./components/registrations/signup.components";
import { Home } from "./components/page-components/home-page.component";
import { User } from "./components/page-components/user/user.component";
import "./App.scss";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: {},
			currentUser: {},
			teamData: []
		};
	}

	fetchUsers = token => {
		fetch("http://localhost:3001/users", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(userData => this.setState({ users: userData.users }))
			.catch(error => console.error("api errors:", error));
	};

	fetchData = token => {
		fetch("http://localhost:3001/teams", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(teamInfo => this.setState({ teamData: teamInfo }))
			.catch(err => console.error(err));
	};

	handleLogin = loginData => {
		this.setState({
			currentUser: loginData
		});
	};

	componentDidMount = () => {
		const token = localStorage.getItem("token");
		if (token) {
			fetch(`http://localhost:3001/auto_login`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
				.then(resp => resp.json())
				.then(data => {
					this.setState({
						currentUser: data
					});
				})
				.catch(err => console.error(err));
		}

		this.fetchUsers(token);
		this.fetchData(token);
	};

	handleAuthClick = () => {
		const token = localStorage.getItem("token");
		fetch(`http://localhost:3001/user_is_authed`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(resp => resp.json())
			.then(data => console.log(data));
	};

	render() {
		return (
			<div className="App">
				<NavBarContainer />
				<Route
					exact
					path="/"
					render={props => (
						<Home {...props} loggedInStatus={this.state.isLoggedIn} />
					)}
				/>
				<Route
					exact
					path="/login"
					render={props => (
						<Login
							{...props}
							handleLogin={this.handleLogin}
							handleAuthClick={this.handleAuthClick}
						/>
					)}
				/>
				<Route
					exact
					path="/signup"
					render={props => (
						<SignUp
							{...props}
							handleLogin={this.handleLogin}
							handleAuthClick={this.handleAuthClick}
						/>
					)}
				/>
				<Route
					exact
					path="/user"
					render={props => (
						<User
							{...props}
							currentUser={this.state.currentUser}
							teamData={this.state.teamData}
						/>
					)}
				/>
			</div>
		);
	}
}
