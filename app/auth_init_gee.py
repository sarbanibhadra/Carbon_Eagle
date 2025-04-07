import ee
from google.cloud import storage
from google.auth import default

credentials, project_id = default()
print(credentials)

ee.Initialize(project='animated-graph-425421-h2')

credentials, project_id = default()

print("Running Earth Engine on Google Cloud Project:")
print(credentials)