
var http = require('http');


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8080);




var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
// var url = 'mongodb://thonyprice:123@35.198.97.17:27017/local';
var url = 'mongodb://thonyprice:123@35.198.119.170:27017/local';
// var url = 'mongodb://accountUser:password@35.198.97.17:27017/local';
// mydb = client['rs0']

MongoClient.connect(url, function(err, db) {
  console.log(err);
  if (err) throw err;
  console.log("Database created!");
  // db.db("rs0");
  db.close();
});