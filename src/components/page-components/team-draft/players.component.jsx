import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
	root: {
		width: "20rem"
	},
	gridItem: {
		background: "#5CDB95",
		border: "#05386B groove 10px",
		margin: "0px auto 50px auto",
		height: "100%"
	},
	paper: {
		padding: theme.spacing(3),
		textAlign: "center",
		color: "#05386B",
		backgroundColor: "#5CDB95",
		fontSize: "1.2rem"
	},
	imageTag: {
		width: "100%",
		height: "60%"
	},
	para: {
		textAlign: "center"
	},
	UL: {
		background: "#05386B"
	},
	lists: {
		listStyle: "none",
		color: "#EDF5E1",
		marginRight: "45px",
		padding: "10px 0px 0px 10px",
		textAlign: "center"
	},
	button: {
		textAlign: "center",
		marginLeft: "80px",
		fontSize: "1.2rem",
		background: "#EDF5E1",
		borderRadius: "25px",
		marginBottom: "10px"
	}
}));

const token = localStorage.getItem("token");
const teamID = parseInt(localStorage.getItem("id"), 10);

export const Players = props => {
	// const [selectedPlayer, setSelectedPlayer] = useState([]);

	const classes = useStyles();

	const handleClick = chosenPlayer => {
		return fetch("http://localhost:3001/contracts", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				team_id: teamID,
				player_id: chosenPlayer
			})
		})
			.then(res => res.json())
			.then(draftPlayer => console.log(draftPlayer))
			.catch(err => console.log(err));
	};

	return (
		<div>
			<Grid container className={classes.root} spacing={0}>
				<Grid className={classes.gridItem} item xs={10}>
					<Paper className={classes.paper}>{props.player.name}</Paper>
					<img
						className={classes.imageTag}
						src={props.player.image}
						alt={props.player.name}
					/>
					<p className={classes.para}>Age: {props.player.age}</p>
					<p className={classes.para}>{props.player.position}</p>
					<h3 style={{ textAlign: "center" }}>Stats:</h3>
					<ul className={classes.UL}>
						<li className={classes.lists}> Goals: {props.player.goals}</li>
						<li className={classes.lists}>Assists: {props.player.assists}</li>
						<li className={classes.lists}>FP: {props.player.fantasy_points}</li>
					</ul>
					<Button
						onClick={e => handleClick(props.player.id)}
						className={classes.button}
					>
						Select
					</Button>
				</Grid>
				{/* <h1>{props.player.name}</h1>
				<img src={props.player.image} alt={props.player.name} />
				<p></p> */}
			</Grid>
		</div>
	);
};
