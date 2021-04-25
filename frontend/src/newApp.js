import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: '' };
  }
  updateID = (event) => {
	this.setState({id: event.target.value});
  }
  submitHandler = (event) => {
    event.preventDefault();
	let {id}=this.state;
	
	fetch(`http://localhost:8080/${id}`, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			id:id
		})
	}).then(response=>response.json()).then(data=>{
		console.log(data)
	})
  }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <h1>Vaccine Verification Form</h1>
		<p>Enter Vaccine ID  
		<input
			onChange={this.updateID}
			name="id"
			value={this.state.id}
			type='text'
		/>
			</p>
		<input
			type='submit'
		/>
      </form>
	);
  }
}

