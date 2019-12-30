import React, { Component } from "react";
import "./forms.styles.scss";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default class Login extends Component {
	state = {
		loginData: {
			email: "",
			password: ""
		}
	};

	handleChange = e => {
		this.setState({
			loginData: { ...this.state.loginData, [e.target.name]: e.target.value }
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		fetch("http://localhost:3001/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				email: this.state.loginData.email,
				password: this.state.loginData.password
			})
		})
			.then(resp => resp.json())
			.then(data => {
				localStorage.setItem("token", data.jwt);
				this.props.handleLogin(data.user);
			})
			.catch(err => console.log(err));
		this.setState({
			loginData: {
				email: "",
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
					<h1>Login</h1>

					<input
						placeholder="Email"
						type="text"
						name="email"
						value={this.state.loginData.email}
						onChange={this.handleChange}
					/>

					<input
						placeholder="Password"
						type="password"
						name="password"
						value={this.state.loginData.password}
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
						Login
					</Button>
				</form>
			</div>
		);
	}
}
