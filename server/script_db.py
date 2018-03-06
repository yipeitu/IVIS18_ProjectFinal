from pymongo import MongoClient, ASCENDING
import json

dbName = "SEI";
client = MongoClient('mongodb://35.198.97.17', 27017)

colSweden = client[dbName]["Sweden"]
colSweden.ensure_index([("Goal", ASCENDING)], unique=True)
colMongolia = client[dbName]["Mongolia"]
colMongolia.ensure_index([("Goal", ASCENDING)], unique=True)

with open('../data/data_sweden.json') as data_file:    
    data = json.load(data_file)
    for goal in data:
        data[goal]["Goal"] = goal
        colSweden.insert(data[goal], check_keys=False)

with open('../data/data_mongolia.json') as data_file:    
    data = json.load(data_file)
    for goal in data:
        data[goal]["Goal"] = goal
        colMongolia.insert(data[goal], check_keys=False)

print("done!")

class DBmongo:
	
	
	def __init__(self):
		client = MongoClient('mongodb://35.198.97.17', 27017)
		
		self.db = client[dbName]
		self.col = self.db["Sweden"]
		self.col.ensure_index([("Goal", ASCENDING)], unique=True)
		self.noNeedFields = {"_id": False}
		# print(col.find_one())

	def query(self, condition={}, collection=colName):
		document = None
		if collection != colName:
			document = self.db[collection].find_one(condition, self.noNeedFields)
		else:
			document = self.col.find_one(condition, self.noNeedFields)
		return document

	def queryAll(self, collection=colName):
		cursor = None
		documents = {}

		if collection != colName:
			cursor = self.db[collection].find({}, self.noNeedFields)
		else:
			cursor = self.col.find({}, self.noNeedFields)
		# TODO: not all collections have "Goal" field
		for document in cursor:
			documents[document["Goal"]] = document
		return documents

	def insert(self, data, collection=colName, unique_index="id"):
		# update or insert
		if collection != colName:
			if self.db[collection].find_one() is None:
				# create new collection
				self.db[collection].ensure_index([unique_index, ASCENDING], unique=True)
			self.db[collection].insert(data, upsert=True)
		else:
			self.col.insert(data, upsert=True)
