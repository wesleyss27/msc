# run.py

from app import app
from app.create_user import create_user

if __name__ == '__main__':
    with app.app_context():  # Cria o contexto de aplicação
        create_user()  # Chama a função para criar o banco de dados e as tabelas
    app.run(host='0.0.0.0', debug=True, port=5001)
