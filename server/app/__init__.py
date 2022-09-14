import json

from flask import Flask
from flask_apscheduler import APScheduler
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
scheduler = APScheduler()


def create_app():
    app = Flask(__name__)
    app.config.from_file('../config.json', load=json.load)

    CORS(app)

    from . import models
    db.init_app(app)
    db.create_all(app=app)

    scheduler.init_app(app)
    scheduler.start()

    from .analysis import analysis
    app.register_blueprint(analysis)

    return app
