//page for creating new patient records
import React from 'react';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
			fname:'',
			lname:'',
			ssn:'',
			dob:'',
			email: '',
			phone: '',
			addr1:'',
			addr2: '',
			city: '',
			state: '',
			zip: '',
		
			message: null,

			first_vac: null,
			sec_vac: null
		};
  }

	componentDidMount(){
		this.checkUser();
	}

	checkUser =_ => {
		const user = JSON.parse(localStorage.getItem('user'))
		if(!user){
			this.props.history.push('./login');
			window.location.reload();
		}
	}
	
	updateFname = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updateLname = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updateSSN = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updateDOB = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updateEmail = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updatePhone = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updateAddr1 = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updateAddr2 = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updateCity = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updateState = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updateZip = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updateFirst_vac = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}
	updateSec_vac = (event) => {
		this.setState({[event.target.name] : event.target.value});
	}

  submitHandler = (event) => {
		//check if user exists if not push to login page
		const user = JSON.parse(localStorage.getItem('user'))
		if(!user){
			this.props.history.push('./login');
			window.location.reload();
		}
		//request to create new patient record
		fetch(`http://localhost:8080/create`, {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				'x-access-token': user.accessToken,
				'Content-Type': 'application/json'
			},
		})
		.then(response=>response.json())
		.then(response=>{
			alert("Patient Record Created Successfully");
		})
		this.props.history.push('./view');
  }
  render() {
    return (
		<div className='flex-container'>
		<div className = 'create-outerbox'>
			
			<form onSubmit={this.submitHandler} method="POST">
				<div className='header'>
					<h1>New Patient Record</h1>
				</div>

				<div className='edit-innerbox'>
				<div className='e'>
				<label>
				First Name
				<input
					className='userinput'
					onChange={this.updateFname}
					name="fname"
					type='text'
					
				/>
				</label>
				</div>

				<div className='e'>
				<label>
				Last Name
				<input
					className='userinput'
					onChange={this.updateLname}
					name="lname"
					type='text'
							/>
				</label>
				</div>

				<div className='e' >
				<label>
				Social Security Number
				<input
					className='userinput'
					onChange={this.updateSSN}
					name="ssn"
					type='text'
				/>
				</label>
				</div>

				<div className='e'>
				<label>
				Date of Birth
				<input
					className='userinput'
					onChange={this.updateDOB}
					name="dob"
					placeholder="MM/DD/YYYY"
					type='text'
				/>
				</label>
				</div>

				<div className='e'>
				<label>
				Email Address
				<input
					className='userinput'
					onChange={this.updateEmail}
					name="email"
					type='text'
				/>
				</label>
				</div>

				<div className='e'>
				<label>
				Phone
				<input
					className='userinput'
					onChange={this.updatePhone}
					name="phone"
					type='text'
				/>
				</label>
				</div>

				<div className='e'>
				<label>
				Address Line 1
				<input
					className='userinput'
					onChange={this.updateAddr1}
					name="addr1"
					type='text'
				/>
				</label>
				</div>

				<div className='e'>
				<label>
				Line 2
				<input
					className='userinput'
					onChange={this.updateAddr2}
					name="addr2"
					type='text'
				/>
				</label>
				</div>

				<div className='e'>
				<label>
				City
				<input
					className='userinput'
					onChange={this.updateCity}
					name="city"
					type='text'
				/>
				</label>
				</div>

				<div className='e'>
				<label>
					State
				<input
					className='userinput'
					onChange={this.updateState}
					name="state"
					type='text'
				/>
				</label>
				</div>

				<div className='e'>
				<label>
					ZIP Code
				<input
					className='userinput'
					onChange={this.updateZip}
					name="zip"
					type='text'
				/>
				</label>
				</div>

				<div className='e'>
				<label>
				First Vaccination
				<input
					className='userinput'
					onChange={this.updateFirst_vac}
					name="first_vac"
					placeholder="MM/DD/YYYY"
					type='text'
				/>
				</label>
				</div>

				<div className='e'>
				<label>
					Second Vaccination
				<input
					className='userinput'
					onChange={this.updateSec_vac}
					name="sec_vac"
					placeholder="MM/DD/YYYY"
					type='text'
				/>
				</label>
				</div>
				
				<input
					className='button'
					type='submit'
					value='Create'
				/>

				<input
					className='button-back'
					value='Back'
					onClick={() => this.props.history.goBack()}
				/>
				</div>
			</form>
			
		</div>
		</div>
	);
  }
}