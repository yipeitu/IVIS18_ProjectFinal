import json

with open("../data/db_data.json") as f:
	data = json.load(f)
	for key in data:
		targetDic = data[key]
		targetDic["Icon"] = "images/UNpics_targets_png/GOAL_"+key.split(".")[0]+"_TARGET_"+key+".png"
		targetId = int(key.split(".")[0])
		if targetId > 9:
			targetDic["IconHover"] = "images/UNpics_goals/transparent" + str(targetId) + ".png"
		else:
			targetDic["IconHover"] = "images/UNpics_goals/transparent0" + str(targetId) + ".png"
		# print(key, targetDic["Icon"], targetDic["IconHover"])

	with open("../data/data_sweden.json", "w") as w:
		json.dump(data, w)

with open("../data/data_mongolia.json") as f:
	data = json.load(f)
	for key in data:
		targetDic = data[key]
		targetDic["Icon"] = "images/UNpics_goals/transparent00.png"
		targetDic["IconHover"] = "images/UNpics_goals/transparent00.png"
	with open("../data/data_mongolia.json", "w") as w:
		json.dump(data, w)