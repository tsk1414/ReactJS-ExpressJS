//logout page
import React from 'react';

export default class Logout extends React.Component {
  componentDidMount(){
      this.logout();
  }

  logout = _ => {    
      localStorage.clear();
      setTimeout(() => {  this.props.history.push('./login');
      window.location.reload() }, 2000);
  }
  render(){
      return(
      <p className='logout'>Logging out . . .</p>
      )
  }
}

