//page for editing patient record
import React from 'react';

export default class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
			id: '',
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
			sec_vac: null,

			getPatient: this.props.location.data
			};
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

	deleterec = (event) => {
		//check if user exists if not push to login page
		const user = JSON.parse(localStorage.getItem('user'))
		if(!user){
			this.props.history.push('./login');
			window.location.reload();
		}

		fetch(`http://localhost:8080/delete`, {
				method: "POST",
				body: JSON.stringify(this.state),
				headers: {
						'x-access-token': user.accessToken,
						'Content-Type': 'application/json'
		},
		}).then(
		response=>response.json())
		.then(response=>{
				alert("Patient Record Deleted Successfully");
		})
		this.props.history.push('./view');
	}

	//on submit edit patient record
	submitHandler = (event) => {
		//check if user exists if not push to login page
		const user = JSON.parse(localStorage.getItem('user'))
		if(!user){
			this.props.history.push('./login');
			window.location.reload();
		}

		fetch(`http://localhost:8080/edit`, {
				method: "POST",
				body: JSON.stringify(this.state),
				headers: {
						'x-access-token': user.accessToken,
						'Content-Type': 'application/json'
		},
		}).then(
		response=>response.json())
		.then(response=>{
				alert("Patient Record Edited Successfully");
		})
		this.props.history.push('./view');
	}

	//load patient record into display
	componentDidMount(){
		this.getPatients();
	}

	getPatients = _ => {
		//check if user exists if not push to login page
		const user = JSON.parse(localStorage.getItem('user'))
		if(!user){
			this.props.history.push('./login');
			window.location.reload();
		}

		fetch(`http://localhost:8080/get`, {
				method: "POST",
				body: JSON.stringify(this.state.getPatient),
				headers: {
						'x-access-token': user.accessToken,
						'Content-Type': 'application/json'
				},
		}).then(
				response=>response.json())
			.then(response=>{
					this.setState({id: response[0].id_info})
					this.setState({fname: response[0].first_name})
					this.setState({lname: response[0].last_name})
					this.setState({ssn: response[0].ssn})
					this.setState({dob: response[0].dob})
					this.setState({email: response[0].email})
					this.setState({phone: response[0].phone})
					this.setState({addr1: response[0].address_line1})
					this.setState({addr2: response[0].address_line2})
					this.setState({city: response[0].city})
					this.setState({state: response[0].state})
					this.setState({zip: response[0].zip})
					this.setState({first_vac: response[0].first_vac})
					this.setState({sec_vac: response[0].sec_vac})
		})
	}


  render() {
    return (
		<div className = 'flex-container'>
		<div className = 'edit-outerbox'>
		
			<form onSubmit={this.submitHandler} method="POST">
				<div className='header'>
					<h1>Edit Patient Record</h1>
				</div>

				<div className='edit-innerbox'>


				<div className='e'>
				<label>
				First Name
				<input
					className='userinput'
					onChange={this.updateFname}
					name="fname"
					value={this.state.fname}
                    type='text'
                    ref={this.fnameText}
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
					value={this.state.lname}
					type='text'
					ref={this.lnameText}
				/>
				</label>
				</div>
				<p>{this.state.message}</p>
               

				<div className='e'>	
				<label>
				Social Security Number
				<input
					className='userinput'
					onChange={this.updateSSN}
					name="ssn"
					value={this.state.ssn}
					type='text'
					ref={this.ssnText}
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
					value={this.state.dob}
					type='text'
					ref={this.dobText}
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
					value={this.state.email}
					type='text'
					ref={this.emailText}
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
					value={this.state.phone}
					type='text'
					ref={this.phoneText}
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
					value={this.state.addr1}
					type='text'
					ref={this.addr1Text}
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
					value={this.state.addr2}
					type='text'
					ref={this.addr2Text}
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
					value={this.state.city}
					type='text'
					ref={this.cityText}
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
					value={this.state.state}
					type='text'
					ref={this.stateText}
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
					value={this.state.zip}
					type='text'
					ref={this.zipText}
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
					value={this.state.first_vac}
					type='text'
					ref={this.first_vacText}
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
					value={this.state.sec_vac}
					type='text'
					ref={this.sec_vacText}
				/>
				</label>
				</div>
			
				<input
					type='submit'
					className='button'
				/>

				<button
					type='button'
					className='button-del'
					onClick={event => this.deleterec(event)}
				>
				Delete
				</button>

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