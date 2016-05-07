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
    teams;

    function loadHandler() {
      // if database did not exist it will be empty so I will intitialize here
      teams = db.getCollection('teams');
      if (teams === null) {
        teams = db.addCollection('teams')
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

app.get('/team/:id', function (req, res) {
  var teamId = req.params.id;

  if (typeof teamId === "string") {
    var teamId = parseInt(teamId);

    if (_.isNaN(teamId)) {
      sendErrorResult(res, "Id must be a number");
      return;
    }
  }

  var data = teams.get(teamId);
  sendSuccessResult(res, data);
});

app.get('/mob', function (req, res) {
  let resData = [
    { "id": 11, "name": "Mr. Nice" },
    { "id": 12, "name": "Narco" },
    { "id": 13, "name": "Bombasto" },
    { "id": 14, "name": "Celeritas" },
    { "id": 15, "name": "Magneta" },
    { "id": 16, "name": "RubberMan" },
    { "id": 17, "name": "Dynama" },
    { "id": 18, "name": "Dr IQ" },
    { "id": 19, "name": "Magma" },
    { "id": 20, "name": "Tornado" }
  ];
  sendSuccessResult(res, resData);
});

app.post('/mob', function (req, res) {
  let resData = req.body;
  console.log(resData);
  sendSuccessResult(res, resData);
});

app.put('/team', function(req, res) {
  teams.insert({
     members: [
       {
         name: 'Albin'
       },
       {
         name: 'Beata'
       },
       {
         name: 'Carl'
       }
     ],
     interval: 15 * 60 * 1000
   });
  db.saveDatabase();
  sendSuccessResult(res);
});

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  console.log('Server listening at http://%s:%s', host, app.get('port'));
});
