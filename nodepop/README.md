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

## Iniciar BD:

- Borrará todos los productos y los volverá a  meter desde el fichero productos.json dentro de la BD:

```sh
npm run initdb
```
- El api se accede en el directorio:

```sh
 apiv1/anuncios
 ```
----------------------------

## EJEMPLOS DE FILTROS

Mostrar lista de productos:
- http://localhost:3000/apiv1/anuncios

Filtro por paginación:
- http://localhost:3000/apiv1/anuncios/?skip=2&limit=2

Filtros por nombre con regExp:

http://localhost:3000/apiv1/anuncios/?nombre=bicicleta&venta=false
http://localhost:3000/apiv1/anuncios/?nombre=bi&venta=false

Filtro por TAG:

http://localhost:3000/apiv1/anuncios?tags=work

Filtro por venta/busqueda:

http://localhost:3000/apiv1/anuncios?venta=true

Ordenacion:

- http://localhost:3000/apiv1/anuncios/?sort=nombre

- http://localhost:3000/apiv1/anuncios/?sort=precio

Rango de precio:

Este filtro solo cumplo en caso de que el numero sea menor que o igual que:

igual que:
- http://localhost:3000/apiv1/anuncios?precio=20 

menor que:
- http://localhost:3000/apiv1/anuncios?precio=-380




