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
		temp = {"name": data[key]["Name"], "size": 0, "imports": [], "id": data[key]["AI"]}
		for target in dict.keys(data[key]["affect"]):
			if data[key]["affect"][target] > 0:
				# temp["imports"].append(data[target]["Name"])
				# --- This constructs the version with values for connections ---
				d = {}
				d["target"] = data[target]["Name"]
				d["value"] = data[key]["affect"][target]
				temp["imports"].append(d)
		result.append(temp)

# with open("structure_data2.json", "w") as wFile:
with open("structure_data3.json", "w") as wFile:
	json.dump(result, wFile)