rom flask import Flask, jsonify, request
from script_db import DBmongo
from OpenSSL import SSL
#context = ('/etc/ssl/certs/ca-certificates.crt', '/etc/ssl/certs/CA_Disig_Root_R1.pem')
#context = SSL.Context(SSL.SSLv23_METHOD)
#context.use_privatekey_file('/home/thonyprice/ssl_cert/server.key')
#context.use_certificate_file('/etc/ssl/certs/ca-certificates.crt')
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
	return "use /sweden, /mongolia, to get data or /goal?country=[Sweden, Mongolia]&goal=[number]"

@app.route('/sweden', methods=['GET'])
def sweden():
        return jsonify(mongo.queryAll())

@app.route('/mongolia', methods=['GET'])
def mongolia():
        return jsonify(mongo.queryAll("Mongolia"))

@app.route('/goal', methods=['GET'])
def query_data():
		goal = request.args.get("goal")
		country = request.args.get("country")
        result = mongo.query({"Goal": goal}, collection=country)
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
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response


if __name__ == '__main__':
        #app.run(host='0.0.0.0', port=5000, debug = False, ssl_context=context)
        app.run(host='0.0.0.0', port=5000)
