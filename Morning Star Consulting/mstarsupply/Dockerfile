
FROM node:latest

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Comando padrão para iniciar o aplicativo React
CMD ["npm", "start", "--", "--port", "3001"]
