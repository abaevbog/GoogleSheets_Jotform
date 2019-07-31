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
    s3.getObject({Bucket: process.env.BuckerName, Key: "Done.txt"}, async function(err,data){
        if (err){
            const authCode = event["body"];
            const oauth2Client = new google.auth.OAuth2(
                  CLIENT_ID,
                  CLIENT_SECRET,
                  REDIRECT_URL
                );
            const {tokens} = await oauth2Client.getToken(authCode);
            console.log("tokens: ", tokens);
            s3.putObject({Bucket: process.env.BuckerName, Key: "RefreshToken.txt", Body: tokens.refresh_token}, function(err,data){
                if (err){
                    console.log(err);
                } else {
                    s3.putObject({Bucket: process.env.BuckerName, Key: "Done.txt", Body: ""}, function(err,data){
                       if (err){
                           console.log(err);
                       } else {
                            const response = {
                                statusCode: 200,
                                headers: {
                                      "Access-Control-Allow-Origin": "*",
                                      "Access-Control-Allow-Headers": "Content-Type",
                                      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                                  },
                                body: JSON.stringify('Done!'),
                            };
                            resolve(response);                           
                       }
                    });
                }
            });

        } else{
            
        const response = {
            statusCode: 200,
            headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "Content-Type",
                  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
             },
            body: JSON.stringify('Refresh token has already been received'),
            };
        resolve(response);
            }
        });
    });
};