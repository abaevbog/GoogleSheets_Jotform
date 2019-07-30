import React, { Component } from 'react';
import $ from 'jquery';
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
    console.log("In fetch google sheets");

      $.ajax({
        url:'https://g6728mnsi5.execute-api.us-east-1.amazonaws.com/exchangeCodeForTOken/querygooglesheet',
        method:'POST',
        data: {},
        success: function(resp){
          console.log(resp);
          that.setState({options:resp.values});
        },
        error: function(err){
          console.log(err);
        }
      });
   // } 
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2">Search:</div>
          <div className="col-sm-10">
            <AutocompletePage options={this.state.options} columnIndex={0}> </AutocompletePage>
          </div>
        </div>
 
      </div>

    );
  }

}
export default Options;