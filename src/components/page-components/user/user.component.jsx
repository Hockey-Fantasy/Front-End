import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./user.styles.scss";

export const User = props => {
	return (
		<div className="card-container">
			<h1 className="user-name">Welcome {props.currentUser.username}</h1>
			<Button variant="outlined" className="user-card-btn">
				<Link to="/user/user-info">User Info</Link>
			</Button>

			<Button variant="outlined" className="user-card-btn">
				<Link to="/user/create-team">Create A Team</Link>
			</Button>
		</div>
	);
};
