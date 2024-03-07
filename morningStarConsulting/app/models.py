from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256))


    def set_password(self, password):
        """
        Método para definir a senha do usuário e gerar o hash da senha
        """
        self.password_hash = generate_password_hash(password)

class Mercadoria(db.Model):
    __tablename__ = 'mercadorias'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    numero_registro = db.Column(db.String(50), nullable=False)
    fabricante = db.Column(db.String(100), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)
    descricao = db.Column(db.Text, nullable=False)

    entradas = db.relationship('EntradaMercadoria', backref='mercadoria', lazy=True)
    saidas = db.relationship('SaidaMercadoria', backref='mercadoria', lazy=True)

class EntradaMercadoria(db.Model):
    __tablename__ = 'entradas_mercadorias'

    id = db.Column(db.Integer, primary_key=True)
    mercadoria_id = db.Column(db.Integer, db.ForeignKey('mercadorias.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    data_hora = db.Column(db.DateTime, nullable=False)
    local = db.Column(db.String(100), nullable=False)
    def to_dict(self):
        return {
            'id': self.id,
            'mercadoria_id': self.mercadoria_id,
            'quantidade': self.quantidade,
            'data_hora': self.data_hora.strftime('%Y-%m-%d %H:%M:%S'),
            'local': self.local
        }

class SaidaMercadoria(db.Model):
    __tablename__ = 'saidas_mercadorias'

    id = db.Column(db.Integer, primary_key=True)
    mercadoria_id = db.Column(db.Integer, db.ForeignKey('mercadorias.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    data_hora = db.Column(db.DateTime, nullable=False)
    local = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'mercadoria_id': self.mercadoria_id,
            'quantidade': self.quantidade,
            'data_hora': self.data_hora.strftime('%Y-%m-%d %H:%M:%S'),
            'local': self.local
        }