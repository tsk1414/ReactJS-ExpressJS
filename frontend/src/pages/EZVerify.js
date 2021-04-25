//EZ-Verify page to quickly get the vaccination status of a patient
import React from 'react';

export default class EZVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    id: '',
    message: ''
		};
  }

  updateID = (event) => {
    this.setState({[event.target.name] : event.target.value});
		this.setState({message: ''});
  }
	submitHandler = (event) => {
		event.preventDefault();
		fetch(`http://localhost:8080/status`, {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}).then(
			response=>response.json())
			.then(response=>{
				if (((response[0].first_vac) === null ) || ((response[0].first_vac) === '')){
					this.setState({message: 'No Record of Vaccinations'});
				}
				else{
					if (((response[0].sec_vac) === null) || ((response[0].sec_vac) === '') ){
						this.setState({message: 'Patient is Missing 2nd Vaccination'});
					}
					else{
						this.setState({message: 'Patient is Vaccinated'});
					}
				}
		})
	}
  render() {

    return (
		<div className = 'form-container'>
        <form onSubmit={this.submitHandler}>

					<div className='header'>
						<h1>E-Z Vaccine Verification Form</h1>
					</div>
					<p>Enter Patient Vaccine ID to Check Status</p>
					<p>
					<input
						onChange={this.updateID}
						name="id"
						type='text'
						placeholder='Vaccine ID'
					/>
					</p>

					<input
						className='button'
						type='submit'
						value='Check'
					/>
					<div className='message-box'>
						<p className='message'>{this.state.message}</p>
					</div>

					<p>
							Test Case: 10030, 10032
					</p>

        </form>
        </div>
	);
  }
}

