# Endpoints de la API

- localhost:8000/api-docs
- http://localhost:8000/get-movies?webhook_url=[url]
- http://localhost:8000/movies/all
- http://localhost:8000/movies/update/id

## Consideraciones Generales

- **Endpoint Principal**: http://localhost:8000/get-movies?webhook_url=[url]


### Configuración de la Base de Datos

- La configuración de la base de datos se realizó en el archivo `.env`.

### Módulos creados
- `database`
- `movies`
- `similar_year`
- `webhook`

### Pruebas End-to-End (E2E)

- Se implementaron las pruebas E2E que verifique el correcto funcionamiento los siguientes endpoint:
  
  - **http://localhost:8000/get-movies?webhook_url=[url]**
  - **http://localhost:8000/movies/all**
  - **http://localhost:8000/movies/update/id**

## Dependencias instaladas y usadas
    1. npm install @nestjs/axios axios rxjs
    2. npm i --save class-validator class-transformer
    3. npm install @nestjs/swagger swagger-ui-express
    4. npm install @nestjs/config dotenv
    5. npm install @nestjs/axios
    6. npm install @nestjs/mongoose mongoose

## Entregas

- **Funcionalidad 1**
   - Endpoint que permite obtener un listado de películas, retornando las primeras 20 películas almacenadas en la base de datos
   - Creación del esquema de mongoose

**Funcionalidad 2**
   - Endpoint que permite actualizar 'similar_year' por medio del ID
   - Consumo de la OMDb API, para obtner los titulos

**Funcionalidad 3**
  - Endpoint para enviar mensajes al webhook

**Documentación**
- Para crear la documentación se uso swagger

- **Pull Request al Repositorio**
- **Evidencias de las pruebas Pruebas End-to-End (E2E)**
- **Evidencias de las funcionalidades**
