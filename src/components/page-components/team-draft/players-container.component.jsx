import React, { Component } from "react";
import { Players } from "./players.component";

export default class PlayersContainer extends Component {
	state = {
		playerData: []
	};
	componentDidMount = () => {
		const token = localStorage.getItem("token");
		fetch("http://localhost:3001/players", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(res => res.json())
			.then(playerData => this.setState({ playerData: playerData }));
	};

	renderPlayerData = () => {
		return this.state.playerData.map(player => {
			return (
				<Players key={player.id} player={player} teamId={this.props.teamId} />
			);
		});
	};
	render() {
		return (
			<div>
				<h1
					style={{
						color: "#EDF5E1",
						marginBottom: "60px",
						fontSize: "3.5rem"
					}}
				>
					Draft Center
				</h1>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						flexDirection: "row",
						width: "100%"
					}}
				>
					{this.renderPlayerData()}
				</div>
			</div>
		);
	}
}
