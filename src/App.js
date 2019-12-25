import React, { Component } from "react";
import { NavBarContainer } from "./components/nav-bar/nav-bar-container.component";
import { Route } from "react-router-dom";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teamData: []
		};
	}

	fetchData = () => {
		fetch("https://www.localhost:3000/teams")
			.then(res => res.json())
			.then(teamData => console.log(teamData))
			.catch(err => console.error(err));
	};

	componentDidMount = () => {
		this.fetchData();
	};

	render() {
		return (
			<div>
				<NavBarContainer />
			</div>
		);
	}
}
