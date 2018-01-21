import json
import csv
import io
import sys
import os
from pathlib import Path

input = ""
output = ""
source = ""
if(len(sys.argv)>1):
    if(os.path.isfile(sys.argv[1])):
        input = sys.argv[1]
        output = sys.argv[1].replace(".csv",".json")
        source = Path(sys.argv[1]).stem
    else:
        print(sys.argv[1]+" not found")
        sys.exit()
else:
    print("You must provide a file as argument : 'python generate.py file.csv'")
    sys.exit()

from enum import Enum

class FIELD_IDX(Enum):
    NAME=0
    TYPE=1
    ORIGIN=2
    MONTH=3
    URL=4
    IMAGE=5

res = {}
res["fruits"]=[]
res["vegetables"]=[]
res["mushrooms"]=[]
res["cereals"]=[]

with open(input, newline='', encoding='utf-8') as f:
    reader = csv.reader(f,delimiter=',')
    nb = 0
    for row in reader:
        if(nb!=0):
            item = {}
            item["name"]=row[FIELD_IDX.NAME.value]
            item["type"]=row[FIELD_IDX.TYPE.value]
            item["origin"]=row[FIELD_IDX.ORIGIN.value]
            item["url"]=row[FIELD_IDX.URL.value]
            item["image_url"]=row[FIELD_IDX.IMAGE.value]
            item["availability"]=[]
            months = str(row[FIELD_IDX.MONTH.value]).split(",")
            for month in months :
                item["availability"].append(int(month))

            if(item["type"]=="fruit"):
                res["fruits"].append(item)
            elif(item["type"]=="vegetable"):
                res["vegetables"].append(item)
            elif(item["type"]=="mushroom"):
                res["mushrooms"].append(item)
            elif(item["type"]=="cereal"):
                res["cereals"].append(item)
        nb=nb+1

res["source"]=source
with io.open(output, 'w', encoding='utf8') as f:
    f.write(json.dumps(res, indent=4, ensure_ascii=False))

print("\n\n")
print(json.dumps(res, indent=4,ensure_ascii=False))