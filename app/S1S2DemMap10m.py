#Import Libraries
import ee
import geemap
import numpy as np
import rasterio
import matplotlib.pyplot as plt

# Authenticate and initialize the Earth Engine
ee.Authenticate()
ee.Initialize(project='agb-sarbanibhadra')

# Define the Amazon Basin region using coordinates (you can also use a shapefile)
amazon_basin = ee.Geometry.Polygon([
  [
    [-74.0, -12.0],
    [-74.0, 6.0],
    [-50.0, 6.0],
    [-50.0, -12.0],
    [-74.0, -12.0]
  ]
])

# Load Sentinel-1 SAR data (VV polarization)
sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD') \
    .filterBounds(amazon_basin) \
    .filterDate('2020-01-01', '2020-12-31') \
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')) \
    .select('VV')

# Compute median composite
sentinel1_median = sentinel1.median().clip(amazon_basin).resample('bilinear').reproject(crs='EPSG:4326', scale=10)

# Load Sentinel-2 optical data
sentinel2 = ee.ImageCollection('COPERNICUS/S2_HARMONIZED') \
    .filterBounds(amazon_basin) \
    .filterDate('2020-01-01', '2020-12-31') \
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)) \
    .select(['B4', 'B3', 'B2'])  # Red, Green, Blue bands

# Compute median composite
sentinel2_median = sentinel2.median().clip(amazon_basin).resample('bilinear').reproject(crs='EPSG:4326', scale=10)

# Load DEM data
dem = ee.Image('USGS/SRTMGL1_003').clip(amazon_basin).resample('bilinear').reproject(crs='EPSG:4326', scale=10)

# Compute slope and aspect from DEM
slope = ee.Terrain.slope(dem)
aspect = ee.Terrain.aspect(dem)

# Combine Sentinel-1, Sentinel-2, and DEM data
combined_image = sentinel1_median.addBands(sentinel2_median).addBands(dem).addBands(slope).addBands(aspect)

# Define a placeholder linear model for AGB estimation
agb_coefficients = [0.1, 0.2, 0.3, 0.4, 0.05, 0.05]  # Example coefficients

agb = combined_image.expression(
    'b(0) * coef0 + b(1) * coef1 + b(2) * coef2 + b(3) * coef3 + b(4) * coef4 + b(5) * coef5',
    {
        'coef0': agb_coefficients[0],
        'coef1': agb_coefficients[1],
        'coef2': agb_coefficients[2],
        'coef3': agb_coefficients[3],
        'coef4': agb_coefficients[4],
        'coef5': agb_coefficients[5]
    }
)

# Load REDD+ projects data from Earth Engine assets
redd_projects = ee.FeatureCollection('users/yourusername/yourassetname')

# Use geemap to visualize the map
Map = geemap.Map(center=[-3.4653, -62.2159], zoom=5)

# Add layers to the map
Map.addLayer(amazon_basin, {}, 'Amazon Basin')
Map.addLayer(sentinel2_median, {'bands': ['B4', 'B3', 'B2'], 'min': 0, 'max': 3000}, 'Sentinel-2')
Map.addLayer(agb, {'min': 0, 'max': 500, 'palette': ['blue', 'green', 'yellow', 'red']}, 'AGB')

# Add REDD+ projects layer to the map
map.addLayer(redd_projects, {
    'color': 'red',
    'opacity': 0.5
}, 'REDD+ Projects')

# Add layer controls
map.addLayerControl()

# Display the map
Map

# Save the map as an png image file
map.save('agb_map_with_redd_projects.png')

print("done")

