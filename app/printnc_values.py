import netCDF4 as nc

# Open the NetCDF file
file_path = '/Users/sarbanidas/workspace/GlobeEye/Code/Platform_IDF_DEPLOYED/app/static/data/AGB/yearly_netcdf/AGB_2011.nc'
ds = nc.Dataset(file_path)

# Explore the dataset
print(ds.variables.keys())  # List of variables
print(ds.dimensions.keys())  # List of dimensions

# Access specific variable data (e.g., AGB values)
agb_data = ds.variables['AGB'].size
print(agb_data)