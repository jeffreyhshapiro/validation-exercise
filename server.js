var express = require('express');
var expressHandelbars = require('express-handlebars');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');

var sequelize = new Sequelize('user_login_db', 'root');

var PORT = process.env.NODE_ENV || 3000;

var app = express();

var User_information = sequelize.define

app.engine('handlebars', expressHandelbars({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
	extended: false
}));

sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("Listening on PORT %s", PORT);
	});
});