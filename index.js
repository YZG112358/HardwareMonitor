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
    var data = JSON.parse(afterLoad('http://localhost:42000/getstat') || '{}');
    res.write(data.result[0].temperature);
    return res.end();
})
 
var server = http.createServer(app)
 
// Reload code here 
reload(server, app)
 
server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});

/*
var express = require('express');
var http = require('http');
var fs = require('fs');
var url = require('url');
var reload = require('reload')
var afterLoad = require('after-load');

var app = express();
app.get('/', function (req, res) {
   afterLoad('mangofrenzylab.com', function(html){
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
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
   reload(server, app)

})
*/
/*
var options = {
  host: 'www.google.com',
  port: 80,
  path: '/index.html'
};

http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);
  console.log()
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});




var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

http.createServer(function (req, res) {
  
  afterLoad('mangofrenzylab.com', function(html){
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
}).listen(8080);
*/














