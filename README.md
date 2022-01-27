# Practica-WEB-API-Node.js-MongoDB
# NodePop


Para usar la aplicacion primero:
Instalar dependencias -->
```sh
npm install
```
En producción:
```sh
npm start
```
En desarrollo:
```sh
npm run dev
```
----------------------------
Pasos que he seguido en la práctica: (esto tendré que borrarlo, no sirve)

- Creo package.json dentro de express con comando:
```sh
npm init -y
```

- Instalo express con el comando:
```sh
npm install express
```

- Para arrancar Express:
```sh
nodemon index.js
```
-------------------------------
- Creo Express generator desde carpeta inicio - (ejs es un motor de plantillas)
```sh
npx express-generator nodepop --ejs
```

- Opciones para arrancar la aplicacion en http//localhost:3000:
```sh
node ./bin/www
```
```sh
nodemon 
```
(con el comando nodemon, si hay un index.js lo ejecuta)
```sh
npm run start || npm start
```

- Añado en package json: 
```sh
"dev": "cross-env DEBUG=nodeapp:* nodemon" 
```
- Instalo libreria cross-env para ejecutarlo desde cualquier sistema operativo - 
```sh
npm i cross-env
```

- Instrucciones de como arrancar servidor en MongoDB:
```sh
