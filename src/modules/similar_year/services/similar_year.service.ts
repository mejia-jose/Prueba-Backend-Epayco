
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { URL_OMDB ,API_KEY, MESSAGES_ERRORS } from '../../../constants/global.constants';
import { ErrorManager } from '../../../utils/error.manager';

/**
 * Clase SimilarYearService.
 * 
 * Esta clase proporciona una función que utiliza Axios para consumir una API externa. 
 * Se encarga de recibir un año, que se obtiene de un registro relacionado con un 
 * ID específico consultado en la base de datos. El objetivo es pasar este año como 
 * parámetro a la API de OMDB para obtener información relacionada.
**/
@Injectable()
export class SimilarYearService 
{
  private readonly apiKey = process.env.API_KEY_OMDB || API_KEY; //Se define la KEY de la API
  private readonly urlApi = process.env.URL_OMDB || URL_OMDB; //Se define la url de la API

  constructor(private readonly httpService: HttpService) {}

  /**
   * Esta función recibe el año como parámetro y realiza una solicitud a la API de OMDB, 
   * retornando el resultado de la consulta. Se utiliza para obtener información relacionada 
   * con el año especificado.
  **/
  async getMoviesByYear(year: string): Promise<any[]> 
  {
    try 
    {
      if(!this.validateYear(year))
      {
        throw new ErrorManager({ type:'BAD_REQUEST',message: MESSAGES_ERRORS.MOD_MOVIES.YEAR_INVALID+' '+year});
      }
      
      const response = await lastValueFrom(
        this.httpService.get(`${this.urlApi}?apikey=${this.apiKey}&y=${year}&s=movie`)
      );

      const { Response, Error } = response.data;
      
      if(Response === 'False' && Error === 'Movie not found!')
      {
        throw new ErrorManager({ type:'BAD_REQUEST',message: MESSAGES_ERRORS.MOD_MOVIES.NO_FOUND_MOVIES_API});
      }
      const movies = response.data.Search;
      //Permite obtener las 5 titulos de peliculas en caso de que existan más de 5 registros
      return movies ? movies.slice(0, 5) : []; 

    } catch (error) 
    {
      throw new ErrorManager({ type:'BAD_REQUEST',message: MESSAGES_ERRORS.MOD_MOVIES.NO_FOUND_MOVIES_API});
    }
  }

  /* Función que veerifica que el año sea una cadena de texto y que tenga el formato de un año válido (4 dígitos) */
  validateYear(year: string): boolean 
  {
    const yearPattern = /^(19|20)\d{2}$/; // Acepta años entre 1900 y 2099
    return typeof year === 'string' && yearPattern.test(year);
  }
}

