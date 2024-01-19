// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3150;

app.use(bodyParser.json());
app.use(cors());

let loggedData = [];

app.post("/api/log", (req, res) => {
  const dataFromBody = req.body.data;
  const dataFromQuery = req.query.log;

  const data = dataFromBody || dataFromQuery;

  if (data) {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] log: ${data}`);
    loggedData.unshift({ data, timestamp });
    res.status(200).send("Data received successfully");
  } else {
    res.status(400).send("No data provided");
  }
});

app.get("/api/log", (req, res) => {
  res.json(loggedData);
});

app.post("/api/clear", (req, res) => {
  loggedData = [];
  res.status(200).send("Output cleared successfully");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
