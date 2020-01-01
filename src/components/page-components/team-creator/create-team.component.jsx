import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./create-team.styles.scss";

export const CreateTeam = props => {
	console.log("props.leagues: ", props.leagues);
	const [createTeam, setCreateTeam] = useState({
		name: "",
		location: "",
		image: ""
	});

	const [chosenLeague, setChosenLeague] = useState({});

	const renderLeagueForm = () => {
		return props.leagues.map(league => {
			return (
				<option onChange={handleChange} value={league}>
					{league.name}
				</option>
			);
		});
	};

	const handleChange = e => {
		debugger;
		setCreateTeam({ ...createTeam, [e.target.name]: e.target.value });
		setChosenLeague(e.target.value);
		console.log(chosenLeague);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		fetch("");
	};
	return (
		<div>
			<h1>Create Team</h1>
			<form class="form-container" onSubmit={handleSubmit}>
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

				<select className="option-input" value={chosenLeague}>
					{renderLeagueForm()}
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
