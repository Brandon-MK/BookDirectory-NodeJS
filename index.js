const express = require("express");
const bodyparser = require("body-parser");
const api = require("./src/api");

const app = express();
const PORT = 5000;

app.use(bodyparser.json());
app.use("/api/v1", api);

app.listen(PORT, () => {
  console.log("Running on port:5000");
});
