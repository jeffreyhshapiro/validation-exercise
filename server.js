var express = require('express');
var expressHandelbars = require('express-handlebars');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var bcrypt = require('bcryptjs');

var sequelize = new Sequelize('user_login_db', 'root');

var PORT = process.env.NODE_ENV || 3000;

var app = express();

var User_information = sequelize.define('user_information', {
	user_name: {
		type: Sequelize.STRING,
		unique: true,
		validate: {
			notNull: true,
		}
	},
	password: {
		type: Sequelize.STRING,
		validate: {
			notNull: true,
			// len: {
			// 	args: [4, 24],
			// 	msg: "Choose a different password"
			// }
		}
	}
});

app.engine('handlebars', expressHandelbars({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
	extended: false
}));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/fail', function(req, res) {
	res.send("failed!");
});

app.post('/login', function(req, res) {
	user_information.findOne({
		where: {
			user_name: req.body.user_name
		}
	})
});

app.post('/registration', function(req, res) {
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		if(err) {throw err};

		var name = req.body.user_name;
		var password = hash;
		console.log(name, hash);
		User_information.create({
			user_name: name,
			password: hash
		}).then(function(result) {
			res.redirect('/')
		}).catch(function(err) {
			res.redirect('/fail')
		})
	})
});

sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log("Listening on PORT %s", PORT);
	});
});