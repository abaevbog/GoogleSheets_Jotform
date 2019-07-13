import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './autocomplete';
import AutocompletePage from './autocomplete';
class Options extends Component {

  constructor(props) {
    super(props);
    this.state = { input: "", failedLogin: false,options:[] };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchGoogleSheets = this.fetchGoogleSheets.bind(this);
  }

  componentDidMount(){
    this.fetchGoogleSheets(this);
  }
 

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.handleSubmit(this);
    }
  }

  handleSubmit(){
    console.log(this.state.options);
  }




  fetchGoogleSheets(that){
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId:'1iNTYJT-JapbFI6dWbjjlf-MaFVz_wNXD9tw29bZLVcM',
      'range':'Costs',
    }).then(function(response){
      that.setState({options:response.result.values});
      console.log(that.state.options);
    })
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2">Search:</div>
          <div className="col-sm-10">
            <AutocompletePage options={this.state.options}> </AutocompletePage>
          </div>
        </div>
 
      </div>

    );
  }

}
export default Options;