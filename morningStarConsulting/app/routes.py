from flask import request, jsonify, send_file
from werkzeug.security import check_password_hash
import jwt
from io import BytesIO
from app import app, db
from app.models import User, Mercadoria, EntradaMercadoria, SaidaMercadoria
from sqlalchemy import func
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

app.config['SECRET_KEY'] = 'SECRET_KEY'


@app.route('/register', methods=['POST'])
def register_user():

    data = request.json
    print(data)

    if 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Missing required fields'}), 400

    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 409

    new_user = User(
        username=data['username'],
        email=data['email']
    )

    new_user.set_password(data['password'])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Email or password is incorrect'}), 401

    token = jwt.encode({'email': email}, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'message': 'Login successful', 'token': token, 'username': user.username}), 200

@app.route('/dados_grafico')
def dados_grafico():
    mercadorias = Mercadoria.query.all()

    dados_grafico = []

    for mercadoria in mercadorias:
        entradas_por_mes = []
        saidas_por_mes = []

        entradas = (
            db.session.query(func.month(EntradaMercadoria.data_hora).label('mes'), func.sum(EntradaMercadoria.quantidade).label('total'))
            .filter(EntradaMercadoria.mercadoria_id == mercadoria.id)
            .group_by(func.month(EntradaMercadoria.data_hora))
            .all()
        )

        saidas = (
            db.session.query(func.month(SaidaMercadoria.data_hora).label('mes'), func.sum(SaidaMercadoria.quantidade).label('total'))
            .filter(SaidaMercadoria.mercadoria_id == mercadoria.id)
            .group_by(func.month(SaidaMercadoria.data_hora))
            .all()
        )

        for entrada in entradas:
            entradas_por_mes.append({"mes": entrada[0], "quantidade": entrada[1]})

        for saida in saidas:
            saidas_por_mes.append({"mes": saida[0], "quantidade": saida[1]})

        dados_grafico.append({
            "nome": mercadoria.nome,
            "entradas": entradas_por_mes,
            "saidas": saidas_por_mes
        })
    print({"mercadorias": dados_grafico})
    return jsonify({"mercadorias": dados_grafico})


@app.route('/entrada_mercadoria', methods=['POST'])
def inserir_entrada_mercadoria():
    data = request.json

    for entry in data.get('entries', []):
        mercadoria_id = entry.get('mercadoriaSelecionada')
        quantidade = entry.get('quantidade')
        local = entry.get('local')
        data_entrada = entry.get('dataHora')

        mercadoria = Mercadoria.query.get(mercadoria_id)
        if not mercadoria:
            return jsonify({'message': 'Mercadoria não encontrada'}), 404

        nova_entrada = EntradaMercadoria(
            mercadoria_id=mercadoria_id,
            quantidade=quantidade,
            local=local,
            data_hora=data_entrada
        )

        db.session.add(nova_entrada)
        db.session.commit()

    return jsonify({'message': 'Entradas de mercadoria criadas com sucesso'}), 201

@app.route('/saida_mercadoria', methods=['POST'])
def inserir_saida_mercadoria():
    data = request.json

    for entry in data.get('entries', []):
        mercadoria_id = entry.get('mercadoriaSelecionada')
        quantidade = entry.get('quantidade')
        local = entry.get('local')
        data_entrada = entry.get('dataHora')

        mercadoria = Mercadoria.query.get(mercadoria_id)
        if not mercadoria:
            return jsonify({'message': 'Mercadoria não encontrada'}), 404

        nova_saida = SaidaMercadoria(
            mercadoria_id=mercadoria_id,
            quantidade=quantidade,
            local=local,
            data_hora=data_entrada
        )

        db.session.add(nova_saida)
        db.session.commit()

    return jsonify({'message': 'Entradas de mercadoria criadas com sucesso'}), 201


@app.route('/mercadoria', methods=['POST'])
def criar_mercadoria():
    data = request.json

    nome = data.get('nome')
    numero_registro = data.get('registro')
    fabricante = data.get('fabricante')
    tipo = data.get('tipo')
    descricao = data.get('descricao')

    if Mercadoria.query.filter_by(numero_registro=numero_registro).first():
        return jsonify({'message': 'Já existe uma mercadoria com este número de registro'}), 400

    nova_mercadoria = Mercadoria(
        nome=nome,
        numero_registro=numero_registro,
        fabricante=fabricante,
        tipo=tipo,
        descricao=descricao
    )

    db.session.add(nova_mercadoria)
    db.session.commit()

    return jsonify({'message': 'Mercadoria criada com sucesso'}), 201

@app.route('/mercadorias', methods=['GET'])
def listar_mercadorias():
    mercadorias = Mercadoria.query.all()

    lista_mercadorias = []
    for mercadoria in mercadorias:
        lista_mercadorias.append({
            'id': mercadoria.id,
            'nome': mercadoria.nome,
            'registro': mercadoria.numero_registro,
            'fabricante': mercadoria.fabricante,
            'tipo': mercadoria.tipo,
            'descricao': mercadoria.descricao
            # Adicione outros campos, se necessário
        })

    return jsonify({'mercadorias': lista_mercadorias})


@app.route('/relatorio', methods=['GET'])
def relatorio():
    entradas = EntradaMercadoria.query.all()
    entradas_serializadas = []

    for entrada in entradas:
        mercadoria = entrada.mercadoria
        if mercadoria:
            entrada_serializada = {
                'Mercadoria': mercadoria.nome,
                'quantidade': entrada.quantidade,
                'data_hora': entrada.data_hora,
                'local': entrada.local,
            }
            entradas_serializadas.append(entrada_serializada)

    saidas = SaidaMercadoria.query.all()

    saidas_serializadas = []

    for saida in saidas:
        mercadoria = saida.mercadoria
        if mercadoria:
            entrada_serializada = {
                'Mercadoria': mercadoria.nome,
                'quantidade': saida.quantidade,
                'data_hora': saida.data_hora,
                'local': saida.local,
            }
            saidas_serializadas.append(entrada_serializada)

    return jsonify({'entradas': entradas_serializadas, 'saidas': saidas_serializadas})


@app.route('/export_pdf', methods=['POST'])
def export_pdf():
    data = request.json['data']

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    elements = []

    styles = getSampleStyleSheet()
    title_style = styles['Title']

    title = Paragraph(f"Relatório de {request.json['etc']}", title_style)
    elements.append(title)
    elements.append(Paragraph("<br/><br/>", styles['Title']))

    table_data = [['Data/Hora', 'Local', 'Mercadoria', 'Quantidade']]
    for item in data:
        table_data.append([item['data_hora'], item['local'], item['Mercadoria'], str(item['quantidade'])])

    table = Table(table_data)

    style = TableStyle([('BACKGROUND', (0, 0), (-1, 0), colors.gray),
                        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                        ('GRID', (0, 0), (-1, -1), 1, colors.black)])

    table.setStyle(style)
    elements.append(table)

    doc.build(elements)

    buffer.seek(0)
    return send_file(buffer, mimetype='application/pdf', as_attachment=True, download_name='sales_report.pdf')