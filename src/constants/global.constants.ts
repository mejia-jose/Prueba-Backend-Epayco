/** 
 * Este archivo `global.constants.ts` define variables globales que contienen valores reutilizables 
 * en cualquier parte del código, facilitando la centralización de constantes y su mantenimiento. 
**/
export const LIMIT_DEFAULT = 20; //Variable que permite definir el limite de registros a consultar
export const API_KEY = 91295581; //Variable que contiene el valor de la key para comsunir la API de OMDB
export const URL_OMDB = 'http://www.omdbapi.com'; //Variable que contiene la url de la API de OMDB

/** Variable tipo JSON que permite almacenar todos los mensajes de errores **/
export const MESSAGES_ERRORS = 
{
  MOD_MOVIES:
  {
    NOT_FOUND: 'Error al intentar obtener el listado de películas. Por favor, verifica la conexión con la base de datos o intenta nuevamente más tarde.',
    SERVER_500:'Ha ocurrido un error interno. Por favor, inténtelo más tarde.',
    SERVER_CONEXION_500: 'Error de conexión. No se pudo acceder al servicio externo.',
    RESOURCE_NOT_FOUNT : 'Recurso no encontrado. Verifique la URL e intente nuevamente.',
    INVALID_DATA : 'Los datos proporcionados son inválidos.',
    NO_FOUND_MOVIES_API: 'No se encontraron películas relacionadas para el año correspondiente al ID proporcionado.',
    YEAR_INVALID: 'No es posible realizar la consulta, ya que el año obtenido no es un año válido',
    UPDATE_ERROR: 'No se posible realizar la actualización o inserción en el campo "similar_year". Por favor, inténtelo más tarder.'
  },
  WEBHOOK:
  {
    URL_INVALID: 'Error: No se ha proporcionado una URL del webhook. Por favor, ingrese una URL válida.'
  }
};

/** Variable para los mensajes de exito **/
export const MESSAGES_SUCCESS =
{
  MOD_MOVIES :
  {
    UPDATE_SUCCESS:'Registro actualizado correctamente.',
  }
}

/** Variables para los textos de la documentación**/
export const MESSAGES_DOC =
{
   UPDATE:
   {
      SUMARY: 'Actualizar el campo similar_year por medio del ID',
      DESCRIPTIONS: 'Este endpoint consume la API de OMDB para obtener un máximo de 5 títulos relacionados con el año de la película original. Posteriormente, actualiza el valor del campo "similar_year" en la base de datos con los resultados obtenidos.',
      DESCRIPTIONS_PARAMS:'ID del registro que se desea actualizar',
      PARAMS_EXAMPLE:"573a1390f29313caabcd42e8",
      DESCRIPTIONS_BODY:'Datos de la información a actualizar',
      SUMARY_BODY:'Ejemplo de datos a actualizar',
      BODY_EXAMPLE:[
        "The Romance of a Movie Star",
        "The Movie Bug",
        "A Movie Hero",
        "Movie Fans",
        "Movie Madness" ]
   },
   GET_ALL:
   {
     SUMARY: 'Permite obtener las primeras 20 películas registradas en la base de datos, con un límite máximo de 20 resultados.',
     RESPONSE:'Listado de películas',
   },
   WEBHOOK:
   {
     SUMARY: 'Este endpoint recibe solicitudes HTTP de servicios externos, procesa la información y devuelve la fecha y hora de la consulta en formato JSON',
     RESPONSE : {
      "message": "La búsqueda se llevó a cabo el 2024-09-29 a las 12:54:09.",
      "result": "This URL has no default content configured. <a href=\"https://webhook.site/#!/view/0a7c1d76-7e92-4a25-b418-41b0cd1554e1\">View in Webhook.site</a>."
     }
   }
}