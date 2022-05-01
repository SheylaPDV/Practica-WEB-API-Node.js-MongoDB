# Practica-WEB-API-Node.js-MongoDB

# NodePop

# Resumen:
El proyecto esta pensado solo para funcionar desde el API, no desde el website.

Para usar la aplicacion primero:
Instalar dependencias -->

```sh
npm install
```

## Arrancar en otra terminal a parte el microservicio de Thumbnail:
---
```
node thumbnailService.js
```

## Arrancar la aplicacion:
---
## En desarrollo:

### Iniciar BD con ejemplos:

Borrará todos los productos y los volverá a meter desde el fichero productos.json dentro de la BD:

```sh
npm run initdb
```

### Iniciar backend:
```sh
npm run dev
```

## En producción:

Copy.env.exanmnple to .env and set config values

```sh
cp .env.example .env
```

### Iniciar el servicio
```sh
npm start
```

# Indice de retos:
1. Autenticación
2. Internacionalización
3. Subida de imagen con tarea en background
4. Testing (Opcional)
5. BONUS TRACK

## 1. Autenticación

1. POST /api/authenticate --> para hacer login y devolver un token JWT
2. GET /api/anuncios --> incluyendo el JWT en una cabecera o query-string hará la petición correcta (200 OK)
3. GET /api/anuncios --> sin token responderá con un código de status HTTP 401 y un json con info del error
4. GET /api/anuncios --> con un token caducado responderá con un código de status HTTP 401 y un json con info del error


## 2. Internacionalización
Se puede cambiar el idioma desde el website seleccionando 'en' o 'es' desde el navbar

## 3. Subida de imagen con tarea en background
**POST/api/anuncios** --> crea un anuncio guardando la imagen en el servidor, y usando cote y el servicio thumbnailService, se genera un thumbnail de la imagen guardado con el prefijo 'thumbnail_' en el servidor. Las imagenes son guardadas en la ruta **images/img_productos**

Cuando se hace una llamada **GET /api/anuncios** se muestran los productos y la ruta en la que se ha guardado la imagen en el servidor. 

Las imagenes tambien son accesibles haciendo uso del API, ejemplo:
```
GET http://localhost:3000/img_productos/La-importancia-de-la-imagen.jpg
```

## Coleccion Postman

La coleccion postman se puede encontrar en el archivo **Practica Node Avanzado.postman_collection.json**