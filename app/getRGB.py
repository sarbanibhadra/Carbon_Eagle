import matplotlib.pyplot as plt
import numpy as np
import matplotlib.colors as mcolors

# Define the color map (similar to the one in the provided image)
cmap = plt.get_cmap('viridis')

# Generate a range of values to map to the color bar
norm = mcolors.Normalize(vmin=0, vmax=200)
sm = plt.cm.ScalarMappable(cmap=cmap, norm=norm)

# Extract RGB values
def get_rgb_values(cmap, n=256):
    """
    Extract n RGB values from the given color map.
    """
    return cmap(np.linspace(0, 1, n))

# Extract RGB values from the color map
rgb_values = get_rgb_values(cmap)

# Print the RGB values
for i, rgb in enumerate(rgb_values):
    print(f"Value {i}: {rgb}")
