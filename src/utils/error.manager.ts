/** 
 * Este archivo `error.manager.ts` define una clase centralizada para manejar y gestionar errores
 * de manera consistente en todo el código, facilitando su control y mantenimiento.
**/
import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorManager extends Error
{
    constructor({type,message}:{type: keyof typeof HttpStatus, message:string })
    {
        super(`${type} :: ${message}`);
    }

    public static createSignatureError(message:string)
    {
        const name = message.split(" :: ")[0];

        if(name)
        {
            throw new HttpException(message,HttpStatus[name]);
        }else
        {
            throw new HttpException(message,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}