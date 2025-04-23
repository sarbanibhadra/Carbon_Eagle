from .extensions import db

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    projects = db.relationship('Project', backref='user', lazy=True)

class Project(db.Model):
    __tablename__ = 'projects'
    project_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    coordinates = db.Column(db.Text, nullable=False)
    acres = db.Column(db.Float, nullable=False)
    annual_equivalent_co2 = db.Column(db.Float, nullable=False)
    roi_per_year = db.Column(db.Float, nullable=False)
    # Add more fields as needed