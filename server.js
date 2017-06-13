var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

var entertainmentData = require('./entertainment');
var sightseeingData = require('./sightseeing');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

// serve dynamic content (based on .json)
app.get('/entertainment', function(req, res, next) {
	var templateArgs = {
		items: entertainmentData,
		title: "Entertainment"
	};
	res.render('categoryPage', templateArgs);
});


app.get('/sightseeing', function(req, res, next) {
	var templateArgs = {
		items: sightseeingData,
		title: "sightseeing"
	};
	res.render('categoryPage', templateArgs);
});


// app.get('/pic', function(req, res, next) {
// 	res.send(pic);
// });


// app.get('/people/:person', function(req, res, next) {
// 	console.log("== url params for request", req.params);
// 	var person = req.params.person;
// 	var personData = peopleData[person];
// 	console.log("personData", personData);

// 	if (personData) {
// 		templateArgs = {
// 			name: personData.name,
// 			photos: personData.photos,
// 			title: personData.name
// 		};
// 		res.render('photosPage', templateArgs);
// 	}
// 	else {
// 		next();
// 	}
// });


// app.post('/people/:person/addPhoto', function(req, res, next) {
// 	var person = peopleData[req.params.person];

// 	if (person) {
// 		console.log(person)
// 		if(req.body &&  req.body.url) {
// 			var photo = {
// 				url: req.body.url,
// 				caption: req.body.caption
// 			};
// 			person.photos = person.photos || [];
// 			person.photos.push(photo);
// 			fs.writeFile('peopleData.json', JSON.stringify(peopleData, null, 2), function(err) {
// 				if (err) {
// 					res.status(500).send("Unable to save photo to \"database\"");
// 				} else {
// 					res.status(200).send();
// 				}
// 			});
// 		} else {
// 			res.status(400).send("Person must have a URL");
// 		}
// 	} else {
// 		next();
// 	} 
// });


// serve static content (off /public)
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


// safety net for all other url requests
app.get('*', function(req, res) {
	res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


// listen on the intended port
app.listen(port, function() {
	console.log("==Server listening  on port", port);
});

