
var http = require('http');

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('../config/config.json', 'utf8'));


http.createServer(function (req, res) {
	obj.html.forEach(function(fileName){
		fs.readFile("../"+fileName+'.html', function(err, data) {
		    res.writeHead(200, {'Content-Type': 'text/html'});
		    res.write(data);
		    res.end();
		})
	})
}).listen(8080);

var DB = function(){
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/SDG";
	var collection = "SEI";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  console.log("Database connect success!");
	  db.close();
	});

	this.createCollection = function(collectionName){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  db.createCollection(collectionName, function(err, res) {
		    if (err) throw err;
		    console.log("Collection created: "+collectionName);
		    db.close();
		  });
		});
	}

	this.query = function(queryCondition, collectionName=collection){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  // var myobj = { name: "Company Inc", address: "Highway 37" };
		  db.collection("customers").find(query).toArray(function(err, result) {
		    if (err) throw err;
		    console.log("query success");
		    db.close();
		  });
		});
	}

	this.insert = function(data, collectionName=collection){
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  db.collection(collection).insertOne(data, function(err, res) {
		    if (err){
				throw err;
				return false;
			 }
		    console.log("1 document inserted");
		    db.close();
		    return true;
		  });
		});
		return false;
	}
}