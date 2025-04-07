from PIL import Image
import matplotlib.pyplot as plt

# Function to display a TIFF image
def view_tiff_image(tiff_file):
    # Open the TIFF file
    with Image.open(tiff_file) as img:
        # Display the image using matplotlib
        plt.imshow(img, cmap='viridis')  # You can change 'gray' if the image has color
        plt.axis('off')  # Hide the axes
        plt.show()

# Example usage

tiff_file = '/Users/sarbanidas/workspace/GlobeEye/Code/Carbon_prospecting_v1.0/Fig1_InvestibleCarbon.tif'  # Replace with your TIF file path

view_tiff_image(tiff_file)