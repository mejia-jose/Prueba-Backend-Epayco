
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from '../schemas/movies.schema';
import { ErrorManager } from '../../../utils/error.manager';
import { SimilarYearService } from '../../similar_year/services/similar_year.service'
import { LIMIT_DEFAULT,MESSAGES_ERRORS,MESSAGES_SUCCESS } from '../../../constants/global.constants';

/**
 * Clase de servicio para el módulo de películas.
 * Esta clase gestiona las operaciones de consulta y actualización en la base de datos relacionadas con las películas.
**/
@Injectable()
export class moviesServices
{
    constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>, private readonly similarYearServices : SimilarYearService) {}

    /**
     * Función que consulta la base de datos para obtener un máximo de 20 resultados de películas.
     * Devuelve una lista limitada de películas según los criterios de búsqueda definidos.
    **/
    async getMovies(): Promise<Movie[]>
    {
        try
        {
            /** Se consultan un limite de las primeras 20 peliculas **/
            const movies = await this.movieModel.find().limit(LIMIT_DEFAULT).exec();
            if(movies.length === 0 || !movies)
            {
                //Se registra el error y se envía a la excepción
               // throw new ErrorManager({ type:'BAD_REQUEST',message: MESSAGES_ERRORS.MOD_MOVIES.NOT_FOUND});
            }

           return movies;
        } catch (error)
        {
            //Se ejecuta el error y devuelve en la respuesta al controlador
            throw ErrorManager.createSignatureError(error.message);
        }
    } 

    /**
     * Función que consulta registros en la base de datos por ID.
     * Consume el servicio que realiza la petición a la API de OMDB 
     * y actualiza el campo 'similar_year' con los resultados obtenidos.
    **/
    async updateFieldSimilarYear(id: string): Promise<any> 
    {
        try
        {
            /** Se consulta el registro por medio del ID **/
            const movieResult = await this.movieModel.findById(id);

            /** Se valida que si se obtengan resultados, en caso de que no, se envia una excepción **/
            if (!movieResult) 
            {
              throw new ErrorManager({ type:'BAD_REQUEST',message: MESSAGES_ERRORS.MOD_MOVIES.NOT_FOUND});
            }
        
            /** Se obtiene el listado de las 5 peliculas obtenidas de la API de OMDB */
            const similarMovies = await this.similarYearServices.getMoviesByYear(movieResult.year);

            /** Se itera el resultado de similarMovies y se obtienen unicamente los titulos y luego se realiza la actualización **/
            const titleMovies = similarMovies.map(movie => movie.Title);
            movieResult.similar_year = titleMovies;
            const res = await movieResult.save();

            /** Se valida que la actualización se haya realizado correctamente **/
            if (res) {
                return {
                    messages: MESSAGES_SUCCESS.MOD_MOVIES.UPDATE_SUCCESS,
                    total: `Se encontraron ${titleMovies.length} títulos para la actualización del campo "similar_year".`,
                    data: movieResult,
                };
            }
            
            /** Si llega hasta, se genera un error y se envia al cathc */
            throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: MESSAGES_ERRORS.MOD_MOVIES.UPDATE_ERROR,
            });
            
        }catch(error)
        {
            //Se ejecuta el error y devuelve en la respuesta al controlador
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
