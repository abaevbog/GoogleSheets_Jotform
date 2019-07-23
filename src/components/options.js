import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
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
    console.log(that.props.spreadsheetUrl);
    console.log(that.props.googleSheetTable);
    if (that.props.spreadsheetUrl && that.props.googleSheetTable){
      window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: that.props.spreadsheetUrl,
        'range': that.props.googleSheetTable,
      }).then(function(response){
        that.setState({options:response.result.values});
        console.log(that.state.options);
      })
    } 
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2">Search:</div>
          <div className="col-sm-10">
            <AutocompletePage options={this.state.options} columnIndex={this.props.columnIndex}> </AutocompletePage>
          </div>
        </div>
 
      </div>

    );
  }

}
export default Options;