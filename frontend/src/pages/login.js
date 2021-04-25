//login page
import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
		email: '',
		password: ''
	};
  }

  updateEmail = (event) => {
	  this.setState({[event.target.name] : event.target.value});
  }

  updatePassword = (event) => {
	  this.setState({[event.target.name] : event.target.value});
  }

  submitHandler = (event) => {
	event.preventDefault();
	//request to verify login credentials
	fetch(`http://localhost:8080/login`, {
		method: "POST",
		body: JSON.stringify(this.state),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		}).then(response=>response.json())
    .then(response=> {
			if(response.accessToken) {
					localStorage.setItem("user", JSON.stringify(response));
					this.props.history.push('./dashboard');
					window.location.reload();
			}
		})
  }
  render() {
    return (
		<div className = 'form-container'>
			<form onSubmit={this.submitHandler} method="POST">
				<div className='header'>
				<h1>Login for Health Care Providers</h1>
				</div>
					<p>
					<input
						onChange={this.updateEmail}
						name="email"
						value={this.state.email}
						type='text'
						placeholder='Email'
					/>
					</p>
					<p>
					<input
						onChange={this.updatePassword}
						name="password"
						value={this.state.password}
						type='text'
						placeholder='Password'
								/>
					</p>
					<p>{this.state.message}</p>
					<input
						className='button'
						type='submit'
					/>

					<div className='message-box'>
						<p className='message'>{this.state.message}</p>
					</div>
					<p>
						Test Case: max.johnson@yahoo.com, maxpw
					</p>
			</form>
		</div>
	);
  }
}

