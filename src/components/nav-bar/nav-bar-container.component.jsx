import React from "react";
import { NavBarList } from "./nav-bar-list.component";
export const NavBarContainer = props => {
	return (
		<div>
			<NavBarList handleClick={props.handleClick} />
		</div>
	);
};
