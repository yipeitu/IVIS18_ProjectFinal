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

group = {
	"1": "NoProverty.",
	"2": "ZeroHunger.",
	"3": "GoodWealthAndWellBeing.",
	"4": "QualityEducation.",
	"5": "GenderEquality.",
	"6": "CleanWaterAndSanitation.",
	"7": "AffordableAndCleanEnergy.",
	"8": "DecentWorkAndEconomicGrowth",
	"9": "IndustryInnovationAndInfrastructure.",
	"10": "ReducedInequalities.",
	"11": "SustainableCitiesAndCommuities.",
	"12": "ResponsibleConsumptionAndProduction.",
	"13": "ClimateAction.",
	"14": "LifeBelowWater.",
	"15": "LifeOnLand.",
	"16": "PeaseJusticeAndStrongInstitutions.",
	"17": "PartnershipsForTheGoals."
}
result = []
with open("db_data.json", "r") as rFile:
	data = json.load(rFile)
	for key in dict.keys(data):
		goal = group[key.split(".")[0]]
		temp = {"name": goal+data[key]["Name"], "size": 0, "imports": [], "id": data[key]["AI"]}
		for target in dict.keys(data[key]["affect"]):
			if data[key]["affect"][target] > 0:
				# temp["imports"].append(data[target]["Name"])
				# --- This constructs the version with values for connections ---
				d = {}
				target_goal = group[target.split(".")[0]]
				d["target"] = target_goal+data[target]["Name"]
				d["value"] = data[key]["affect"][target]
				temp["imports"].append(d)
		result.append(temp)

# with open("structure_data2.json", "w") as wFile:
with open("structure_data4.json", "w") as wFile:
	json.dump(result, wFile)