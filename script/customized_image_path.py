import json

with open("../data/data_sweden.json") as f:
	data = json.load(f)
	for key in data:
		targetDic = data[key]
		targetDic["Icon"] = "images/UNpics_targets_png/GOAL_"+key.split(".")[0]+"_TARGET_"+key+".png"
		targetId = int(key.split(".")[0])
		if targetId > 9:
			targetDic["IconHover"] = "images/UNpics_goals/transparent" + str(targetId) + ".png"
		else:
			targetDic["IconHover"] = "images/UNpics_goals/transparent0" + str(targetId) + ".png"
		targetDic["reasons"] = {"1.5": "",
		"1.3": "",
		"7.2": "",
		"7.3": "",
		"6.5": "",
		"12.5": "",
		"2.2": "",
		"13.2": "",
		"3.8": "",
		"2.4": "",
		"10.1": "",
		"4.4": "",
		"4.1": "",
		"5.5": "",
		"10.7": "",
		"8.5": "",
		"11.1": "",
		"11.2": "",
		"16.6": "",
		"12.1": "",
		"16.4": "",
		"9.4": "",
		"9.5": "",
		"13.1": "",
		"17.11": "",
		"17.13": "",
		"5.4": "",
		"8.4": "",
		"14.4": "",
		"15.2": "",
		"14.1": "",
		"15.5": "",
		"6.6": "",
		"3.4": "",}
		# print(key, targetDic["Icon"], targetDic["IconHover"])

	with open("../data/data_sweden.json", "w") as w:
		json.dump(data, w)

# with open("../data/data_mongolia.json") as f:
# 	data = json.load(f)
# 	for key in data:
# 		targetDic = data[key]
# 		targetDic["Icon"] = "images/UNpics_goals/transparent00.png"
# 		targetDic["IconHover"] = "images/UNpics_goals/transparent00.png"
# 	with open("../data/data_mongolia.json", "w") as w:
# 		json.dump(data, w)

		