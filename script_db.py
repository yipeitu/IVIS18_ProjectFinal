from pymongo import MongoClient, ASCENDING
import json


# client = MongoClient('mongodb://thonyprice:123@35.198.119.170:27017')
# client = MongoClient('mongodb://userAccount:password3@35.198.119.170:27017')
# client = MongoClient('mongodb://appAdmin:password@35.198.119.170', 27017)
client = MongoClient('mongodb://35.198.97.17', 27017)

dbName = "SEI";
colName = "Sweden";
db = client[dbName]
# print(db.authenticate('appAdmin', 'password'))
col = db[colName]
col.ensure_index([("Goal", ASCENDING)], unique=True)
print(col.find_one())


with open('db_data.json') as data_file:    
    data = json.load(data_file)
    for goal in data:
        data[goal]["Goal"] = goal
        col.insert(data[goal], check_keys=False)

print("done!")
