import React, { useState } from "react";
import Button from "@material-ui/core/Button";
export const EditUser = props => {
	console.log(props.currentUser);
	const [inputValue, setInputValue] = useState({
		email: "",
		username: ""
	});

	const handleChange = e => {
		setInputValue({ ...inputValue, [e.target.name]: e.target.value });
		console.log("inputValue: ", inputValue);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		console.log(token);
		fetch(`http://localhost:3001/users/${props.currentUser.id}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: inputValue.email,
				username: inputValue.username
			})
		})
			.then(res => res.json())
			.then(data => console.log(data));

		redirect();
	};

	const redirect = () => {
		props.history.push("/user/user-info");
	};

	return (
		<div>
			<form className="form-container" onSubmit={handleSubmit}>
				<input
					placeholder="Email"
					type="email"
					name="email"
					value={inputValue.email}
					onChange={handleChange}
				/>
				<input
					placeholder="Username"
					type="username"
					name="username"
					value={inputValue.username}
					onChange={handleChange}
				/>

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
					Edit
				</Button>
			</form>
		</div>
	);
};
