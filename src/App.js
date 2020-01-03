import React, { Component } from "react";
import { NavBarContainer } from "./components/nav-bar/nav-bar-container.component";
import { Route } from "react-router-dom";
import Login from "./components/registrations/login.components";
import SignUp from "./components/registrations/signup.components";
import { Home } from "./components/page-components/home-page.component";
import { User } from "./components/page-components/user/user.component";
import "./App.scss";
import { UserInfo } from "./components/page-components/user/user-info.component";
import { CreateTeam } from "./components/page-components/team-creator/create-team.component";
import { EditUser } from "./components/page-components/user/edit-user.component";
import { Logout } from "./components/registrations/logout.component";
import PlayersContainer from "./components/page-components/team-draft/players-container.component";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			currentUser: {},
			token: "",
			errors: "",
			leagues: [],
			teamId: ""
		};
	}

	fetchUsers = token => {
		fetch("http://localhost:3001/users", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(userData => {
				this.setState({
					users: userData
				});
			})
			.catch(error => console.error(this.setState({ errors: error })));
	};

	fetchLeagues = token => {
		fetch("http://localhost:3001/leagues", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(leagueData => this.setState({ leagues: leagueData }))
			.catch(err => console.error(err));
	};

	handleLogin = loginData => {
		this.setState({
			currentUser: loginData
		});
	};

	catchTeamId = teamID => {
		console.log("teamID ", teamID);
		this.setState({
			teamId: teamID
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
						currentUser: data,
						token: token
					});
				})
				.catch(err => console.error(err));
			localStorage.setItem("currentUser", this.state.currentUser);
			this.fetchUsers(token);
			this.fetchLeagues(token);
		}
	};

	handleClick = () => {
		this.setState({
			currentUser: null,
			token: null
		});

		localStorage.removeItem("token");
		localStorage.removeItem("currentUser");
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
				<NavBarContainer handleClick={this.handleClick} />
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

				<Route
					exact
					path="/user/user-info"
					render={props => (
						<UserInfo {...props} currentUser={this.state.currentUser} />
					)}
				/>

				<Route
					exact
					path="/user/create-team"
					render={props => (
						<CreateTeam
							{...props}
							currentUser={this.state.currentUser}
							leagues={this.state.leagues}
							token={this.state.token}
							catchTeamId={this.catchTeamId}
						/>
					)}
				/>

				<Route
					exact
					path="/user/edit-user"
					render={props => (
						<EditUser {...props} currentUser={this.state.currentUser} />
					)}
				/>

				<Route exact path="/logout" render={props => <Logout {...props} />} />

				<Route
					exact
					path="/user/draft-players"
					render={props => (
						<PlayersContainer
							{...props}
							currentUser={this.state.currentUser}
							teamId={this.state.teamId}
						/>
					)}
				/>
			</div>
		);
	}
}
