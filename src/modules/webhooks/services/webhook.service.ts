import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WebHookServices
{
  /*Se define el constructor de la clase */
  constructor(private readonly httpServices: HttpService){};

  async getDataToWebHook(urlWebHook: string) : Promise<any>
  {
    try 
    {
      const payload = { message: this.getDateHour(),};
      // Realizamos la solicitud POST al webhook
      const response = await lastValueFrom(this.httpServices.post(urlWebHook, payload));

      // Retornamos la respuesta del webhook
      return response.data;
    } catch (error) {
      // Manejamos cualquier error que pueda surgir al enviar el webhook
      throw new Error('Error, no se pudo enviar la información.');
    }
  }

  getDateHour()
  {
    const fechaActual = new Date();

    // Obtener la fecha en formato 'YYYY-MM-DD'
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const fecha = `${año}-${mes}-${dia}`;

    // Obtener la hora en formato 'HH:mm:ss'
    const horas = String(fechaActual.getHours()).padStart(2, '0');
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaActual.getSeconds()).padStart(2, '0');
    const hora = `${horas}:${minutos}:${segundos}`;

    return `La búsqueda se llevó a cabo el ${fecha} a las ${hora}.`;
  }
}

