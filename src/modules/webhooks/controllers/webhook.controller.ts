import { Controller,Get,Query,UseInterceptors} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { WebHookServices } from '../services/webhook.service';
import { MESSAGES_ERRORS,MESSAGES_DOC } from '../../../constants/global.constants';
import { TimeoutInterceptor } from '../../../utils/timeout.interceptor';

/** 
 * Controlador que maneja el endpoint para peticiones de webhook, 
 * procesando solicitudes de servicios externos y devolviendo la 
 * fecha y hora de la consulta. 
**/
ApiTags('WebHooks')
@Controller()
export class WebHookController
{
    constructor(private readonly webHookServices:WebHookServices){}

    /** Enpoint que permite realizar el envio a los web hooks **/
    @Get('get-movies')
    @UseInterceptors(TimeoutInterceptor)
    @ApiOperation({ summary: MESSAGES_DOC.WEBHOOK.SUMARY })
    @ApiResponse({ status: 200, description: MESSAGES_DOC.GET_ALL.RESPONSE })
    @ApiBody({
        description: MESSAGES_DOC.UPDATE.DESCRIPTIONS_BODY,
        examples: {
            example1: {
               value: {
                    result: MESSAGES_DOC.WEBHOOK.RESPONSE,
                }
            }
        }
    })
    @ApiQuery({required: false, example: 20 })
    async getMoviesWebHook(@Query('webhook_url') urlWebHook: string)
    {
        if(!urlWebHook)
        {
            return { message: MESSAGES_ERRORS.WEBHOOK.URL_INVALID };
        }

        const result = await this.webHookServices.getDataToWebHook(urlWebHook);
        return { message: this.webHookServices.getDateHour(), result };
    }
}
