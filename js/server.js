
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

var DBmongo = function(){
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://thonyprice:123@35.198.119.170:27017';
	var dbName = "SDG"; 
	var colName = "SEI";
	var dbConnection = null;
	var colConnect = null;

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  console.log("Database connect success!");
	  dbConnect = db.db(dbName);
	  colConnect = dbConnect.collection(colName);
	  console.log(this.query(Object()));
	});

	this.createCollection = function(collectionName){
	  dbConnect.createCollection(collectionName, function(err, res) {
	    if (err) throw err;
	    console.log("Collection created: "+collectionName);
	    collection = collectionName;
	    colConnect = dbConnect.collectionName(collection);

	  });
	}

	this.query = function(queryCondition){	
	  colConnect.find(query, { "_id": 0}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log("query success");
	    db.close();
	    return result;
	  });
	}

	this.queryAll = function(){
	  return this.query({});
	}

	this.insert = function(data){
	  colConnect.insertOne(data, function(err, res) {
	    if (err){
			throw err;
			return false;
		 }
	    console.log("1 document inserted");
	    db.close();
	    return true;
	  });
	}

	this.ensureIndex = function(collectionName, indexName){
	  db.ensureIndex(collectionName, indexName, {unique: true}, function(err, result) {
	    if (err) throw err;
	    console.log(collection, " index ", " create ", indexName);
	    db.close();
	  });
	}
}

var dataJson = JSON.parse(fs.readFileSync('../db_data.json', 'utf8'));

var dbObj = DBmongo();
// var init = function(){
// 	var dataJson = JSON.parse(fs.readFileSync('../db_data.json', 'utf8'));

// 	var dbObj = DBmongo();
// 	while(typeof dbObj == "undefined"){
// 		console.log(dbObj);
// 		for ([goal, obj] of Object.entries(dataJson)){
// 			obj.Goal = goal;
// 			console.log(dbObj.query({"Goal": goal}));
// 			// dbObj.insert(goal);
// 		}
// 	}
// 	// dbObj.createCollection("SEI");
// 	// dbObj.ensureIndex("SEI", "Goal");
// }

// init();
