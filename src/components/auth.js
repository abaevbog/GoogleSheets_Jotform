import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

class Auth extends Component {

constructor(props) {
    super(props);
    this.state = {};
    this.handleAuthClick = this.handleAuthClick.bind(this);
  }

  handleAuthClick(that) {
    console.log("handle auth click");
    window.gapi.auth2.getAuthInstance().grantOfflineAccess().then(function(resp) {
      var auth_code = resp.code;
      $.ajax({
        url: 'https://g6728mnsi5.execute-api.us-east-1.amazonaws.com/exchangeCodeForTOken/exchangecodefortoken',
        method:'POST',
        data: auth_code,
        success: function(result){
          console.log("Done!");
          that.props.authDone();
          console.log(result);
        },
        error: function(err){
          console.log("BOO");
          console.log(err);
        }
      }) 
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