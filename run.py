from flask import Flask, jsonify
from script_db import DBmongo

app = Flask(__name__)
mongo = DBmongo()

@app.route('/')
def index():
	return jsonify(mongo.query())

@app.route('/hello')
def hello():
	return 'hello world'
