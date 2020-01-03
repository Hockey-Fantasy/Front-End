import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./create-team.styles.scss";

export const CreateTeam = props => {
	const [createTeam, setCreateTeam] = useState({
		name: "",
		location: "",
		image: ""
	});

	const [chosenLeague, setChosenLeague] = useState({
		id: "",
		name: "",
		location: ""
	});

	const handleChange = e => {
		setCreateTeam({ ...createTeam, [e.target.name]: e.target.value });
	};

	const handleOptionsChange = e => {
		const newLeague = props.leagues.find(
			league => league.name === e.target.value
		);
		setChosenLeague({
			...chosenLeague,
			id: newLeague.id,
			name: newLeague.name,
			location: newLeague.location
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		fetch("http://localhost:3001/teams", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${props.token}`,
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: createTeam.name,
				location: createTeam.location,
				image: createTeam.image,
				user_id: props.currentUser.id,
				league_id: chosenLeague.id
			})
		})
			.then(res => res.json())
			.then(teamData => {
				props.catchTeamId(teamData.id);
				console.log(teamData);
			})
			.catch(error => console.log(error));

		redirect();
	};

	const renderOptionsForm = () => {
		return props.leagues.map(league => {
			return (
				<option key={league.id} name="league">
					{league.name}
				</option>
			);
		});
	};

	const redirect = () => {
		props.history.push("/user/draft-players");
	};

	return (
		<div>
			<h1>Create Team</h1>
			<form className="form-container" onSubmit={handleSubmit}>
				<input
					placeholder="Name"
					type="text"
					name="name"
					value={createTeam.name}
					onChange={handleChange}
				/>
				<input
					placeholder="Location"
					type="text"
					name="location"
					value={createTeam.location}
					onChange={handleChange}
				/>
				<input
					placeholder="Image"
					type="text"
					name="image"
					value={createTeam.image}
					onChange={handleChange}
				/>

				<select
					className="option-input"
					name="league"
					onChange={handleOptionsChange}
				>
					{renderOptionsForm()}
				</select>

				<Button
					variant="outlined"
					style={{
						background: "#05386B",
						borderRadius: "20px",
						width: "30%",
						marginLeft: "229px",
						marginTop: "20px",
						color: "salmon"
					}}
					placeholder="submit"
					type="submit"
				>
					Login
				</Button>
			</form>
		</div>
	);
};
