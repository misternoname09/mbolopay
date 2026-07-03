@echo off
echo Demarrage de l'ensemble du projet mbollopay...
cd ..
start "mbollopay API" cmd /k "npm run dev:api"
start "mbollopay Web" cmd /k "npm run dev:web"
echo Les serveurs ont ete lances dans de nouvelles fenetres.
