import React, { Component } from 'react';
import $ from 'jquery';
import AutocompletePage from './autocomplete';
import Loading from './loading';

class Options extends Component {

  constructor(props) {
    super(props);
    this.state = { input: "", failedLookup: false, options: [], updated:false };
    this.fetchGoogleSheets = this.fetchGoogleSheets.bind(this);
  }

  componentDidMount() {
    this.fetchGoogleSheets(this);
    window.JFCustomWidget.subscribe("submit", (e) => {
      var msg = {
          valid: true,
          value: document.getElementsByTagName('input')[0].value
      }
      window.JFCustomWidget.sendSubmit(msg);
  });
    
  }



  fetchGoogleSheets(that) {
    console.log("In fetch google sheets");

    $.ajax({
      url: 'https://g6728mnsi5.execute-api.us-east-1.amazonaws.com/exchangeCodeForTOken/querygooglesheet',
      method: 'POST',
      data: JSON.stringify({'sheetId':that.props.spreadsheetUrl,'table':that.props.googleSheetTable}),
      success: function (resp) {
        var res = [];
        for(var i =0;i<resp.values.length;i++){
          if (resp.values[i][that.props.columnIndex] ){
            res.push(resp.values[i][that.props.columnIndex]);
          }
        }
        that.setState({ options: res, updated:true });
      },
      error: function (err) {
        console.log(err);
        that.setState({ failedLookup: true });
      }
    });
    
  }



  render() {
    if (this.state.failedLookup) {
      return (
        <div className="container">
          <div className="row">
            <div className="col align-self-center">
              <h2>There was an error loading data from google sheets...</h2>
              <h4>Ensure that google sheets id,table name and column id are correct and reload the page. </h4>
            </div>
          </div>
        </div>
      );
    } else if (!this.state.updated){
      return (<Loading> </Loading>);
    }
    return (
      <div className="container">
        
          <div className="col-sm-10">
            <AutocompletePage options={this.state.options} columnIndex={0}> </AutocompletePage>
          </div>
        

      </div>

    );
  }

}
export default Options;