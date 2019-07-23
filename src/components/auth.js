import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Auth extends Component {

constructor(props) {
    super(props);
    this.state = {};
    this.handleAuthClick = this.handleAuthClick.bind(this);
  }

  handleAuthClick(event) {
    console.log("handle auth click");
    window.gapi.auth2.getAuthInstance().signIn().then((err,res)=> {
      if (window.gapi.auth2.getAuthInstance().isSignedIn.get()){
        this.props.authDone();
      }
    });

  }





render() {
    return (
        
    <div className="container">
        <div className="row">
          <div className="col align-self-center">
            <div className="buttons">
                <Button id="button" onClick={() => this.handleAuthClick(this)}>Authorise</Button>
            </div>
          </div>
        </div>    
    </div>
    );
}

}
export default Auth;