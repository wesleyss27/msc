# Use uma imagem base do Python
FROM python:3.8-slim

# Instalar as dependências de compilação
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    gcc \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo requirements.txt para o contêiner
COPY requirements.txt .

# Instale as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copie o código do aplicativo para o contêiner
COPY . .

# Exponha a porta 5001
EXPOSE 5001

# Comando para executar o aplicativo quando o contêiner for iniciado
CMD ["python", "app.py"]
