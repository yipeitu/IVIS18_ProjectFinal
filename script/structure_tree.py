import json

result = []
# mongolia data
with open("../data/data_mongolia.json", "r") as rFile:
	data = json.load(rFile)
	for key in sorted(dict.keys(data)):
		final = {"name": key, "name-long": data[key]["Name"],"children": [], "total": 0}
		for first in dict.keys(data[key]["affect"]):
			if first == key or data[key]["affect"][first] == 0:
				continue
			# target number with target name
			first_name = first
			# value
			first_size = data[key]["affect"][first]
			final["total"] += first_size
			d = {"name": first_name, "name-long": data[first]["Name"], "size": first_size, "children": [], "total": 0}
			# childrend: second order
			for second in dict.keys(data[first]["affect"]):
				if second == first or data[key]["affect"][second] == 0:
					continue
				second_name = second
				second_size = first_size+data[first]["affect"][second]*0.5
				final["total"] += data[first]["affect"][second]*0.5
				d["children"].append({"name": second_name, "name-long": data[second]["Name"],"size": second_size})
				d["total"] += second_size
			final["children"].append(d)
		with open("../data/mongolia"+key+".json", "w") as wFile:
			json.dump(final, wFile)

