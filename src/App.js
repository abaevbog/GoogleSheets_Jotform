import React, { Component } from 'react';
import './App.css';
import Auth from './components/auth';
import Options from './components/options';
import Loading from './components/loading';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      status:'auth',
      spreadsheetUrl:'',
      googleSheetTable:'',
      columnIndex: 0
    }
  
    this.authDone = this.authDone.bind(this);
    this.initClient = this.initClient.bind(this);
    this.loadGapiAndAfterwardsInitAuth = this.loadGapiAndAfterwardsInitAuth.bind(this);
    this.getJotFormParams = this.getJotFormParams.bind(this);
    this.loadAWS = this.loadAWS.bind(this);
    this.prepAWS = this.prepAWS.bind(this);
  }

  loadGapiAndAfterwardsInitAuth() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.defer = true;
    script.onload=()=>{this.initClient(this)};
    document.head.appendChild(script);
}

  loadAWS(){
    const script = document.createElement("script");
    script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js";
    script.async = true;
    script.defer = true;
    script.onload=()=>{this.prepAWS(this)};
    document.head.appendChild(script);
  }

  prepAWS(that){
    console.log("AWS ready!");
    var BucketName = 'kuku.bucket.for.creds.superunique1235925';
    window.AWS.config.region = 'us-east-1'; 
    window.AWS.config.credentials = new window.AWS.CognitoIdentityCredentials({
        IdentityPoolId: "us-east-1:ae3448c6-787e-4d5c-8e3b-19b9acba2b38",
    });

    var s3 = new window.AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: BucketName}
    });

    s3.getObject({Bucket: BucketName, Key: "Done.txt"}, function(err,data){
      if (err){
        console.log("not authed");
        that.loadGapiAndAfterwardsInitAuth();
      } else {
        console.log("authed");
        that.setState({status:'search', loading:false});
      }
    });

  }


  componentDidMount(){
    this.loadAWS();
    window.JFCustomWidget.subscribe("ready", ()=> {
      this.getJotFormParams(this);
    })
  }

  getJotFormParams(that){
    const googleSheetId = window.JFCustomWidget.getWidgetSetting('googleSheetId');
    const googleSheetTable = window.JFCustomWidget.getWidgetSetting('googleSheetTableName');
    const columnIndex = window.JFCustomWidget.getWidgetSetting('columnIndex');
    that.setState({spreadsheetUrl:googleSheetId, googleSheetTable:googleSheetTable, columnIndex:columnIndex-1});
  }

  authDone(){
    this.setState({status:'search'});
  }



  initClient(that) {
    var CLIENT_ID = '359652543273-isuh9t7hco6p8f1pav3kau3misrim8tv.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyDjHBwz8TITrxzmbOhLgx0m0MW1RyXkAPw';
    var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
    window.gapi.load('client', function(){
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then((res)=>{
      that.setState({loading:false});
      console.log("client loaded");
    }).catch((error) =>{
      console.log(error);
      });
    });
  }



  render() {
    var page;
    //if (this.state.loading || !this.state.spreadsheetUrl){ 
      if (this.state.loading){ 
      page = <Loading> </Loading>
    }else {
      if (this.state.status === 'auth' ){
        page = <Auth authDone={this.authDone}> </Auth>;
      } else if (this.state.status === 'search'){
        page = <Options spreadsheetUrl={this.state.spreadsheetUrl} googleSheetTable={this.state.googleSheetTable} columnIndex={this.state.columnIndex}></Options>
      }
    }
    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

export default App;

