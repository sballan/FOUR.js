var express = require('express');
var app = express();
var router = express.Router();

app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(express.static(__dirname + '/dependencies'));

app.use(express.static(__dirname + '/src'));

app.use(express.static(__dirname + '/dist'));

app.use(express.static(__dirname + '/viewer'));

router.get('/', function(req, res, next) {
	send.send('/index.html')
})


module.exports = router;

app.listen(3000);