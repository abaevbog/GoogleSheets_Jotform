
This React project is the custom jotform (jotform.com) made for http://basementremodeling.com.

Integrates Jotform API, with GoogleSheets API and Google oAuth2. 

aws_lambda_oAuth.js exchanges auth_code passed from client to aws for refresh and access tokens. 
aws_lambda_queryGoogleGheets.js sends the query to google sheets API go get data from spreadsheets. 

Other files are ReactJs implementation of the static website. 
