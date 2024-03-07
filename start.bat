@echo off

cd ".\mysql"
docker-compose up -d

cd "..\Morning Star Consulting\mstarsupply"
docker-compose up -d

cd "..\..\morningStarConsulting"
docker-compose up -d



pause