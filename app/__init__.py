import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from .extensions import db

load_dotenv()

def create_app():
    app = Flask(__name__, static_folder='static', template_folder='templates')
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = (
        f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@"
        f"{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    with app.app_context():
        # import models and routes to register with app
        from . import db_models
        from .routes import bp as main_bp
        app.register_blueprint(main_bp)
        db.create_all()

    return app