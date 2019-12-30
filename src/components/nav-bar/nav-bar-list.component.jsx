import React from "react";
import { NavLink } from "react-router-dom";
import "./nav-bar-list.styles.scss";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

export const NavBarList = () => {
	return (
		<AppBar
			style={{
				background: "#5CDB95"
			}}
			position="sticky"
		>
			<div className="nav-bar">
				<h1>Hockey Buzz Central</h1>
				<ul className="list-container">
					<li>
						<Button
							variant="outlined"
							style={{
								background: "#05386B"
							}}
						>
							<NavLink exact to="/" activeClassName="selected">
								Home
							</NavLink>
						</Button>
					</li>
					<li>
						<Button
							variant="outlined"
							style={{
								background: "#05386B"
							}}
						>
							<NavLink exact to="/login" activeClassName="selected">
								Login
							</NavLink>
						</Button>
					</li>
					<li>
						<Button
							variant="outlined"
							style={{
								background: "#05386B"
							}}
						>
							<NavLink exact to="/signup" activeClassName="selected">
								Signup
							</NavLink>
						</Button>
					</li>
				</ul>
			</div>
		</AppBar>
	);
};
