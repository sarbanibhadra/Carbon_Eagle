import ee
import geemap

ee.Initialize(project='project-40220')
Map = geemap.Map()

# Define the region of interest of Amazon basin
amazon_region = ee.Geometry.Polygon([[-80.0, 10.0],
            [-44.0, 10.0],
            [-44.0, -18.0],                           
            [-80.0, -18.0]])

# # Add your region to the map
# Map.addLayer(amazon_region, {}, 'Amazon Region')
# Map.centerObject(amazon_region, 6)
# Map

# Load GEDI level 2B data
gedi_l2b = ee.FeatureCollection('LARSE/GEDI/GEDI02_B_002_INDEX') \
                .filterBounds(amazon_region) \
                .filterDate('2016-01-01', '2023-01-01')

print('Number of GEDI points:', gedi_l2b.size().getInfo())

# load sentinel-1 data 
sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD') \
                .filterBounds(amazon_region) \
                .filterDate('2020-01-01', '2023-01-01') \
                .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')) \
                .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH')) \
                .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
            
# Select the VV and VH bands
sentinel1_vv = sentinel1.select('VV').median()
sentinel1_vh = sentinel1.select('VH').median()

# Load Sentinel-2 surface reflectance data
sentinel2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') \
                .filterBounds(amazon_region) \
                .filterDate('2020-01-01', '2023-01-01') \
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))

# Calculate NDVI
ndvi = sentinel2.map(lambda image: image.normalizedDifference(['B8', 'B4']).rename('NDVI')).median()

# Calculate EVI
def calculate_evi(image):
    return image.expression(
        '2.5 * ((B8 - B4) / (B8 + 6 * B4 - 7.5 * B2 + 1))',
        {
            'B8': image.select('B8'),
            'B4': image.select('B4'),
            'B2': image.select('B2')
        }).rename('EVI')

evi = sentinel2.map(calculate_evi).median()

# Load Landsat 8 Surface Reflectance data
landsat8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2') \
              .filterBounds(amazon_region) \
              .filterDate('2020-01-01', '2023-01-01') \
              .filter(ee.Filter.lt('CLOUD_COVER', 10))

# Calculate NDVI for Landsat 8
landsat_ndvi = landsat8.map(lambda image: image.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI')).median()

# Load DEM data
dem = ee.Image('USGS/SRTMGL1_003')

# Calculate slope and aspect
slope = ee.Terrain.slope(dem)
aspect = ee.Terrain.aspect(dem)

# Stack all the features (Sentinel-1, Sentinel-2, Landsat, DEM)
feature_stack = sentinel1_vv.addBands(sentinel1_vh) \
                            .addBands(ndvi) \
                            .addBands(evi) \
                            .addBands(landsat_ndvi) \
                            .addBands(dem) \
                            .addBands(slope) \
                            .addBands(aspect)

# Sample the remote sensing data at GEDI footprint locations
training_data = feature_stack.sampleRegions(
    collection=gedi_l2b,
    properties=['agbd'],  # AGB values from GEDI
    scale=100,
    tileScale=8
)

# Train a Random Forest model
classifier = ee.Classifier.smileRandomForest(50).setOutputMode('REGRESSION')

# Train the model
trained_model = classifier.train(
    features=training_data,
    classProperty='agbd',
    inputProperties=feature_stack.bandNames()
)

# Apply the trained model to predict AGB
agb_prediction = feature_stack.classify(trained_model)


Map = geemap.Map()

# Add the predicted AGB layer to the map
Map.addLayer(agb_prediction, {'min': 0, 'max': 300, 'palette': ['green', 'yellow', 'red']}, 'Predicted AGB')
Map.centerObject(amazon_region, 6)
Map
