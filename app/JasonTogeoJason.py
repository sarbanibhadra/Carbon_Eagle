import json

# Step 1: Load the JSON file
with open('/Users/sarbanidas/workspace/GlobeEye/Code/Platform_IDF_DEPLOYED/app/static/data/Geojson/inputREDDColumbia.json', 'r') as file:
    data = json.load(file)


# Step 2: Transform the JSON data into GeoJSON format
geojson = {
    "type": "FeatureCollection",
    "features": []
}

for item in data:
    print(item["location"]['geometry']['coordinates'][0])
    feature = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [item["location"]['geometry']['coordinates'][0], item["location"]['geometry']['coordinates'][1]]
        },
        "properties": {
            "key": item["key"],
            "name": item["name"],
            "price": item["price"],
            "short_description": item["short_description"]
        }
    }
    geojson["features"].append(feature)

# Step 3: Write the GeoJSON data to a file
with open('/Users/sarbanidas/workspace/GlobeEye/Code/Platform_IDF_DEPLOYED/app/static/data/Geojson/outputColombia.geojson', 'w') as geojson_file:
    json.dump(geojson, geojson_file, indent=4)