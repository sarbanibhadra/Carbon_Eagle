from app import app
from flask import Flask, jsonify, render_template, request


from flask_cors import CORS
CORS(app)