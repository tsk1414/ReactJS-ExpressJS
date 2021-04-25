import React from 'react';

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
		patients: []};
	}

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

		fetch(`http://localhost:8080/getall`, {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				'x-access-token': user.accessToken,
				'Content-Type': 'application/json'
			},
		}).then(response=>response.json())
			.then(response=>{
				this.setState({patients: response})
		})
	}

	selectHandler = (event) => {
		let selectID = {
			id: (event.target.value)
		};

		this.props.history.push({
			pathname: '/edit',
			data: selectID
		})
	}


  render() {
    return (
		<div className='flex-container'>
		<div className='table-wrapper'>
		
			<div className='header'>
				<h1>Patients</h1>
			</div>
			
			<table className='table-box'>
				<thead>
					<tr>
					<th className='col-fname'>First Name</th>
					<th className='col-lname'>Last Name</th>
					<th className='col-ssn'>SSN</th>
					<th className='col-dob'>DOB</th>
					<th className='col-email'>Email</th>
					<th className='col-email'>Phone</th>
					<th className='col-1st'>1st Vaccination</th>
					<th className='col-2nd'>2nd Vaccination</th>
					<th className='col-line1'>Address Line 1</th>
					<th className='col-line2'>Line 2</th>
					<th className='col-city'>City</th>
					<th className='col-state'>State</th>
					<th className='col-zip'>ZIP</th>
					<th className='col-button'></th>
					</tr>
				</thead>

				<tbody>
					{this.state.patients.map(person =>
						<tr key={person.id_info}>
							<td className='col-fname'>{person.first_name}</td>
							<td className='col-lname'>{person.last_name}</td>
							<td className='col-ssn'>{person.ssn}</td>
							<td className='col-dob'>{person.dob}</td>
							<td className='col-email'>{person.email}</td>
							<td className='col-1st'>{person.phone}</td>
							<td className='col-1st'>{person.first_vac}</td>
							<td className='col-2nd'>{person.sec_vac}</td>
							<td className='col-line1'>{person.address_line1}</td>
							<td className='col-line2'>{person.address_line2}</td>
							<td className='col-city'>{person.city}</td>
							<td className='col-state'>{person.state}</td>
							<td className='col-zip'>{person.zip}</td>
							<td className='col-button'>
								<button className='button' value={person.id_info} onClick={event => this.selectHandler(event, 'value')}>Edit</button>
							</td>
								</tr>
								)}
				</tbody>
			</table>

			<input
				className='button-back'
				type='submit'
				value='Back'
				onClick={() => this.props.history.goBack()}
			/>
					
		</div>
		</div>
	);
  }
}

