import React, { Component } from "react";
import "./forms.styles.scss";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default class SignUp extends Component {
	state = {
		signUpData: {
			firstName: "",
			lastName: "",
			email: "",
			username: "",
			password: ""
		}
	};

	handleChange = e => {
		this.setState({
			signUpData: { ...this.state.signUpData, [e.target.name]: e.target.value }
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		fetch("http://localhost:3001/users", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				first_name: this.state.signUpData.firstName,
				last_name: this.state.signUpData.lastName,
				email: this.state.signUpData.email,
				username: this.state.signUpData.username,
				password: this.state.signUpData.password
			})
		})
			.then(res => res.json())
			.then(data => {
				localStorage.setItem("token", data.jwt);
				this.props.handleLogin(data.user);
				// this.redirect();
			})
			.catch(error => console.error("api errors:", error));

		this.setState({
			signUpData: {
				firstName: "",
				lastName: "",
				email: "",
				username: "",
				password: ""
			}
		});
	};

	// redirect = () => {
	// 	this.props.history.push("/user");
	// };
	render() {
		return (
			<div>
				<form className="form-container" onSubmit={this.handleSubmit}>
					<h1>Sign Up</h1>
					<input
						placeholder="First Name"
						type="text"
						name="firstName"
						value={this.state.signUpData.firstName}
						onChange={this.handleChange}
					/>
					<input
						placeholder="Last Name"
						type="text"
						name="lastName"
						value={this.state.signUpData.lastName}
						onChange={this.handleChange}
					/>
					<input
						placeholder="Email"
						type="text"
						name="email"
						value={this.state.signUpData.email}
						onChange={this.handleChange}
					/>
					<input
						placeholder="Username"
						type="text"
						name="username"
						value={this.state.signUpData.username}
						onChange={this.handleChange}
					/>
					<input
						placeholder="Password"
						type="password"
						name="password"
						value={this.state.signUpData.password}
						onChange={this.handleChange}
					/>
					<Button
						onClick={this.props.handleAuthClick}
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
						Sign Up
					</Button>
				</form>
			</div>
		);
	}
}
