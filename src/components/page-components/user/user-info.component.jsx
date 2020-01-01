import React from "react";
import "./user.styles.scss";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export const UserInfo = props => {
	return (
		<div className="card-container">
			<h3>
				Name: {props.currentUser.first_name} {props.currentUser.last_name}
			</h3>
			<h3>Email: {props.currentUser.email}</h3>
			<h3>Username: {props.currentUser.username}</h3>

			<Button variant="outlined" className="user-card-btn">
				<Link to="/user/edit-user">Edit User Info</Link>
			</Button>
		</div>
	);
};
