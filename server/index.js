'use strict'

let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    loki = require('lokijs'),
    db = new loki('loki.json', {
      autoload: true,
      autoloadCallback : loadHandler,
      autosave: true,
      autosaveInterval: 1000
    }),
    teams, mob;

    function loadHandler() {
      teams = db.getCollection('teams');
      if (teams === null) {
        teams = db.addCollection('teams')
      }

      mob = db.getCollection('mob');
      if (mob === null) {
        mob = db.addCollection('mob')
      }
    }

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());

app.set('port', process.env.PORT || 5050);

function sendErrorResult(res, err) {
  console.error(err);
  res.set ({ 'Content-Type': 'application/json' });
  res.send({
      result: 'error',
      err:    err
  });
}

function sendSuccessResult(res, data) {
  res.set ({ 'Content-Type': 'application/json' });
  var returnObj = {};
  returnObj.result = 'success';
  returnObj.err = '';
  returnObj.data = data;
  res.send(returnObj);
}

function mapFromDb(lokiObj) {
  lokiObj.id = lokiObj.$loki;
  return _.omit(lokiObj, ['$loki', 'meta']);
}

function mapToDb(obj) {
  if (obj.id) {
      obj.$loki = obj.id;
      obj.meta = mob.get(obj.id).meta;
  }
  return _.omit(obj, ['id']);
}

app.get('/api/', function (req, res) {
  console.log(app._router.stack);

  var api = [], routes = app._router.stack;
  for (var key in routes) {
    if (routes.hasOwnProperty(key)) {
      var val = routes[key];
      if (val.route) {
        var endpoint = {};
        endpoint.path = val.route.path;
        endpoint.stack = val.route.stack[0].method.toUpperCase();
        api.push(endpoint);
      }
    }
  }
  sendSuccessResult(res, api);
});

app.get('/mob/:id', function (req, res) {
  let mobId = req.params.id;

  if (typeof mobId === "string") {
    mobId = parseInt(mobId);

    if (_.isNaN(mobId)) {
      sendErrorResult(res, "Id must be a number");
      return;
    }
  }
  console.log("Retrieving mob with id:", mobId);
  let data = mob.get(mobId);
  sendSuccessResult(res, mapFromDb(data));
});

app.post('/mob', function (req, res) {
  let mobToSave = mapToDb(req.body);
  let resData = {};
  if (mobToSave.$loki) {
    console.log("Updating mob with id:", mobToSave.$loki);
    resData = mob.update(mobToSave);
  } else {
    console.log("Creating new mob.");
    resData = mob.insert(mobToSave);
  }
  db.saveDatabase();
  sendSuccessResult(res, mapFromDb(resData));
});

app.get('/mob', function (req, res) {
  console.log("Retrieving all mobs.");
  let allMobs = mob.find();
  sendSuccessResult(res, _.map(allMobs, mapFromDb));
});

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  console.log('Server listening at http://%s:%s', host, app.get('port'));
});
