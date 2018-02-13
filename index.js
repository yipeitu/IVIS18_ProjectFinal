
var http = require('http');


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8080);




var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
// var url = 'mongodb://thonyprice:123@35.198.97.17:27017/local';
// var url = 'mongodb://thonyprice:123@35.198.119.170:27017/SDG';
var url = 'mongodb://35.198.97.17:27017/SEI';
// mydb = client['rs0']
var dbName = "SEI"
var colName = "Sweden"

MongoClient.connect(url, function(err, db) {
  console.log(err);
  if (err) throw err;
  console.log("Database created!");
  console.log("Database connect success!");
  dbConnect = db.db(dbName);
  colConnect = dbConnect.collection(colName);
  colConnect.find({}, { "_id": 0}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});