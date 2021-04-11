var express = require("express");
var app = express();

app.use("/public", express.static(__dirname + "/public"));

app.use("/", require("./routes/index.js"));

app.listen(3000);
