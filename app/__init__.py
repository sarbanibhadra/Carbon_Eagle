from flask import Flask
#from config import Config

app = Flask(__name__)
#app.config.from_object(Config)

from flask_cors import CORS
CORS(app)

from app import routes
