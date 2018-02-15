from flask import Flask, jsonify
app = Flask(__name__)

from pymongo import MongoClient, ASCENDING
import json


@app.route('/')
def index():
	return 'Index Page'

@app.route('/hello')
def hello():
	client = MongoClient('mongodb://35.198.97.17', 27017)
	dbName = "SEI";
	colName = "Sweden";
	db = client[dbName]
	col = db[colName]
	# print()
	return jsonify(col.find_one({}, {"_id": False}))
