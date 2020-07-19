const express = require("express");
const cors = require("cors");

class DataStorageManager {
  saveData(data) {
    console.log("data", data);
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  getData(params) {
    return new Promise((resolve, reject) => {
      console.log("get result", params);
      reject();
    });
  }
}

let http;
let app;
const PORT = 8090;
let dataStorageManager;

function main() {
  dataStorageManager = new DataStorageManager();
  configServer();
}

function configServer() {
  app = express();
  http = require("http").Server(app);
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  http.listen(PORT, function() {
    console.log("Server is listening on *:" + PORT);
  });
  registerEndpoints();
}

function registerEndpoints() {
  app.post("/saveResult", saveResult.bind(this));
  app.get("/getResult", getResult.bind(this));
}

function saveResult(req, res) {
  dataStorageManager
    .saveData(req)
    .then(() => {
      res.send({ state: true });
    })
    .catch(e => {
      res.send({ state: false, error: e });
    });
}
function getResult(req, res) {
  dataStorageManager
    .getData(req)
    .then(() => {
      res.send({ state: true });
    })
    .catch(e => {
      res.send({ state: false, error: e });
    });
}

main();
