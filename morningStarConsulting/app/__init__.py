# app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.settings import Config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, origins='*' )

db = SQLAlchemy(app)

from app import routes  # Importe as rotas depois de inicializar app e db
