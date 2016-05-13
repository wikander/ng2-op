'use strict'

let express = require('express'),
    app = express(),
    expressWs = require('express-ws')(app),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    loki = require('lokijs'),
    db = new loki('loki.json', {
      autoload: true,
      autoloadCallback : loadHandler,
      autosave: true,
      autosaveInterval: 1000
    }),
    mob;

const start = "start", stop = "stop",
      started = "started", stopped = "stopped",
      pause = "pause", paused = "paused";

    function loadHandler() {
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
  if (lokiObj) {
    lokiObj.id = lokiObj.$loki;
    return _.omit(lokiObj, ['$loki', 'meta']);
  } else {
    return null;
  }
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

app.delete('/mob/:id', function (req, res) {
  let mobId = req.params.id;

  if (typeof mobId === "string") {
    mobId = parseInt(mobId);

    if (_.isNaN(mobId)) {
      sendErrorResult(res, "Id must be a number");
      return;
    }
  } else {
    sendErrorResult(res, "Id must exist as path-param.");
    return;
  }
  console.log("Deleting mob with id:", mobId);

  let data = null;
  if (mob.get(mobId)) {
    data = mob.remove(mobId);
    db.saveDatabase();
  }
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

function startMob(mobId) {
  let mobObj = mob.get(mobId);
  if (mobObj && mobObj.startTime === null) {
    mobObj.startTime = (new Date()).getTime();
    mobObj.remainingTime = mobObj.remainingTime || minutesInMillis(mobObj.minutes);
    mob.update(mobObj);
    db.saveDatabase();

    let ret = {};
    ret.action = started;
    ret.remainingTime = mobObj.remainingTime;
    ret.startTime = mobObj.startTime;
    return ret;
  } else {
    return null;
  }
}

function pauseMob(mobId) {
  let mobObj = mob.get(mobId);
  if (mobObj && mobObj.startTime !== null) {
    mobObj.remainingTime = Math.min(minutesInMillis(mobObj.minutes), mobObj.remainingTime);
    mobObj.remainingTime = mobObj.remainingTime - ((new Date()).getTime() - mobObj.startTime);
    mobObj.startTime = null;
    mob.update(mobObj);
    db.saveDatabase();

    let ret = {};
    ret.action = paused;
    ret.remainingTime = mobObj.remainingTime;
    ret.startTime = mobObj.startTime;
    return ret;
  } else {
    return null;
  }
}

function stopMob(mobId) {
  let mobObj = mob.get(mobId);
  if (mobObj) {
    mobObj.remainingTime = null;
    mobObj.startTime = null;
    mob.update(mobObj);
    db.saveDatabase();
  }

  return true;
}




app.ws('/mob/:id', function(ws, req) {
  let mobId = req.params.id, data = null;
  ws.on('message', function(msg) {
    console.log("Got message: ", msg);
    console.log("Message from id", mobId);
    switch (msg) {
      case start:
        data = startMob(mobId);
        sendToMobClient(mobId, data);
        break;
      case pause:
        data = pauseMob(mobId);
        sendToMobClient(mobId, data);
        break;
      default:
        throw new Error("Undefined action");
      }
  });

  console.log("Client connected.");
});


function sendToMobClient(mobId, data) {
  if (data) {
    data = JSON.stringify(data);
    let mobIdWss = expressWs.getWss('/mob/:id');

    mobIdWss.clients.forEach(function (client) {
      let id = client.upgradeReq.params.id;
      if (mobId == id && data) {
        console.log("sending to", id);
        client.send(data);
      }
    });
  }
}

let mobIdWss = expressWs.getWss('/mob/:id');

function checkIfMobEnded(mobId) {
  let mobObj = mob.get(mobId);
  if (mobObj) {
    if (mobObj.startTime &&
      ((new Date()).getTime() - mobObj.startTime) > mobObj.remainingTime) {
        stopMob(mobId);
        return mobObj;
      } else {
        return false;
      }
  } else {
    return false;
  }
}

function minutesInMillis(minutes) {
  return minutes*60000;
}
setInterval(function () {
  mobIdWss.clients.forEach(function (client) {
    let mobId = client.upgradeReq.params.id;
    let mobEnded = checkIfMobEnded(mobId);
    if (mobEnded) {
      let res = {};
      res.action = stopped;
      client.send(JSON.stringify(res));
    }
  });
}, 5000);

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  console.log('Server listening at http://%s:%s', host, app.get('port'));
});
