import React from "react";
import "./user.styles.scss";
export const User = props => {
	return (
		<div className="card-container">
			<h1 className="user-name">
				Hello {props.currentUser.first_name} {props.currentUser.last_name}
			</h1>
			<p>Placeholder para</p>
			<p>Placeholder para</p>
			<p>Placeholder para</p>
		</div>
	);
};
