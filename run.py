from flask import Flask, jsonify, request
from script_db import DBmongo

app = Flask(__name__)
mongo = DBmongo()
all_uri = ['/', '/goal?goal=the goal number', '/save', '/load']

# catch wrong uri
@app.route('/<path:path>')
def catch_all(path):
    return jsonify({"message": 
    	"this is the wrong uri, you should use " + ', '.join(all_uri)})

@app.route('/', methods=['GET'])
def index():
	return jsonify(mongo.queryAll())

@app.route('/goal', methods=['GET'])
def query_data():
	result = mongo.query({"Goal":request.args.get("goal")})
	if result is None:
		result = {}
	return jsonify(result)

@app.route('/save/form', methods=['POST'])
def save_data_form():
	print(request.form)
	return 'save'

@app.route('/save/json', methods=['POST'])
def save_data_json():
	print(request.is_json)
	content = request.get_json()
	print(content)
	return 'save'

@app.route('/load', methods=['GET'])
def load_data():
	return 'load'

