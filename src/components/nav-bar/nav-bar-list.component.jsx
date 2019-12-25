import React from "react";
import { NavLink } from "react-router-dom";
import "./nav-bar-list.styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
	root: {
		"& > *": {
			margin: theme.spacing(1)
		}
	}
}));

export const NavBarList = () => {
	const classes = useStyles();
	return (
		<div className="nav-bar">
			<h1>Hockey Fantasy</h1>
			<div className="list-container">
				<li>
					<NavLink
						exact
						to="/"
						// activeStyle={{ fontWeight: "bold", color: "blue" }}
						activeClassName="selected"
					>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						exact
						to="/login"
						// activeStyle={{
						// 	fontWeight: "bold",
						// 	color: "blue",
						// 	textDecoration: "none"
						// }}
						activeClassName="selected"
					>
						Log In
					</NavLink>
				</li>
				<li>
					<NavLink
						exact
						to="/signup"
						// activeStyle={{ fontWeight: "bold", color: "blue" }}
						activeClassName="selected"
					>
						Sign Up
					</NavLink>
				</li>
			</div>
		</div>
	);
};
