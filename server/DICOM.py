from flask import Flask, redirect, url_for,jsonify, request
import numpy as np
import pydicom
from PIL import Image
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route('/api')
def JPG():
    name = request.args['img']
    im = pydicom.dcmread(name)
    im = im.pixel_array.astype(float)
    rescaled_image = (np.maximum(im,0)/im.max())*255
    final_image = np.uint8(rescaled_image)
    final_image = Image.fromarray(final_image)
    final_image.save('../api/image/change.jpg')
    return name

if __name__ == "__main__":
    app.run(debug=True)