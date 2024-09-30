
import { Controller, Body, Get, Put,Param, UseInterceptors,Res, HttpStatus} from '@nestjs/common';
import { ApiTags,ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { moviesServices } from '../services/movies.service';
import { MESSAGES_SUCCESS,MESSAGES_ERRORS,MESSAGES_DOC } from '../../../constants/global.constants'
import { UpdateDocResponseDTO } from '../dto/movies.dto'
import { SimilarYearInterceptor} from '../../../utils/interceptor.manager';
import { TimeoutInterceptor } from '../../../utils/timeout.interceptor';

@ApiTags('Movies')
@Controller('movies')
export class moviesController
{
   /** Se define el constructor de la clase */
   constructor(private readonly movieService : moviesServices){};

   @Get('all')
   @UseInterceptors(TimeoutInterceptor)
   @ApiOperation({ summary: MESSAGES_DOC.GET_ALL.SUMARY })
   @ApiResponse({ status: 200, description: MESSAGES_DOC.GET_ALL.RESPONSE, type: [UpdateDocResponseDTO] })
   @ApiQuery({required: false, example: 20 })
   async getMovies(@Res() res: Response)
   {
        try
        {
            const movies = await this.movieService.getMovies(); // Asegúrate de que este método existe y funciona correctamente
            return res.status(HttpStatus.OK).json(movies);
        } catch (error)
        {
           return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        }
   }

   @Put('update/:id')
   @ApiOperation({
    summary: MESSAGES_DOC.UPDATE.SUMARY,
        description: MESSAGES_DOC.UPDATE.DESCRIPTIONS
    })
    @ApiParam({
        name: 'id',
        description: MESSAGES_DOC.UPDATE.DESCRIPTIONS_PARAMS,
        example: MESSAGES_DOC.UPDATE.PARAMS_EXAMPLE,
    })
    @ApiBody({
        description: MESSAGES_DOC.UPDATE.DESCRIPTIONS_BODY,
        examples: {
            example1: {
            summary: MESSAGES_DOC.UPDATE.SUMARY_BODY,
                value: {
                    similar_year: MESSAGES_DOC.UPDATE.BODY_EXAMPLE,
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: MESSAGES_SUCCESS.MOD_MOVIES.UPDATE_SUCCESS,
        type: UpdateDocResponseDTO,
    })
    @ApiResponse({
        status: 404,
        description: MESSAGES_ERRORS.MOD_MOVIES.NO_FOUND_MOVIES_API,
    })
    @ApiResponse({
        status: 400,
        description: MESSAGES_ERRORS.MOD_MOVIES.INVALID_DATA,        
    })
   //@UseInterceptors(SimilarYearInterceptor)
   public async update(@Param('id') id:string)
   {
        try{
            const res = await this.movieService.updateFieldSimilarYear(id);
            return res;
        } catch (error)
        {
            throw error;
        }
   }

}
