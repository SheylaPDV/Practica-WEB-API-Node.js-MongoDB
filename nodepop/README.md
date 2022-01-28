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

## Iniciar BD

```sh
nodemon initDB.js
```
----------------------------

## Inicializar la aplicacion en http//localhost:3000:
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

## METODOS DEL API 

- El api se accede en el directorio routes

Mostrar lista de productos:
- GET /routes/productos

Buscar un producto por ID:
- GET /routes/productos/:id

Eliminar un producto:
- DELETE /routes/productos/:id

Crear un producto:
- POST /routes/productos

Paginación:
- http://localhost:3000/routes/productos/?skip=2&limit=2

Filtros:
- http://localhost:3000/routes/productos/?name='Bicicleta'&venta=true

Eligiendo campos:
- http://localhost:3000/routes/productos/?select=nombre -_id tags

Ordenacion:
- http://localhost:3000/routes/productos/?sort=nombre venta



