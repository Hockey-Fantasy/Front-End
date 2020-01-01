import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./forms.styles.scss";
export const Logout = () => {
	return (
		<div>
			<Button
				className="logout-page-btn"
				variant="outlined"
				style={{
					background: "#05386B",
					borderRadius: "20px",
					width: "30%",
					margin: "auto 0",
					color: "salmon",
					position: "absolute",
					left: "33%",
					top: "50%"
				}}
				placeholder="submit"
				type="submit"
			>
				<Link to="/">Return to Home Page</Link>
			</Button>
		</div>
	);
};
