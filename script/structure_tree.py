import json

def numeric_compare(x, y):
	return int(float(x)-float(y))

result = []
country = "mongolia"
# mongolia data
with open("../data/data_"+country+".json", "r") as rFile:
	data = json.load(rFile)
	for key in sorted(dict.keys(data), cmp=numeric_compare):
		final = {"name": key, "name-long": data[key]["Name"],"children": [], "total": 0}
		for first in sorted(dict.keys(data[key]["affect"]), cmp=numeric_compare):
			if first == key or data[key]["affect"][first] == 0:
				continue
			# target number with target name
			first_name = first
			# value
			first_size = data[key]["affect"][first]
			final["total"] += first_size
			d = {"name": first_name, "name-long": data[first]["Name"], "size": first_size, "children": [], "total": 0}
			# childrend: second order
			for second in sorted(dict.keys(data[first]["affect"]), cmp=numeric_compare):
				if second == first or data[key]["affect"][second] == 0:
					continue
				second_name = second
				second_size = first_size+data[first]["affect"][second]*0.5
				final["total"] += data[first]["affect"][second]*0.5
				d["children"].append({"name": second_name, "name-long": data[second]["Name"],"size": second_size})
				d["total"] += second_size
			final["children"].append(d)
		with open("../data/"+country+key+".json", "w") as wFile:
			json.dump(final, wFile)

