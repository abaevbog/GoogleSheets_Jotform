const {google} = require('googleapis');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var s3 = new AWS.S3({apiVersion: '2006-03-01', params: {Bucket: process.env.BuckerName}});
var CLIENT_ID = process.env.CLIENT_ID;
var API_KEY = process.env.API_KEY;
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var REDIRECT_URL = "https://basementremodeling.com";


exports.handler = async (event) => {
    return new Promise((resolve,reject) => {
      s3.getObject({Bucket: process.env.BuckerName, Key: "RefreshToken.txt"}, async function(err,data){
        if (err){
          const result = {
                statusCode: 400,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "Content-Type",
                  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
              },
                body: JSON.stringify("Refresh token not found: you need to authenticate"),
            };  
          reject(result);
        }else {
        const refreshToken = data.Body.toString();
        const oauth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URL
          );
          oauth2Client.setCredentials({
            refresh_token: refreshToken
          });      
      

        const sheets = google.sheets({version: 'v4',auth:API_KEY, oauth2Client});
        const body = JSON.parse(event["body"]);
        const sheetId = body["sheetId"];
        const table = body["table"];
        sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            'range': table,
            'auth': oauth2Client
          }).then(function(response){
            const result = {
                  statusCode: 200,
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                  body: JSON.stringify(response["data"]),
              };
            resolve(result);
          }).catch((e)=> {
            const result = {
                  statusCode: 400,
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                  body: JSON.stringify(e),
              };
            reject(result);
          })
      }})
  });
}
