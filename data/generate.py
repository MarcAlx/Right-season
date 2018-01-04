import json
import csv

input = "dataset.csv"
output = "data.json"

from enum import Enum

class FIELD_IDX(Enum):
    NAME=0
    TYPE=1
    MONTH=2
    URL=3
    IMAGE=4

res = {}
res["fruits"]=[]
res["vegetables"]=[]

#create indic -> indicators and chapter
with open(input, newline='', encoding='utf-8') as f:
    reader = csv.reader(f,delimiter=';')
    nb = 0
    for row in reader:
        if(nb!=0):
            item = {}
            item["name"]=row[FIELD_IDX.NAME.value]
            item["type"]=row[FIELD_IDX.TYPE.value]
            item["url"]=row[FIELD_IDX.URL.value]
            item["image"]=row[FIELD_IDX.IMAGE.value]
            item["month"]=[]
            months = str(row[FIELD_IDX.MONTH.value]).split(",")
            for month in months :
                item["month"].append(int(month))

            if(item["type"]=="fruit"):
                res["fruits"].append(item)
            else:
                res["vegetables"].append(item)

        nb=nb+1

with open(output, 'w') as f:
    f.write(json.dumps(res, indent=4, ensure_ascii=False))

print("\n\n")
print(json.dumps(res, indent=4,ensure_ascii=False))