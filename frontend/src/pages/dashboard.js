//dashboard after logging in
import React from 'react';
import { Button } from 'react-bootstrap';

export default class Dashboard extends React.Component {
	componentDidMount(){
		this.checkUser();
	}
	//verify token
	checkUser =_ => {
		const user = JSON.parse(localStorage.getItem('user'))
		if(!user){
			this.props.history.push('./login');
			window.location.reload();
		}
	}
  render() {
	return (
		<div className='flex-container'>
		<div className="home">
			<div className='header'>
			<h1>Dashboard</h1>
				<div className='e'>
				Welcome to your Dashboard. 
				</div>
			</div>
			
			<div className='e'>
			<Button variant="btn btn-success" onClick={() => this.props.history.push('/create')}>Create New Patient</Button>
			</div>

			<div className='e'>
			<Button variant="btn btn-success" onClick={() => this.props.history.push('/view')}>Edit Patient Record</Button>		
			</div>
			
		</div>
		</div>
	);
  }
}
  
