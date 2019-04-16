const uuidv1 = require('uuid/v1');
const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "livvyMarketplace";
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const partitionKeyName = "id";
const partitionKeyType = "S";
const sortKeyName = "userId";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/livvyMarketplace";
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

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

app.get(path + hashKeyPath, function(req, res) {
  let userId;
  try {
    userId = getUserId(req);
  } catch (err) { res.json({ statusCode: 401, error: 'Unauthorized access: ' + err }); }

  var condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  try {
    condition[partitionKeyName]['AttributeValueList'] = userId;
  } catch (err) {
    res.json({ error: 'Wrong column type ' + err });
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  }

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.json({ error: 'Could not load items: ' + err });
    } else {
      res.json(data.Items);
    }
  });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  let userId;
  try {
    userId = getUserId(req);
  } catch (err) { res.json({ statusCode: 401, error: 'Unauthorized access: ' + err }); }

  var params = {};
  params[partitionKeyName] = req.params[partitionKeyName];
  params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);

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
* HTTP put method for insert object *
*************************************/

app.put(path, function(req, res) {

  let userId;
  try {
    userId = getUserId(req);
  } catch (err) { res.json({ statusCode: 401, error: 'Unauthorized access: ' + err }); }

  const item = {};
  item[partitionKeyName] = id;
  item[sortKeyName] = new Date().getTime();
  item["uuid"] = uuidv1();
  item["from"] = userId;
  item["message"] = req.body.message;

  let putItemParams = {
    TableName: tableName,
    Item: item
  }
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.json({ error: err, url: req.url, body: req.body });
    } else {
      res.json({ success: 'put call succeed!', url: req.url, data: data })
    }
  });

});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, function(req, res) {

  let userId;
  try {
    userId = getUserId(req);
  } catch (err) { res.json({ statusCode: 401, error: 'Unauthorized access: ' + err }); }

  const tableKey = {};
  tableKey[partitionKeyName] = userId;

  if (!req.body[sortKeyName]) {
    res.json({ statusCode: 500, error: 'Missing sort key.' });
  }

  tableKey[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);

  var updateExpression = "set ";
  var expressionAttributeValues = {}

  const items = {};
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

/**************************************
* HTTP remove method to delete object *
***************************************/

let userId;
try {
  userId = getUserId(req);
} catch (err) { res.json({ statusCode: 401, error: 'Unauthorized access: ' + err }); }


var params = {};
params[partitionKeyName] = userId;

if (!req.body[sortKeyName]) {
  res.json({ statusCode: 500, error: 'Missing sort key.' });
}

params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);

let removeItemParams = {
  TableName: tableName,
  Key: params
}
dynamodb.delete(removeItemParams, (err, data) => {
  if (err) {
    res.json({ error: err, url: req.url });
  } else {
    res.json({ url: req.url, data: data });
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
