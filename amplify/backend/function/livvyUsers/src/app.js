const uuidv1 = require('uuid/v1');
const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "livvyUsers";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const partitionKeyName = "id";
const path = "/users";
const hashKeyPath = '/:' + partitionKeyName;

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

/**
 * This function returns the cognito user id (sub id) from the request object.
 * We use it to retrieve the userId for calls that need userId.
 * @param {Object} req The request object
 */
function getUserId(req) {
  const auth = req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider.split(":");
  return auth[auth.length - 1];
}

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path + "/all", function (req, res) {
  let getItemParams = {
    TableName: tableName
  }

  dynamodb.scan(getItemParams, (err, data) => {
    if (err) {
      res.json({ error: 'Could not load items: ' + err.message });
    } else {
      if (data) {
        res.json(data.Items);
      }
    }
  });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + hashKeyPath, function (req, res) {

  var params = {};
  params[partitionKeyName] = req.params[partitionKeyName];

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.get(getItemParams, (err, data) => {
    if (err) {
      res.json({ error: 'Could not load items: ' + err.message });
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data);
      }
    }
  });
});


/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path, function (req, res) {

  let userId;
  try {
    userId = getUserId(req);
  } catch (err) { res.json({ statusCode: 401, error: 'Unauthorized access: ' + err }); }

  var params = {};
  params[partitionKeyName] = userId;

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.get(getItemParams, (err, data) => {
    if (err) {
      res.json({ error: 'Could not load items: ' + err.message });
    } else {

      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data);
      }
    }
  });
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, function (req, res) {

  let userId;
  try {
    userId = getUserId(req);
  } catch (err) { res.json({ statusCode: 401, error: 'Unauthorized access: ' + err }); }

  const tableKey = {};
  tableKey[partitionKeyName] = userId;

  var updateExpression = "set ";
  var expressionAttributeValues = {}

  const items = req.body;
  items["updated"] = new Date().getTime();

  for (var key in items) {
    updateExpression = updateExpression + key + " = :" + key + ","
    expressionAttributeValues[":" + key] = items[key]
  }

  updateExpression = updateExpression.substr(0, updateExpression.length - 1);

  var postItemParams = {
    TableName: tableName,
    Key: tableKey,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "UPDATED_NEW"
  };

  dynamodb.update(postItemParams, (err, data) => {
    if (err) {
      res.json({ error: err, url: req.url, body: req.body });
    } else {
      res.json({ success: 'Message updated.', url: req.url, data: data })
    }
  });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
