import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    InternalServerErrorException,
    BadRequestException,
    NotFoundException,
    ForbiddenException,
    HttpException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import { AxiosError } from 'axios';
  import { MESSAGES_ERRORS } from '../constants/global.constants'
  
  @Injectable()
  export class SimilarYearInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        catchError((error: any) => 
        {
          // Manejar errores de Axios
          if (error.isAxiosError) {
            if (error.response) 
            {
              const status = error.response.status;
              const data = error.response.data;
  
              if (status === 404) {
                throw new NotFoundException({
                  statusCode: 404,
                  message: MESSAGES_ERRORS.MOD_MOVIES.RESOURCE_NOT_FOUNT,
                  timestamp: new Date().toISOString(),
                });
              } else if (status === 400) {
                throw new BadRequestException({
                  statusCode: 400,
                  message: data?.message || MESSAGES_ERRORS.MOD_MOVIES.INVALID_DATA,
                  timestamp: new Date().toISOString(),
                });
              } else {
                throw new InternalServerErrorException({
                  statusCode: status,
                  message: data?.message || MESSAGES_ERRORS.MOD_MOVIES.SERVER_500,
                  timestamp: new Date().toISOString(),
                });
              }
            } else {
              // Error en la configuración de la solicitud o en la conexión
              throw new InternalServerErrorException({
                statusCode: 500,
                message: MESSAGES_ERRORS.MOD_MOVIES.SERVER_CONEXION_500,
                timestamp: new Date().toISOString(),
              });
            }
          } else {
            // Manejo de errores genéricos
            throw new InternalServerErrorException({
              statusCode: 500,
              message: MESSAGES_ERRORS.MOD_MOVIES.SERVER_500,
              timestamp: new Date().toISOString(),
            });
          }
        }),
      );
    }
  }
  