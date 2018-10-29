var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// Express
var app = express();

app.use(express.static(__dirname + "/public"));

// parse
app.use(bodyParser.urlencoded({ extended: false }));

// override 
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller");

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});