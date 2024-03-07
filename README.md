# Projeto Morning Star Consulting

Este projeto consiste em uma aplicação web dividida em dois componentes principais: um backend em Flask, um frontend em ReactJS e um banco de dados MySQL.

## Estrutura do Projeto

O projeto está organizado nas seguintes pastas:

- **morningStarConsulting**: Contém o código-fonte do backend desenvolvido em Flask.
- **Morning Star Consulting**: Contém o código-fonte do frontend desenvolvido em ReactJS.
- **mysql**: Contém os arquivos necessários para a criação do container MySQL.

## Requisitos

Certifique-se de ter o Docker instalado em sua máquina para executar a aplicação com facilidade.

## Configuração e Execução

**Backend Flask**:
- Navegue até a pasta `morningStarConsulting`.
- Execute `docker-compose up -d` para iniciar o container do backend Flask.

**Frontend ReactJS**:
- Navegue até a pasta `Morning Star Consulting`.
- Execute `npm install` para instalar as dependências do projeto.
- Execute `npm start` para iniciar o servidor de desenvolvimento do ReactJS.

**MySQL**:
- Navegue até a pasta `mysql`.
- Execute `docker-compose up -d` para iniciar o container do MySQL.

## Acessando a Aplicação

Após seguir as instruções acima, você poderá acessar a aplicação web através do navegador, utilizando o seguinte endereço:

- **Backend Flask**: [http://localhost:5000](http://localhost:5000)
- **Frontend ReactJS**: [http://localhost:3000](http://localhost:3000)
- **Banco de Dados MySQL**: [localhost:3309](localhost:3309)
