/** 
 * Este archivo `cors.constants.ts` define las opciones de CORS (Cross-Origin Resource Sharing),
 * que controla cómo los recursos de la aplicación pueden ser solicitados 
 * desde diferentes dominios. 
**/

import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const CORS : CorsOptions = 
{
    origin:true,
    methods:'GET,HEAD,PUT,POST,DELETE,OPTIONS',
    credentials: false,
}