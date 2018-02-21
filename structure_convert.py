import json

# {
#     "name": "AgglomerativeCluster",0,
#     "imports": [
#       "Transitioner",
#       "DataList",
#       "math.IMatrix",
#       "MergeEdge",
#       "HierarchicalCluster",
#       "Data"
#     ]
#   },

result = []
with open("db_data.json", "r") as rFile:
	data = json.load(rFile)
	for key in dict.keys(data):
		temp = {"name": data[key]["Name"], "size": 0, "imports": []}
		for target in dict.keys(data[key]["affect"]):
			if data[key]["affect"][target] > 0:
				temp["imports"].append(data[target]["Name"])
		result.append(temp)

with open("structure_data.json", "w") as wFile:
	json.dump(result, wFile)