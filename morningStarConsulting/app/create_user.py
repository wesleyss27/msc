# app/create_db.py

from app import db
from app.models import User
from sqlalchemy_utils import database_exists, create_database


def create_database_if_not_exists():
    if not database_exists(db.engine.url):
        create_database(db.engine.url)
        print('Banco de dados criado com sucesso!')
    else:
        print('O banco de dados já existe.')
def create_user():
    create_database_if_not_exists()

    db.create_all()

    existing_user = User.query.filter_by(username='root').first()
    if existing_user:
        print(existing_user)
        print('Usuário de exemplo já existe!')
    else:
        create_database_if_not_exists()
        new_user = User(username='root', email='root@example.com')
        new_user.set_password('root')  # Define a senha do usuário
        db.session.add(new_user)
        db.session.commit()
        print('Usuário de exemplo criado com sucesso!')

    print('Banco de dados criado com sucesso!')
