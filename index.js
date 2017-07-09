var express = require('express')
var http = require('http')
var path = require('path')
var reload = require('reload')
var bodyParser = require('body-parser')
var logger = require('morgan')
var fs = require('fs');
var url = require('url');
var reload = require('reload')
var afterLoad = require('after-load');

var app = express()
 
var publicDir = path.join(__dirname, 'public')
 
app.set('port', process.env.PORT || 3000)
app.use(logger('dev'))
app.use(bodyParser.json()) //parses json, multi-part (file), url-encoded 
 
app.get('/', function(req, res) {
  afterLoad('localhost:42000, function(html){
		fs.writeFile('demofile1.html', html, function(err){
  			if (err) throw err;
  			console.log('Saved!');
  		});
	});

  	

  	fs.readFile('demofile1.html', function(err, data) {
    	res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write(data);
    	return res.end();
  	});
})
 
var server = http.createServer(app)
 
// Reload code here 
reload(server, app)
 
server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});